import type { Nil } from "~/support/types";
import { runtime } from "~/Runtime";

import { notify, type DependencyList } from "./Dependency";
import { reportAccess } from "./Effect";
import { getLifecycle, type Lifecycle } from "./Lifecycle";
import { itemChanged, itemInserted, itemRemoved, listCleared, listSynced, type Equals, type ListDelta, type PendingListDelta } from "./ListDelta";
import { scheduleTick, scheduleTock, type UpdateCallback } from "./Scheduler";

export interface ReadonlyList<T> extends Iterable<T>, DependencyList {
	/**
	 * Gets the size of this List.
	 *
	 * Reactive in effects and derivations.
	 */
	size(): number;

	/**
	 * Gets the item at the specified index. Return undefined when outside of the List's bounds.
	 *
	 * Reactive in effects and derivations.
	 */
	get(index: number): T | undefined;

	/**
	 * Gets a boolean indicating whether changes have been made to this List that have not yet been
	 * delivered to its observers.
	 *
	 * Non-reactive in effects and derivations.
	 */
	dirty(): boolean;

	/**
	 * When called within an effect observing this List, gets a ListDelta object describing the
	 * latest changes. May return `null` when no changes were made to this List and the effect ran
	 * for other reasons.
	 *
	 * Reactive in effects and derivations.
	 */
	delta(): ListDelta<T> | null;

	/**
	 * Gets the underlying array of items of this List. The array is read-only, but may change when
	 * the List itself is mutated.
	 *
	 * Non-reactive in effects and derivations.
	 *
	 * *Mutating the array directly (e.g. in unchecked JS code) will cause any and all observers to
	 * go out of sync, breaking the rendered state in unpredictable ways!*
	 */
	raw(): readonly T[];

	/**
	 * Runs a block of code for each item of this List.
	 *
	 * Reactive in effects and derivations.
	 */
	forEach(block: (item: T, index: number) => void): void;

	/**
	 * Runs a block of code with a stable, immutable snapshot of the items within this List. The
	 * List itself may be mutated as a result of running this code, but the provided snapshot will
	 * not reflect any such changes.
	 *
	 * Non-reactive in effects and derivations.
	 */
	stable<R>(block: (snapshot: readonly T[]) => R): R;

	/** @internal */
	readonly $lifecycle: Lifecycle;

	/** @internal */
	$items: readonly T[];

	/** @internal */
	$committedDelta: ListDelta<T> | null;

	/** @internal */
	$pendingDelta: PendingListDelta<T> | null;

	/** @internal */
	$afterNotify?: Nil<UpdateCallback<[ self: List<T> ]>>;

	/** @internal */
	$itemsLock: number;

	/**
	 * The ID of this List, only used in dev builds.
	 * @internal
	 */
	$devId?: string;
}

export interface List<T> extends ReadonlyList<T> {
	/**
	 * Sets the item at the specified index to a new value.
	 * Observers are notified of this mutation.
	 * @throws RangeError when index is out of bounds.
	 */
	set(index: number, item: T): void;

	/**
	 * Removes all items from this List.
	 * Observers are notified of this mutation.
	 */
	clear(): void;

	/**
	 * Inserts a new item at the specified index.
	 * Observers are notified of this mutation.
	 * @throws RangeError when index is out of bounds.
	 */
	insertAt(index: number, item: T): void;

	/**
	 * Inserts a new item at the start of this List.
	 * Observers are notified of this mutation.
	 */
	insertFirst(item: T): void;

	/**
	 * Inserts a new item at the end of this List.
	 * Observers are notified of this mutation.
	 */
	insertLast(item: T): void;

	/**
	 * Attempts to find and remove the first matching item from this List.
	 * Observers are notified of this mutation.
	 * @returns true if an item was found and removed, false otherwise.
	 */
	remove(item: T): boolean;

	/**
	 * Removes the item at the specified index.
	 * Observers are notified of this mutation.
	 * @returns the removed item.
	 * @throws RangeError when index is out of bounds.
	 */
	removeAt(index: number): T;

	/**
	 * Attempts to remove the first item of this List.
	 * Observers are notified of this mutation.
	 * @returns the removed item, or undefined if the List is empty.
	 */
	removeFirst(): T | undefined;

	/**
	 * Attempts to remove the last item of this List.
	 * Observers are notified of this mutation.
	 * @returns the removed item, or undefined if the List is empty.
	 */
	removeLast(): T | undefined;

	/** @internal */
	$items: T[];
}

/**
 * Creates an empty List. This List emits deltas with each mutation which can be observed by
 * Components to efficiently update the rendered state.
 */
export function listOf<T>(): List<T>;
export function listOf<T>(source: Nil<never>, lifecycle?: Lifecycle, devId?: string): List<T>;

/**
 * Creates a List initialized with items copied from the provided Iterable. This List emits deltas
 * with each mutation which can be observed by Components to efficiently update the rendered state.
 */
export function listOf<T>(source: Iterable<T>, lifecycle?: Lifecycle, devId?: string): List<T>;

export function listOf<T>(source?: Nil<Iterable<T>>, lifecycle = getLifecycle()): List<T> {
	if (__DEV__) {
		const devId = arguments[2];
		runtime.hmrState!.restore(lifecycle, devId, value => {
			if (Array.isArray(value)) {
				source = value;
			}
		});
	}

	const items = source ? Array.from(source) : [];
	const list: List<T> = {
		$items: items,
		$lifecycle: lifecycle,
		$committedDelta: null,
		$pendingDelta: null,
		$itemsLock: 0,
		[Symbol.iterator]: getIterator,
		size,
		get,
		dirty,
		delta,
		raw,
		forEach,
		stable,
		set,
		clear,
		insertAt,
		insertFirst,
		insertLast,
		remove,
		removeAt,
		removeFirst,
		removeLast,
	};

	if (__DEV__) {
		list.$devId = arguments[2];
	}

	return list;
}

/**
 * Synchronizes the provided List with the given data source. After this operation, the list will
 * contain an exact copy of the source.
 *
 * Note: This function is separated instead of being a List method as the underlying diff algorithm
 * (Myers) is a relatively large chunk of code which would otherwise always get bundled into
 * applications. This way, tools like Terser can easily eliminate the extra code when unused.
 */
export function sync<T>(list: List<T>, source: Iterable<T>, eq: Equals<T> = Object.is) {
	const oldItems = list.$items;
	const newItems = Array.from(source);
	list.$items = newItems;

	if (!list.$dh) {
		// skip emitting deltas when there are no observers
		return;
	}

	// make sure that if no changes are detected, an empty delta isn't left on the List
	const delta = initDelta(list);
	if (listSynced(delta, oldItems, newItems, eq)) {
		list.$pendingDelta = delta;
		listMutated(list);
	}
}

function size(this: List<any>) {
	reportAccess(this);
	return this.$items.length;
}

function get(this: List<any>, index: number) {
	reportAccess(this);
	return this.$items[index];
}

function dirty(this: List<any>) {
	if (this.$ct) {
		// currently notifying observers
		return true;
	}

	const delta = this.$pendingDelta;
	if (!delta) {
		return false;
	}

	// a delta is pending, check that the notification is scheduled within an active lifecycle and that the delta contains changes
	const pending = this.$notify;
	return (!pending || pending.$life === pending.$lifecycle!.$life) && delta.changes.length > 0;
}

function delta<T>(this: List<T>) {
	reportAccess(this);
	return this.$committedDelta;
}

function raw<T>(this: List<T>): readonly T[] {
	return this.$items;
}

function forEach<T>(this: List<T>, callback: (item: T, index: number) => void) {
	reportAccess(this);
	this.$items.forEach(callback);
}

function stable<T, R>(this: List<T>, block: (snapshot: readonly T[]) => R) {
	try {
		this.$itemsLock += 1;
		return block(this.$items);
	}
	finally {
		this.$itemsLock = Math.max(this.$itemsLock - 1, 0);
	}
}

function getIterator<T>(this: List<T>) {
	reportAccess(this);
	return this.$items[Symbol.iterator]();
}

function set<T>(this: List<T>, index: number, newItem: T) {
	assertIndex(this, index);

	const oldItem = this.$items[index];
	if (Object.is(newItem, oldItem)) {
		return;
	}

	copyOnWrite(this);
	this.$items[index] = newItem;

	// only emit deltas when there are observers
	if (this.$dh) {
		itemChanged(this.$pendingDelta = initDelta(this), index, oldItem, newItem);
		listMutated(this);
	}
}

function clear(this: List<any>) {
	const count = this.$items.length;
	if (this.$itemsLock > 0) {
		this.$items = [];
		this.$itemsLock = 0;
	}
	else {
		this.$items.length = 0;
	}

	// only emit deltas when there are observers
	if (this.$dh) {
		listCleared(this.$pendingDelta = initDelta(this), count);
		listMutated(this);
	}
}

function insertAt<T>(this: List<T>, index: number, item: T) {
	if (index === this.$items.length) {
		copyOnWrite(this);
		this.$items.push(item);
	}
	else {
		assertIndex(this, index);
		copyOnWrite(this);
		this.$items.splice(index, 0, item);
	}

	// only emit deltas when there are observers
	if (this.$dh) {
		itemInserted(this.$pendingDelta = initDelta(this), index, item);
		listMutated(this);
	}
}

function insertFirst<T>(this: List<T>, item: T) {
	this.insertAt(0, item);
}

function insertLast<T>(this: List<T>, item: T) {
	this.insertAt(this.$items.length, item);
}

function remove<T>(this: List<any>, item: T) {
	const index = this.$items.indexOf(item);
	if (index === -1) {
		return false;
	}

	this.removeAt(index);
	return true;
}

function removeAt<T>(this: List<T>, index: number) {
	assertIndex(this, index);
	copyOnWrite(this);
	const item = this.$items.splice(index, 1)[0];

	// only emit deltas when there are observers
	if (this.$dh) {
		itemRemoved(this.$pendingDelta = initDelta(this), index, item);
		listMutated(this);
	}

	return item;
}

function removeFirst<T>(this: List<T>) {
	return this.$items.length > 0 ? this.removeAt(0) : undefined;
}

function removeLast<T>(this: List<T>) {
	const { length } = this.$items;
	return length > 0 ? this.removeAt(length - 1) : undefined;
}


function assertIndex(list: List<any>, index: number) {
	if (index >= list.$items.length || index < 0) {
		if (__DEV__) {
			throw new RangeError("list index out of bounds");
		}
		else {
			throw new RangeError();
		}
	}
}

function initDelta<T>(list: List<T>): PendingListDelta<T> {
	if (list.$pendingDelta) {
		const pending = list.$notify;
		if (!pending || pending.$life === pending.$lifecycle!.$life) {
			return list.$pendingDelta;
		}
	}

	return {
		changes: [],
		relSize: 0,
	};
}

function copyOnWrite(list: List<any>) {
	if (list.$itemsLock > 0) {
		list.$items = list.$items.slice();
		list.$itemsLock = 0
	}
}

function listMutated(list: List<any>) {
	if (__DEV__) {
		runtime.hmrState!.preserve(list.$lifecycle, list.$devId, list.$items);
	}

	scheduleTick(list.$lifecycle, list.$notify ??= {
		$fn: notifyListObservers,
		$a0: list,
	});

	scheduleTock(list.$lifecycle, list.$afterNotify ??= {
		$fn: afterNotifyListObservers,
		$a0: list,
	});
}

function notifyListObservers(list: List<any>) {
	// Keep the delivered delta stable for observers. Mutations made while notifying accumulate in a
	// separate delta for the next pass.

	const delta = list.$pendingDelta!;
	list.$pendingDelta = null;

	// unless forced, skip notifications whenever the delta is a no-op
	if (list.$force || delta.changes.length > 0) {
		delta.snapshot = list.$items;
		list.$committedDelta = delta as ListDelta<any>;
		list.$itemsLock += 1; // protect the snapshot
		list.$force = false;

		notify(list);
	}
}

function afterNotifyListObservers(list: List<any>) {
	list.$committedDelta = null;
	list.$itemsLock = Math.max(list.$itemsLock - 1, 0); // release snapshot
}
