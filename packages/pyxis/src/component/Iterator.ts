import type { ReadonlyList } from "~/data/List";
import { LC_CHANGE, LC_CLEAR, LC_INSERT, LC_REMOVE, type ListDelta, type ListItemInserted } from "~/data/ListDelta";
import { createProxy, updateProxy, type Proxied } from "~/data/ProxyAtom";
import { rethrow } from "~/support/common";
import { mountTemplate } from "~/support/template";
import type { DataTemplate, JsxObject, JsxProps, JsxResult } from "~/Component";
import { destroy, flush, fork, insert, mount, reinsertNodes, track, unmount, untrack, willMount, type HNode, type MountingGroup } from "~/Renderer";

export interface RemountIteratorProps<T> {
	source: ReadonlyList<T>;
	proxy?: never; // discriminator
	children: [ template: DataTemplate<T> ];
}

export interface ProxyIteratorProps<T, P extends readonly (keyof T)[]> {
	source: ReadonlyList<T>;
	proxy: P & ("proxied" extends P[number] ? never : unknown);
	children: [ template: DataTemplate<Proxied<T, P>> ];
}

interface IteratorItemGroup<TNode> extends MountingGroup<TNode> {
	$marker: Extract<HNode<TNode>, { $isNative: true }>;
	$data?: any;
}

/**
 * The built-in Iterator Component efficiently rendering collections of items
 * based on updates from a Pyxis `list`.
 */
// @ts-expect-error fake overload to enable use with JSX
export function Iterator<T>(props: JsxProps<RemountIteratorProps<T>>): JsxResult;

export function Iterator<T, P extends readonly (keyof T)[]>(props: JsxProps<ProxyIteratorProps<T, P>>): JsxResult;

export function Iterator<TNode, T>(
	jsx: JsxObject,
	hParent: HNode<TNode>,
	hBefore: HNode<TNode> | null,
	nUsedParent: TNode,
	nRealParent: TNode,
	isBatch: boolean,
) {
	const source = jsx.source as ReadonlyList<T>;
	const proxyKeys = jsx.proxy as readonly PropertyKey[] | undefined;
	const isProxy = proxyKeys !== undefined;
	const template = jsx.children[0] as DataTemplate<T>;

	// create master group and marker
	const hGroup = fork(hParent, hBefore) as MountingGroup<TNode>;
	const { adapter } = hGroup;
	const shouldBatch = !!adapter.batch;
	const nListEndMarker = __DEV__ ? adapter.marker("/Iterator") : adapter.marker();

	// declare rendering routines
	let renderedItems: IteratorItemGroup<TNode>[] | undefined;
	let hListEndMarker: HNode<TNode> | null = null;

	const renderInitialItems = (
		initItems: readonly T[],
		hInitBefore: HNode<TNode> | null,
		nInitParent: TNode,
		initIsBatch: boolean,
	) => {
		let nBatchParent = nInitParent;

		const isLocalBatch = shouldBatch && !initIsBatch && initItems.length > 0;
		const isAnyBatch = isLocalBatch || initIsBatch;
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
		}

		let errors: unknown[] | undefined;
		renderedItems = initItems.map((data) => {
			const item = createItem(
				/* hParent = */ hGroup,
				/* hBefore = */ hListEndMarker ?? hInitBefore,
				/* nParent = */ nBatchParent,
				/* isBatch = */ isAnyBatch,
				/* data = */ data,
				/* proxyKeys = */ proxyKeys,
			);

			try {
				mountTemplate(
					/* template = */ template,
					/* data = */ item.$data,
					/* hParent = */ item,
					/* hBefore = */ hInitBefore,
					/* nUsedParent = */ nBatchParent,
					/* nRealParent = */ nRealParent,
					/* isBatch = */ isAnyBatch,
				);
			}
			catch (ex) {
				(errors ??= []).push(ex);
			}

			return item;
		});

		// commit batch if it's local
		if (isLocalBatch) {
			adapter.insert(nBatchParent, nInitParent, hInitBefore?.$nn ?? null);
			errors = flushItems(renderedItems, 0, renderedItems.length, errors);
		}

		rethrow(errors);
	};

	// subscribe to list updates - done first so that any mutations of the list occurring as a side
	// effect of rendering don't get dropped if the list has no (other) subscribers
	source.delta(willMount(hGroup, (delta: ListDelta<T>) => {
		if (!renderedItems) {
			renderInitialItems(delta.snapshot, hListEndMarker, nRealParent, false);
			return;
		}

		const { changes, relSize } = delta;
		const cMax = changes.length;
		const iMax = renderedItems.length + relSize;
		let newItems = renderedItems;
		let errors: unknown[] | undefined;
		let pending: number[] | undefined;
		let recycled: IteratorItemGroup<TNode>[] | undefined;
		let item: IteratorItemGroup<TNode>;
		let inserted = 0;
		let ci = 0; // change index
		let oi = 0; // old items index
		let ni = 0; // new items index
		let change;
		let ref;
		let tmp;

		// batching
		let isLocalBatch = false;
		let nBatchParent = nRealParent;
		let batchStart = 0;

		for (; ci < cMax; ci += 1) {
			change = changes[ci];

			// reuse item array until the first structural edit; LC_CHANGE alone doesn't restructure
			if (newItems === renderedItems) {
				if (change.kind === LC_CHANGE) {
					oi = ni = change.index;
				}
				else {
					newItems = new Array<IteratorItemGroup<TNode>>(iMax);
					oi = ni = 0;
				}
			}

			// copy unchanged items
			while (ni < change.index) {
				newItems[ni++] = renderedItems[oi++];
			}

			// apply change
			switch (change.kind) {
				case LC_CHANGE:
					item = (newItems[ni++] = renderedItems[oi++]);
					if (isProxy) {
						updateProxy(item.$data, change.newItem, proxyKeys);
					}
					else {
						// no need to untrack and re-track, position doesn't change
						try {
							unmount(item);
						}
						catch (ex) {
							(errors ??= []).push(ex);
						}

						// The marker belongs to the main group and survives content teardown.
						ref = renderedItems[oi]?.$marker ?? hListEndMarker;

						try {
							mountTemplate(
								/* template = */ template,
								/* data = */ (item.$data = change.newItem),
								/* hParent = */ item,
								/* hBefore = */ ref,
								/* nUsedParent = */ nRealParent,
								/* nRealParent = */ nRealParent,
								/* isBatch = */ false,
							);
						}
						catch (ex) {
							(errors ??= []).push(ex);
						}
					}

					break;

				case LC_INSERT:
					if (!isProxy || inserted < relSize) {
						// we're either in remount mode, or no more items are available for recycling
						ref = renderedItems[oi]?.$marker ?? hListEndMarker;
						if (!isLocalBatch) {
							if (shouldBatch) {
								isLocalBatch = true;
								batchStart = ni;
								nBatchParent = adapter.batch!();
							}
						}

						inserted += 1;
						item = (newItems[ni++] = createItem(
							/* hParent = */ hGroup,
							/* hBefore = */ renderedItems[oi]?.$marker ?? hListEndMarker,
							/* nParent = */ nBatchParent,
							/* isBatch = */ isLocalBatch,
							/* data = */ change.newItem,
							/* proxyKeys = */ proxyKeys,
						));

						try {
							mountTemplate(
								/* template = */ template,
								/* data = */ item.$data,
								/* hParent = */ item,
								/* hBefore = */ ref,
								/* nUsedParent = */ nBatchParent,
								/* nRealParent = */ nRealParent,
								/* isBatch = */ isLocalBatch,
							);
						}
						catch (ex) {
							(errors ??= []).push(ex);
						}

						if (isLocalBatch && (
							// we must commit the current batch if:
							inserted >= relSize ||		// next insert will use recycled
							!(tmp = changes[ci + 1]) ||	// no next change exists
							tmp.kind !== LC_INSERT ||	// next change is not an insert
							tmp.index !== ni			// next insert is not consecutive
						)) {
							adapter.insert(nBatchParent, nRealParent, ref.$nn);
							errors = flushItems(newItems, batchStart, ni, errors);
							nBatchParent = nRealParent;
							isLocalBatch = false;
						}
					}
					else {
						// we know enough items will be removed -> add a pending item
						(pending ??= []).push(ci);
						ni += 1;
					}

					break;

				case LC_REMOVE:
					item = renderedItems[oi++];
					if (isProxy) {
						(recycled ??= []).push(item);
						untrackItem(item);
					}
					else {
						try {
							destroyItem(item);
						}
						catch (ex) {
							(errors ??= []).push(ex);
						}
					}

					break;

				case LC_CLEAR:
					// clear is always the first change within a delta, has index = -1 and is only
					// ever followed by inserts - thus we can directly recycle the items array, it
					// won't get mutated
					if (isProxy) {
						recycled = renderedItems;
						recycled.forEach(untrackItem);
						oi = renderedItems.length;
					}
					else {
						while (oi < renderedItems.length) {
							item = renderedItems[oi++];
							try {
								destroyItem(item);
							}
							catch (ex) {
								(errors ??= []).push(ex);
							}
						}
					}

					break;
			}
		}

		// copy remaining unchanged
		if (newItems !== renderedItems) {
			while (ni < iMax) {
				newItems[ni++] = renderedItems[oi++];
			}
		}

		// fulfill pending items with recycled ones
		let pi = pending ? pending.length - 1 : -1; // pending items index
		let ri = recycled ? recycled.length - 1 : -1; // recycled items index
		while (pi >= 0) {
			tmp = changes[pending![pi--]] as ListItemInserted<T>;
			item = (newItems[tmp.index] = recycled![ri--]);
			updateProxy(item.$data, tmp.newItem, proxyKeys!);

			ref = newItems[tmp.index + 1];
			track(item.$marker, hGroup, ref?.$marker ?? hListEndMarker);
			track(item, hGroup, ref?.$marker ?? hListEndMarker);

			adapter.insert(item.$marker.$nn, nRealParent, ref?.$marker.$nn ?? nListEndMarker);
			reinsertNodes(
				/* hParent = */ item,
				/* hBefore = */ ref?.$marker ?? hListEndMarker,
				/* nParent = */ nRealParent,
			);
		}

		// destroy unused
		while (ri >= 0) {
			item = recycled![ri--];
			try {
				destroyItem(item);
			}
			catch (ex) {
				(errors ??= []).push(ex);
			}
		}

		renderedItems = newItems;
		rethrow(errors);
	}), hGroup);

	// render current stable state, or wait for incoming delta if already dirty
	if (!source.dirty()) {
		source.stable(snapshot => {
			renderInitialItems(snapshot, hBefore, nUsedParent, isBatch);
		});
	}

	// insert master position marker
	hListEndMarker = insert(
		/* nNode = */ nListEndMarker,
		/* children = */ null,
		/* hParent = */ hGroup,
		/* hBefore = */ hBefore,
		/* nUsedParent = */ nUsedParent,
		/* isBatch = */ isBatch,
		/* forceTrack = */ true,
	);

	// mark hGroup as mounted and propagate mount notifications to items if already rendered
	mount(
		/* jsx = */ null,
		/* hParent = */ hGroup,
		/* hBefore = */ hBefore,
		/* nUsedParent = */ nUsedParent,
		/* nRealParent = */ nRealParent,
		/* isBatch = */ isBatch,
	);
}

/**
 * Flushes a range of items delimited by start (inclusive) and end (exclusive). Errors are caught
 * and collected, the errors array (if any) is returned.
 */
function flushItems<TNode>(items: IteratorItemGroup<TNode>[], start: number, end: number, errors: unknown[] | undefined) {
	let index = start;
	for (; index < end; index += 1) {
		try {
			flush(items[index]);
		}
		catch (ex) {
			(errors ??= []).push(ex);
		}
	}

	return errors;
}

/**
 * Creates a h-group for an iterator item with a position marker inserted into the master
 * iterator-wide h-group, holding the position of the item within the node tree.
 */
function createItem<TNode>(
	hParent: MountingGroup<TNode>,
	hBefore: HNode<TNode> | null,
	nParent: TNode,
	isBatch: boolean,
	data: unknown,
	proxyKeys: readonly PropertyKey[] | undefined,
) {
	// track position markers under the master group, rather than individual per-item groups
	// doing so simplifies handling of failed item renders
	const marker = insert(
		/* nNode = */ __DEV__ ? hParent.adapter.marker("IteratorItem") : hParent.adapter.marker(),
		/* children = */ null,
		/* hParent = */ hParent,
		/* hBefore = */ hBefore,
		/* nUsedParent = */ nParent,
		/* isBatch = */ isBatch,
		/* forceTrack = */ true,
	);

	// prepare per-item group for the actual content of the item
	const item = fork(hParent, hBefore, hParent.$context) as IteratorItemGroup<TNode>;
	item.$marker = marker;
	item.$data = proxyKeys !== undefined
		? createProxy(item, data, proxyKeys)
		: data;

	return item;
}

/**
 * Removes an iterator item as well as its position marker from the tracking hierarchy.
 */
function untrackItem<TNode>(item: IteratorItemGroup<TNode>) {
	untrack(item.$marker);
	untrack(item);
}

/**
 * Destroys an iterator item that is no longer needed. Also destroys its position marker.
 */
function destroyItem<TNode>(item: IteratorItemGroup<TNode>) {
	try {
		destroy(item);
	}
	finally {
		const marker = item.$marker;
		item.adapter.remove(marker.$nn);
		untrack(marker);
		marker.$ph = null;
	}
}
