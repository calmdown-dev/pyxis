import { withLifecycle } from "~/data/Lifecycle";
import { link } from "~/data/Dependency";
import type { ReadonlyList } from "~/data/List";
import { LC_CHANGE, LC_CLEAR, LC_INSERT, LC_REMOVE } from "~/data/ListDelta";
import { createProxy, updateProxy, type Proxied } from "~/data/ProxyAtom";
import type { DataTemplate, JsxObject, JsxProps, JsxResult } from "~/Component";
import { fork, insert, mount, track, unmount, untrack, type MountingGroup, type HNode } from "~/Renderer";

export interface RemountIteratorProps<T> {
	source: ReadonlyList<T>;
	proxy?: never; // discriminator
	children: [ template: DataTemplate<T> ];
}

export interface ProxyIteratorProps<T, P extends readonly (keyof T)[]> {
	source: ReadonlyList<T>;
	proxy: P;
	children: [ template: DataTemplate<Proxied<T, P>> ];
}

interface IteratorItemGroup<TNode> extends MountingGroup<TNode> {
	$marker: TNode;
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
	const shouldBatch = Boolean(adapter.batch);
	const nListEndMarker = __DEV__ ? adapter.marker("/Iterator") : adapter.marker();

	// list change handler
	let items: IteratorItemGroup<TNode>[];
	let skipDelta = Boolean(source.$delta);
	const onDelta = () => {
		if (skipDelta) {
			// a delta might've been pending during initial render, but we already rendered against
			// the lists's up-to-date state, so such delta must be skipped -> bail out
			skipDelta = false;
			return;
		}

		const delta = source.$delta!;
		const { changes, lengthChange } = delta;
		const cMax = changes.length;
		const iMax = items.length + lengthChange;
		const newItems = new Array<IteratorItemGroup<TNode>>(iMax);
		const pending: PendingItem<T>[] = [];
		let recycled: IteratorItemGroup<TNode>[] = [];
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
				newItems[ni++] = items[oi++];
			}

			// apply change
			switch (change.kind) {
				case LC_CHANGE:
					item = (newItems[ni++] = items[oi++]);
					if (isProxy) {
						updateProxy(item.$data, change.newItem, proxyKeys);
					}
					else {
						// no need to untrack and re-track, position doesn't change
						unmount(item);

						// unmount removes marker, we must re-insert it
						ref = items[oi]?.$marker ?? nListEndMarker;
						insert(
							/* hNode = */ item.$marker,
							/* children = */ null,
							/* hParent = */ item,
							/* nUsedParent = */ nRealParent,
							/* nBefore = */ ref,
							/* isBatch = */ false,
						);

						mount(
							/* jsx = */ withLifecycle(item, template, (item.$data = change.newItem)),
							/* hGroup = */ item,
							/* nUsedParent = */ nRealParent,
							/* nRealParent = */ nRealParent,
							/* nBefore = */ ref,
							/* isBatch = */ false,
						);
					}

					break;

				case LC_INSERT:
					if (!isProxy || inserted < lengthChange) {
						// we're either in remount mode, or no more items are available for recycling
						item = (newItems[ni++] = fork(hGroup, items[oi]) as IteratorItemGroup<TNode>);
						item.$marker = __DEV__ ? adapter.marker("IteratorItem") : adapter.marker();
						item.$data = isProxy ? createProxy(item, change.newItem, proxyKeys) : change.newItem;
						inserted += 1;

						ref = items[oi]?.$marker ?? nListEndMarker;
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

						// insert start marker to preserve position in the document
						insert(
							/* hNode = */ item.$marker,
							/* children = */ null,
							/* hParent = */ item,
							/* nUsedParent = */ nBatchParent,
							/* nBefore = */ nBatchBefore,
							/* isBatch = */ isLocalBatch,
						);

						mount(
							/* jsx = */ withLifecycle(item, template, item.$data),
							/* hGroup = */ item,
							/* nUsedParent = */ nBatchParent,
							/* nRealParent = */ nRealParent,
							/* nBefore = */ nBatchBefore,
							/* isBatch = */ isLocalBatch,
						);

						if (isLocalBatch && (
							// we must commit the current batch if:
							inserted >= lengthChange ||		// next insert will use recycled
							!(tmp = changes[ci + 1]) ||		// no next change exists
							tmp.kind !== LC_INSERT ||		// next change is not an insert
							tmp.index !== ni				// next insert is not consecutive
						)) {
							adapter.insert(nBatchParent, nRealParent, ref);
							nBatchParent = nRealParent;
							isLocalBatch = false;
						}
					}
					else {
						// we know enough items will be removed -> add a pending item
						pending.push({
							$index: ni++,
							$item: change.newItem,
						});
					}

					break;

				case LC_REMOVE:
					item = items[oi++];
					if (isProxy) {
						recycled.push(item);
					}
					else {
						unmount(item);
					}

					untrack(item);
					break;

				case LC_CLEAR:
					// clear is always the first change within a delta, has index = -1 and is only
					// ever followed by inserts - thus we can directly recycle the items array, it
					// won't get mutated
					if (isProxy) {
						recycled = items;
						recycled.forEach(untrack);
						oi = items.length;
					}
					else {
						while (oi < items.length) {
							item = items[oi++];
							unmount(item);
							untrack(item);
						}
					}

					break;
			}
		}

		// copy remaining unchanged
		while (ni < iMax) {
			newItems[ni++] = items[oi++];
		}

		// fulfill pending items with recycled ones
		let pi = pending.length - 1; // pending items index
		let ri = recycled.length - 1; // recycled items index
		while (pi >= 0) {
			tmp = pending[pi--];
			item = (newItems[tmp.$index] = recycled[ri--]);
			updateProxy(item.$data, tmp.$item, proxyKeys!);
			track(item, hGroup, ref = newItems[tmp.$index + 1]);
			mount(
				/* jsx = */ withLifecycle(item, template, item.$data),
				/* hGroup = */ item,
				/* nUsedParent = */ nRealParent,
				/* nRealParent = */ nRealParent,
				/* nBefore = */ ref?.$marker ?? nListEndMarker,
				/* isBatch = */ false,
			);
		}

		// unmount unused
		while (ri >= 0) {
			item = recycled[ri--];
			unmount(item);
			untrack(item);
		}

		items = newItems;
	};

	link(hGroup, source, { $fn: onDelta });

	// initial render
	{
		let nBatchParent = nUsedParent;
		let nBatchBefore = nBefore;

		const isLocalBatch = shouldBatch && !isBatch && source.$items.length > 0;
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
			nBatchBefore = null;
		}

		const isAnyBatch = isLocalBatch || isBatch;
		items = source.$items.map((data) => {
			const item = fork(hGroup) as IteratorItemGroup<TNode>;
			item.$marker = __DEV__ ? adapter.marker("IteratorItem") : adapter.marker();
			item.$data = isProxy ? createProxy(item, data, proxyKeys) : data;

			insert(item.$marker, null, item, nBatchParent, nBatchBefore, isAnyBatch);
			mount(
				/* jsx = */ withLifecycle(item, template, item.$data),
				/* hGroup = */ item,
				/* nUsedParent = */ nBatchParent,
				/* nRealParent = */ nRealParent,
				/* nBefore = */ nBatchBefore,
				/* isBatch = */ isAnyBatch,
			);

			return item;
		});

		// insert end marker to preserve position in the document
		insert(nListEndMarker, null, hGroup, nBatchParent, nBatchBefore, isAnyBatch);

		// commit batch, if it's local
		if (isLocalBatch) {
			adapter.insert(nBatchParent, nUsedParent, nBefore);
		}
	}

	// content is already rendered, only call mount (with empty jsx) to propagate mount notifications
	mount(null, hGroup, nUsedParent, nRealParent, nBefore, isBatch);
}
