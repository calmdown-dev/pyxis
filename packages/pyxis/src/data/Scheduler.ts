import { invoke, rethrow } from "~/support/common";
import type { ArgsMax3, Callback } from "~/support/types";
import { runtime } from "~/Runtime";

import { getLifecycle, type Lifecycle } from "./Lifecycle";

/**
 * Manages a queue of scheduled updates.
 * @internal
 */
export interface Scheduler {
	/**
	 * Schedules a new tick to execute, unless one is already pending or executing.
	 */
	readonly $scheduleTick: () => void;

	/**
	 * Array of pending effect update callbacks, cleared after each tick.
	 */
	readonly $onEffect: UpdateCallback[];

	/**
	 * Array of pending update callbacks, cleared after each tick.
	 */
	readonly $onTick: UpdateCallback[];

	/**
	 * Array of pending end-of-tick callbacks, cleared after each tick.
	 */
	$onTock: UpdateCallback[];

	/**
	 * Increments with each scheduler tick. Identifies pending callbacks and invalidates any
	 * discarded callbacks when a tick throws.
	 */
	$epoch: number;
}

/**
 * An update callback that can be scheduled.
 * @see {@link Scheduler}
 * @internal
 */
export interface UpdateCallback<TArgs extends ArgsMax3 = ArgsMax3> extends Callback<TArgs> {
	/**
	 * The Lifecycle responsible for this callback.
	 */
	$lifecycle?: Lifecycle;

	/**
	 * The life number of the Lifecycle when this callback was scheduled.
	 */
	$life?: number;

	/**
	 * Schedule epoch - tracked to deduplicate callbacks while they are pending. Cleared before
	 * execution so a running callback can schedule itself again.
	 */
	$se?: number;
}

/**
 * A function able to schedule a callback to be executed at a later time, e.g. `queueMicrotask`.
 * The function must guarantee that the callback will be eventually executed.
 */
export interface TickFn {
	(onTick: () => void): void;
}

/** @internal */
/*@__NO_SIDE_EFFECTS__*/
export function createScheduler(tick: TickFn) {
	const effects: UpdateCallback[] = [];
	const ticks: UpdateCallback[] = [];
	let tocks: UpdateCallback[] = [];
	let tocksParked: UpdateCallback[] = [];
	let isPending = false;

	const scheduler: Scheduler = {
		$epoch: 1,
		$onEffect: effects,
		$onTick: ticks,
		$onTock: tocks,
		$scheduleTick: () => {
			if (isPending) {
				return;
			}

			isPending = true;
			tick(update);
		},
	};

	const update = () => {
		const prevLifecycle = runtime.$currentLifecycle;
		const epoch = scheduler.$epoch;
		let errors: unknown[] | undefined;
		let effectIndex = 0;
		let tickIndex = 0;
		let callback;

		// Array lengths are re-read on each cycle, as they may increase when additional
		// callbacks get queued by the code we're invoking.

		do {
			// drain tick queue first
			while (tickIndex < ticks.length) {
				callback = ticks[tickIndex++];
				callback.$se = 0;
				if (callback.$life === callback.$lifecycle!.$life) {
					try {
						runtime.$currentLifecycle = callback.$lifecycle!;
						invoke(callback);
					}
					catch (ex) {
						(errors ??= []).push(ex);
					}
				}
			}

			// run the next effect, then repeat - the effect may schedule additional ticks
			if (effectIndex < effects.length) {
				callback = effects[effectIndex++];
				callback.$se = 0;
				if (callback.$life === callback.$lifecycle!.$life) {
					try {
						runtime.$currentLifecycle = callback.$lifecycle!;
						invoke(callback);
					}
					catch (ex) {
						(errors ??= []).push(ex);
					}
				}
			}
		}
		while (tickIndex < ticks.length || effectIndex < effects.length);

		// The main queue drained, tick phase is now done. There may still be pending tocks
		// queued, but at this point the current epoch is sealed. If tock callbacks schedule
		// additional work, it will be queued for the next future update rather than executed
		// synchronously in this one.

		effects.length = 0;
		ticks.length = 0;

		scheduler.$onTock = tocksParked;
		scheduler.$epoch = epoch + 1;

		// run pending tocks
		const { length } = tocks;
		let tockIndex = 0;

		for (; tockIndex < length; tockIndex += 1) {
			callback = tocks[tockIndex];

			// An earlier tock may have queued this same callback for the next tick (i.e. it is
			// now in both the `tocks` and `tocksParked` queues and is marked with the future
			// epoch number). If this happens, we must keep its pending marker intact,
			// otherwise we can reset it normally.
			if (callback.$se === epoch) {
				callback.$se = 0;
			}

			if (callback.$life === callback.$lifecycle!.$life) {
				try {
					runtime.$currentLifecycle = callback.$lifecycle!;
					invoke(callback);
				}
				catch (ex) {
					(errors ??= []).push(ex);
				}
			}
		}

		// clear tocks queue
		const tmp = tocksParked;
		tocksParked = tocks;
		tocks = tmp;

		tocksParked.length = 0;

		// unlock and re-schedule if needed
		isPending = false;
		if (ticks.length || tocks.length) {
			scheduler.$scheduleTick();
		}

		// restore original lifecycle
		runtime.$currentLifecycle = prevLifecycle;

		// re-throw errors, if there were any
		rethrow(errors);
	};

	return scheduler;
}

function schedule(lifecycle: Lifecycle, queue: UpdateCallback[], callback: UpdateCallback) {
	// always update lifecycle metadata - the callback object may have been reused while the
	// lifecycle changed, which could happen in a single tick, so this cannot skipped
	callback.$lifecycle = lifecycle;
	callback.$life = lifecycle.$life;

	const scheduler = lifecycle.$scheduler;
	if (callback.$se === scheduler.$epoch) {
		// This callback is already pending; It will observe the latest state when it runs.
		return;
	}

	callback.$se = scheduler.$epoch;
	queue.push(callback);
	scheduler.$scheduleTick();
}

/** @internal */
export function scheduleEffect(lifecycle: Lifecycle, callback: UpdateCallback) {
	schedule(lifecycle, lifecycle.$scheduler.$onEffect, callback);
}

/**
 * Runs a block of code on the next tick of the scheduler, synchronized with other updates. Unless
 * a tick is already pending, a new one is scheduled.
 *
 * Atoms written within the block will deliver their update notifications synchronously within the
 * same tick.
 */
export function tick(block: () => void, lifecycle = getLifecycle()) {
	schedule(lifecycle, lifecycle.$scheduler.$onTick, { fn: block });
}

/**
 * Similar to {@link tick}, but instead accepts a {@link Callback} object. Useful in hot paths
 * where it may be desirable to reuse callback objects and/or avoid closures.
 * @see {@link tick}
 */
export function scheduleTick<TArgs extends ArgsMax3>(lifecycle: Lifecycle, callback: Callback<TArgs>) {
	schedule(lifecycle, lifecycle.$scheduler.$onTick, callback as UpdateCallback);
}

/**
 * Runs a block of code immediately after the next tick of the scheduler, once all regular updates
 * have finished. Unless a tick is already pending, a new one is scheduled.
 *
 * While it is possible to write Atoms within the block, their update notifications are
 * no longer delivered in the same scheduler tick - they're postponed to the next one.
 */
export function tock(block: () => void, lifecycle = getLifecycle()) {
	schedule(lifecycle, lifecycle.$scheduler.$onTock, { fn: block });
}

/**
 * Similar to {@link tock}, but instead accepts a {@link Callback} object. Useful in hot paths
 * where it may be desirable to reuse callback objects and/or avoid closures.
 * @see {@link tock}
 */
export function scheduleTock<TArgs extends ArgsMax3>(lifecycle: Lifecycle, callback: Callback<TArgs>) {
	schedule(lifecycle, lifecycle.$scheduler.$onTock, callback as UpdateCallback);
}
