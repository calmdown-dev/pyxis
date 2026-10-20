import { link } from "~/data/Dependency";
import type { ReadonlyList } from "~/data/List";
import { LC_CHANGE, LC_CLEAR, LC_INSERT, LC_REMOVE, type ListDelta } from "~/data/ListDelta";
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

interface PendingItem<T> {
	readonly $index: number;
	readonly $item: T;
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
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	const source = jsx.source as ReadonlyList<T>;
	const proxyKeys = jsx.proxy as readonly PropertyKey[] | undefined;
	const isProxy = proxyKeys !== undefined;
	const template = jsx.children[0] as DataTemplate<T>;

	// create master group
	const hGroup = fork(hParent) as MountingGroup<TNode>;

	const { adapter } = hGroup;
	const shouldBatch = !!adapter.batch;
	const nListEndMarker = __DEV__ ? adapter.marker("/Iterator") : adapter.marker();

	// declare rendering routines
	let renderedItems: IteratorItemGroup<TNode>[] | null = null;
	let hListEndMarker: HNode<TNode> | null = null;

	const renderInitialItems = (initItems: readonly T[], nInitParent: TNode, nInitBefore: TNode | null, initIsBatch: boolean) => {
		let errors: unknown[] | null = null;
		let nBatchParent = nInitParent;
		let nBatchBefore = nInitBefore;

		const isLocalBatch = shouldBatch && !initIsBatch && initItems.length > 0;
		const isAnyBatch = isLocalBatch || initIsBatch;
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
			nBatchBefore = null;
		}

		renderedItems = initItems.map((data) => {
			const item = createItem(
				/* hGroup = */ hGroup,
				/* data = */ data,
				/* proxyKeys = */ proxyKeys,
				/* hBefore = */ hListEndMarker,
				/* nParent = */ nBatchParent,
				/* nBefore = */ nBatchBefore,
			);

			try {
				mountTemplate(
					/* template = */ template,
					/* data = */ item.$data,
					/* hGroup = */ item,
					/* nUsedParent = */ nBatchParent,
					/* nRealParent = */ nRealParent,
					/* nBefore = */ nBatchBefore,
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
			adapter.insert(nBatchParent, nInitParent, nInitBefore);
			try {
				flush(hGroup);
			}
			catch (ex) {
				(errors ??= []).push(ex);
			}
		}

		rethrow(errors);
	};

	// subscribe to list updates - done first so that any mutations of the list occurring as a side
	// effect of rendering don't get dropped if the list has no (other) subscribers
	source.delta(willMount(hGroup, (delta: ListDelta<T>) => {
		if (!renderedItems) {
			renderInitialItems(delta.snapshot, nRealParent, nListEndMarker, false);
			return;
		}

		const { changes, relSize } = delta;
		const cMax = changes.length;
		const iMax = renderedItems.length + relSize;
		const newItems = new Array<IteratorItemGroup<TNode>>(iMax);
		let errors: unknown[] | null = null;
		let pending: PendingItem<T>[] | null = null;
		let recycled: IteratorItemGroup<TNode>[] | null = null;
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
		let nBatchBefore: TNode | null = null;

		for (; ci < cMax; ci += 1) {
			change = changes[ci];

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
						ref = renderedItems[oi]?.$marker.$nn ?? nListEndMarker;

						try {
							mountTemplate(
								/* template = */ template,
								/* data = */ (item.$data = change.newItem),
								/* hGroup = */ item,
								/* nUsedParent = */ nRealParent,
								/* nRealParent = */ nRealParent,
								/* nBefore = */ ref,
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
						ref = renderedItems[oi]?.$marker.$nn ?? nListEndMarker;
						if (!isLocalBatch) {
							if (shouldBatch) {
								isLocalBatch = true;
								nBatchParent = adapter.batch!();
								nBatchBefore = null;
							}
							else {
								nBatchBefore = ref;
							}
						}

						inserted += 1;
						item = (newItems[ni++] = createItem(
							/* hGroup = */ hGroup,
							/* data = */ change.newItem,
							/* proxyKeys = */ proxyKeys,
							/* hBefore = */ renderedItems[oi]?.$marker ?? hListEndMarker,
							/* nParent = */ nBatchParent,
							/* nBefore = */ nBatchBefore,
						));

						try {
							mountTemplate(
								/* template = */ template,
								/* data = */ item.$data,
								/* hGroup = */ item,
								/* nUsedParent = */ nBatchParent,
								/* nRealParent = */ nRealParent,
								/* nBefore = */ nBatchBefore,
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
							adapter.insert(nBatchParent, nRealParent, ref);
							try {
								flush(hGroup);
							}
							catch (ex) {
								(errors ??= []).push(ex);
							}

							nBatchParent = nRealParent;
							isLocalBatch = false;
						}
					}
					else {
						// we know enough items will be removed -> add a pending item
						(pending ??= []).push({
							$index: ni++,
							$item: change.newItem,
						});
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
		while (ni < iMax) {
			newItems[ni++] = renderedItems[oi++];
		}

		// fulfill pending items with recycled ones
		let pi = pending ? pending.length - 1 : -1; // pending items index
		let ri = recycled ? recycled.length - 1 : -1; // recycled items index
		while (pi >= 0) {
			tmp = pending![pi--];
			item = (newItems[tmp.$index] = recycled![ri--]);
			updateProxy(item.$data, tmp.$item, proxyKeys!);

			ref = newItems[tmp.$index + 1];
			track(item.$marker, hGroup, ref?.$marker ?? hListEndMarker);
			track(item, hGroup, ref?.$marker ?? hListEndMarker);

			adapter.insert(item.$marker.$nn, nRealParent, ref?.$marker.$nn ?? nListEndMarker);
			reinsertNodes(
				/* hGroup = */ item,
				/* nParent = */ nRealParent,
				/* nBefore = */ ref?.$marker.$nn ?? nListEndMarker,
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
			renderInitialItems(snapshot, nUsedParent, nBefore, isBatch);
		});
	}

	// insert position marker
	insert(nListEndMarker, null, hGroup, nUsedParent, nBefore, isBatch);
	hListEndMarker = hGroup.$ht!;

	// mark hGroup as mounted and propagate mount notifications to items if already rendered
	mount(null, hGroup, nUsedParent, nRealParent, nBefore, isBatch);
}

/** Creates an adjacent marker/content pair in both the native and tracking hierarchies. */
function createItem<TNode>(
	hGroup: MountingGroup<TNode>,
	data: unknown,
	proxyKeys: readonly PropertyKey[] | undefined,
	hBefore: HNode<TNode> | null,
	nParent: TNode,
	nBefore: TNode | null,
) {
	const { adapter } = hGroup;
	const marker: IteratorItemGroup<TNode>["$marker"] = {
		$isNative: true,
		$ng: hGroup,
		$nn: __DEV__ ? adapter.marker("IteratorItem") : adapter.marker(),
		$ph: hGroup,
	};

	// Keep the position marker outside the remountable contents, including failed mounts.
	track(marker, hGroup, hBefore);
	adapter.insert(marker.$nn, nParent, nBefore);

	const item = fork(hGroup, hBefore, hGroup.$context) as IteratorItemGroup<TNode>;
	item.$marker = marker;
	item.$data = proxyKeys !== undefined
		? createProxy(item, data, proxyKeys)
		: data;

	return item;
}

function untrackItem<TNode>(item: IteratorItemGroup<TNode>) {
	untrack(item.$marker);
	untrack(item);
}

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
