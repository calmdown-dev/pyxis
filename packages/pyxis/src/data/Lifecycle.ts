import type { Callback, Nil } from "~/support/types";

import type { DependencyList } from "./Dependency";
import type { Scheduler } from "./Scheduler";

export interface Lifecycle extends DependencyList {
	/** whether this Lifecycle is currently mounted or not */
	mounted: boolean;

	/** @internal */
	readonly $scheduler: Scheduler;

	/**
	 * tracks the life of this lifecycle, incremented each time it is resurrected - used for
	 * detecting stale updates scheduled in a previous life
	 * @internal
	 */
	$life: number;

	/** @internal */
	$onMount?: Nil<Callback[]>;

	/** @internal */
	$onUnmount?: Nil<Callback[]>;
}

export interface MountBlock {
	(): (() => void) | void;
}

export interface UnmountBlock {
	(): void;
}


/**
 * Registers a callback to run just after the current Component has mounted.
 *
 * If a teardown callback is returned, it will be run just before the Component unmounts (equivalent
 * to adding a separate `unmounted` block).
 * @see {@link unmounted}
 */
export function mounted(block: MountBlock, lifecycle = getLifecycle()) {
	onMounted(lifecycle, {
		$fn: invokeMountedCallback,
		$a0: lifecycle,
		$a1: block,
	});
}

/** @internal */
export function onMounted(lifecycle: Lifecycle, callback: Callback) {
	(lifecycle.$onMount ??= []).push(callback);
}

function invokeMountedCallback(lifecycle: Lifecycle, block: MountBlock) {
	const dispose = block();
	if (dispose) {
		onUnmounted(lifecycle, { $fn: dispose });
	}
}


/**
 * Registers a callback to run once the current Component is just about to unmount.
 * @see {@link mounted}
 */
export function unmounted(block: UnmountBlock, lifecycle = getLifecycle()) {
	onUnmounted(lifecycle, { $fn: block });
}

/** @internal */
export function onUnmounted(lifecycle: Lifecycle, callback: Callback) {
	(lifecycle.$onUnmount ??= []).push(callback);
}


let $currentLifecycle: Lifecycle | null = null;

/**
 * Gets the Lifecycle of the calling component.
 */
export function getLifecycle(): Lifecycle {
	if (__DEV__ && !$currentLifecycle) {
		throw new Error("Cannot get current lifecycle. Are you creating an Atom outside of a Component?");
	}

	return $currentLifecycle!;
}

/** @internal */
export function setLifecycle(lifecycle: Lifecycle | null): Lifecycle | null {
	const previous = $currentLifecycle;
	$currentLifecycle = lifecycle;
	return previous;
}

/**
 * Runs a block of code with the provided Lifecycle. Calls to `getLifecycle` within the block will
 * return the specified object.
 * @see {@link getLifecycle}
 */
export function withLifecycle<TArgs extends [ arg?: any ], TReturn>(
	lifecycle: Lifecycle,
	block: (...args: TArgs) => TReturn,
	...args: TArgs
): TReturn;

export function withLifecycle(
	lifecycle: Lifecycle,
	block: (arg: any) => any,
	arg: any,
) {
	const previousLifecycle = $currentLifecycle;
	$currentLifecycle = lifecycle;

	try {
		return block(arg);
	}
	finally {
		$currentLifecycle = previousLifecycle;
	}
}
