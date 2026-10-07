import { invoke } from "~/support/common";
import type { ArgsMax3, Callback } from "~/support/types";

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
	 * Array of pending update callbacks, cleared after each tick.
	 */
	readonly $onTick: UpdateCallback[];

	/**
	 * Array of pending end-of-update callbacks, cleared after each tick.
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
export function createScheduler(tick: TickFn) {
	const ticks: UpdateCallback[] = [];
	let tocks: UpdateCallback[] = [];
	let tocksParked: UpdateCallback[] = [];
	let isPending = false;

	const scheduler: Scheduler = {
		$epoch: 1,
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
		const epoch = scheduler.$epoch;
		let hasDrained = false;

		try {
			let index = 0;
			let callback;

			// Array lengths are re-read on each cycle, as they may increase when additional
			// callbacks get queued by the code we're invoking.

			for (; index < ticks.length; index += 1) {
				callback = ticks[index];
				callback.$se = 0;
				if (callback.$life === callback.$lifecycle!.$life) {
					invoke(callback);
				}
			}

			// The main queue drained, tick phase is now done. There may still be pending tock
			// callbacks queued, but at this point the current epoch is sealed. If tock callbacks
			// schedule additional work, it will be queued for the next future update rather than
			// executed synchronously in this one.

			ticks.length = 0;

			scheduler.$onTock = tocksParked;
			scheduler.$epoch = epoch + 1;

			hasDrained = true;

			for (index = 0; index < tocks.length; index += 1) {
				callback = tocks[index];

				// An earlier tock may have queued this same callback for the next tick (i.e. it is
				// now in both the `tocks` and `tocksParked` queues and is marked with the future
				// epoch number). If this happens, we must keep its pending marker intact,
				// otherwise we can reset it normally.
				if (callback.$se === epoch) {
					callback.$se = 0;
				}

				if (callback.$life === callback.$lifecycle!.$life) {
					invoke(callback);
				}
			}
		}
		finally {
			if (hasDrained) {
				const tmp = tocksParked;
				tocksParked = tocks;
				tocks = tmp;

				tocksParked.length = 0;
			}
			else {
				// tick callback invocation threw, drop scheduled work
				ticks.length = 0;
				tocks.length = 0;
				scheduler.$epoch += 1;
			}

			isPending = false;
			if (ticks.length || tocks.length) {
				scheduler.$scheduleTick();
			}
		}
	};

	return scheduler;
}

function schedule(lifecycle: Lifecycle, queue: UpdateCallback[], callback: UpdateCallback) {
	const scheduler = lifecycle.$scheduler;
	if (callback.$se === scheduler.$epoch) {
		// This callback is already pending; It will observe the latest state when it runs.
		return;
	}

	callback.$lifecycle = lifecycle;
	callback.$life = lifecycle.$life;
	callback.$se = scheduler.$epoch;
	queue.push(callback);
	scheduler.$scheduleTick();
}

/** @internal */
export function scheduleTick(lifecycle: Lifecycle, callback: UpdateCallback) {
	schedule(lifecycle, lifecycle.$scheduler.$onTick, callback);
}

/**
 * Runs a block of code on the next tick of the scheduler, synchronized with other updates. Unless
 * a tick is already pending, a new one is scheduled.
 *
 * Atoms written within the block will deliver their update notifications synchronously within the
 * same tick.
 */
export function tick(block: () => void, lifecycle = getLifecycle()) {
	schedule(lifecycle, lifecycle.$scheduler.$onTick, { $fn: block });
}

/** @internal */
export function scheduleTock(lifecycle: Lifecycle, callback: UpdateCallback) {
	schedule(lifecycle, lifecycle.$scheduler.$onTock, callback);
}

/**
 * Runs a block of code after the next tick of the scheduler, once all regular updates finished.
 * Unless a tick is already pending, a new one is scheduled.
 *
 * While it is possible to write Atoms within the block, their update notifications are
 * no longer delivered in the same scheduler tick - they're postponed to the next one.
 */
export function tock(block: () => void, lifecycle = getLifecycle()) {
	schedule(lifecycle, lifecycle.$scheduler.$onTock, { $fn: block });
}
