import { invoke } from "~/support/common";
import type { Nil } from "~/support/types";

import { getLifecycle, type Lifecycle } from "./Lifecycle";
import type { DependencyList } from "./Dependency";
import { __DEV__assertNotEffect, reportAccess } from "./Effect";
import { createDelta, itemChanged, itemInserted, itemRemoved, listCleared, listSynced, type Equals, type ListDelta } from "./ListDelta";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface ReadonlyList<T> extends Iterable<T>, DependencyList {
	/**
	 * Gets the size of this List.
	 * Reactive in effects and derivations.
	 */
	size(): number;

	/**
	 * Gets the item at the specified index. Return undefined when outside of the List's bounds.
	 * Reactive in effects and derivations.
	 */
	get(index: number): T | undefined;

	/**
	 * Gets the underlying array of items. The array is read-only, attempts to mutate this array
	 * will cause observers to go out of sync.
	 * Reactive in effects and derivations.
	 */
	raw(): readonly T[];

	/**
	 * Runs the provided callback for each item of this List.
	 * Reactive in effects and derivations.
	 */
	forEach(callback: (item: T, index: number) => void, thisArg?: any): void;

	/** @internal */
	readonly $lifecycle: Lifecycle;

	/** @internal */
	$items: readonly T[];

	/** @internal */
	$delta?: Nil<ListDelta<T>>;

	/** @internal */
	$notify?: UpdateCallback<[ self: List<T> ]>;

	/**
	 * The ID of this List, used in development mode.
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
		__DEV__assertNotEffect();

		const devId = arguments[2];
		globalThis.__PYXIS_HMR__.state.restore(lifecycle, devId, value => {
			if (Array.isArray(value)) {
				source = value;
			}
		});
	}

	const items = source ? Array.from(source) : [];
	const list: List<T> = {
		$lifecycle: lifecycle,
		$items: items,
		[Symbol.iterator]: getIterator,
		size,
		get,
		raw,
		forEach,
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
 * Note: This function is separated instead of being a List method since the underlying diff
 * algorithm (Myers) is a relatively large chunk of code which would otherwise always get included
 * into bundled builds. This way, tools like Terser can eliminate the extra code when unused.
 */
export function sync<T>(list: List<T>, source: readonly T[], eq: Equals<T> = defaultEquals) {
	const oldState = list.$items;
	list.$items = source.slice();
	listSynced(list.$delta ??= createDelta(), oldState, source, eq);
	listMutated(list);
}

function size(this: List<any>) {
	reportAccess(this);
	return this.$items.length;
}

function get(this: List<any>, index: number) {
	reportAccess(this);
	return this.$items[index];
}

function raw<T>(this: List<T>): readonly T[] {
	reportAccess(this);
	return this.$items;
}

function forEach<T>(this: List<T>, callback: (item: T, index: number) => void, thisArg?: any) {
	reportAccess(this);
	this.$items.forEach(callback, thisArg);
}

function getIterator<T>(this: List<T>) {
	reportAccess(this);
	return this.$items[Symbol.iterator]();
}

function set<T>(this: List<T>, index: number, item: T) {
	assertIndex(this, index);
	if (Object.is(this.$items[index], item)) {
		return;
	}

	this.$items[index] = item;

	// only emit deltas when there are observers
	if (this.$dh) {
		itemChanged(this.$delta ??= createDelta(), index, item);
		listMutated(this);
	}
}

function clear(this: List<any>) {
	const count = this.$items.length;
	this.$items.length = 0;

	// only emit deltas when there are observers
	if (this.$dh) {
		listCleared(this.$delta ??= createDelta(), count);
		listMutated(this);
	}
}

function insertAt<T>(this: List<T>, index: number, item: T) {
	const { $items } = this;
	if (index === $items.length) {
		$items.push(item);
	}
	else {
		assertIndex(this, index);
		this.$items.splice(index, 0, item);
	}

	// only emit deltas when there are observers
	if (this.$dh) {
		itemInserted(this.$delta ??= createDelta(), index, item);
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
	const removed = this.$items.splice(index, 1)[0];

	// only emit deltas when there are observers
	if (this.$dh) {
		itemRemoved(this.$delta ??= createDelta(), index);
		listMutated(this);
	}

	return removed;
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

function defaultEquals<T>(item0: T, item1: T) {
	return item0 === item1;
}

function listMutated(list: List<any>) {
	if (__DEV__) {
		globalThis.__PYXIS_HMR__.state.preserve(list.$lifecycle, list.$devId, list.$items);
	}

	schedule(list.$lifecycle, list.$notify ??= {
		$fn: notify,
		$a0: list,
	});
}

function notify(list: List<any>) {
	let current = list.$dh;
	let next;
	while (current) {
		next = current.$an;
		invoke(current);
		current = next;
	}

	list.$delta = null;
}
