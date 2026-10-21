import type { ArgsMax3, Callback, Nil } from "~/support/types";
import { runtime } from "~/Runtime";

import type { DependencyList } from "./Dependency";
import type { Scheduler } from "./Scheduler";
import { __DEV__assertIsDirectComponentCode } from "~/Component";

export interface Lifecycle extends DependencyList {
	/** gets a boolean indicating whether this Lifecycle is currently mounted or not */
	readonly mounted: boolean;

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
 * Registers a block of code to run once the current Component has mounted.
 *
 * If a teardown callback is returned, it will be run just before the Component unmounts (equivalent
 * to adding a separate `unmounted` block).
 * @see {@link unmounted}
 */
export function mounted(block: MountBlock, lifecycle?: Lifecycle) {
	if (__DEV__ && lifecycle === undefined) {
		__DEV__assertIsDirectComponentCode(mounted.name);
	}

	lifecycle ??= getLifecycle();
	onceMounted(lifecycle, {
		fn: invokeMountedCallback,
		a0: lifecycle,
		a1: block,
	});
}

/**
 * Similar to {@link mounted}, but instead accepts a {@link Callback} object. Useful in hot paths
 * where it may be desirable to reuse callback objects, avoid closures, or {@link Lifecycle} needs
 * to be tightly controlled.
 * @see {@link mounted}
 */
export function onceMounted<TArgs extends ArgsMax3>(lifecycle: Lifecycle, callback: Callback<TArgs>) {
	(lifecycle.$onMount ??= []).push(callback as Callback);
}

/** @internal */
export function invokeMountedCallback(lifecycle: Lifecycle, block: MountBlock): void;
export function invokeMountedCallback<TArg>(lifecycle: Lifecycle, block: (arg: TArg) => (() => void) | void, arg: TArg): void;
export function invokeMountedCallback(lifecycle: Lifecycle, block: (arg: any) => (() => void) | void, arg?: any) {
	const life = lifecycle.$life;
	const dispose = block(arg);
	if (dispose) {
		if (lifecycle.$life > life) {
			dispose();
			return;
		}

		onceUnmounted(lifecycle, { fn: dispose });
	}
}


/**
 * Registers a block of code to run once the current Component is just about to unmount.
 * @see {@link mounted}
 */
export function unmounted(block: UnmountBlock, lifecycle?: Lifecycle) {
	if (__DEV__ && lifecycle === undefined) {
		__DEV__assertIsDirectComponentCode(unmounted.name);
	}

	onceUnmounted(lifecycle ?? getLifecycle(), { fn: block });
}

/**
 * Similar to {@link unmounted}, but instead accepts a {@link Callback} object. Useful in hot paths
 * where it may be desirable to reuse callback objects, avoid closures, or {@link Lifecycle} needs
 * to be tightly controlled.
 * @see {@link unmounted}
 */
export function onceUnmounted<TArgs extends ArgsMax3>(lifecycle: Lifecycle, callback: Callback<TArgs>) {
	(lifecycle.$onUnmount ??= []).push(callback as Callback);
}


/**
 * Gets the Lifecycle of the calling component.
 */
export function getLifecycle(): Lifecycle {
	if (__DEV__ && !runtime.$currentLifecycle) {
		throw new Error("Cannot get current lifecycle. Are you creating an Atom outside of a Component?");
	}

	return runtime.$currentLifecycle!;
}

/**
 * Runs a block of code with the provided Lifecycle. Calls to `getLifecycle` within the block will
 * return the specified object.
 * @see {@link getLifecycle}
 */
export function withLifecycle<TArgs extends ArgsMax3, TReturn>(
	lifecycle: Lifecycle,
	block: (...args: TArgs) => TReturn,
	...args: TArgs
): TReturn;

export function withLifecycle(
	lifecycle: Lifecycle,
	block: (a0: any, a1: any, a2: any) => any,
	a0?: any,
	a1?: any,
	a2?: any,
) {
	const prevLifecycle = runtime.$currentLifecycle;
	runtime.$currentLifecycle = lifecycle;

	try {
		return block(a0, a1, a2);
	}
	finally {
		runtime.$currentLifecycle = prevLifecycle;
	}
}
