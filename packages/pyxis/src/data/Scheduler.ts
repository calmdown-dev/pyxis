import { invoke } from "~/support/common";
import type { ArgsMax2, Callback } from "~/support/types";

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
	readonly $onTock: UpdateCallback[];

	/**
	 * Increments with each scheduler tick. Used to deduplicate updates and detect dependency
	 * cycles.
	 */
	$epoch: number;
}

/**
 * An update callback that can be scheduled.
 * @see {@link Scheduler}
 * @internal
 */
export interface UpdateCallback<TArgs extends ArgsMax2 = ArgsMax2> extends Callback<TArgs> {
	/**
	 * The Lifecycle responsible for this callback.
	 */
	$lifecycle?: Lifecycle;

	/**
	 * The life number of the Lifecycle when this callback was scheduled.
	 */
	$life?: number;

	/**
	 * Schedule epoch - tracked to prevent scheduling the same callback multiple times within
	 * the same tick.
	 */
	$se?: number;

	/**
	 * Run epoch - only tracked in dev mode to detect dependency loops.
	 */
	$re?: number;
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
	let isPending = false;

	const ticks: UpdateCallback[] = [];
	const tocks: UpdateCallback[] = [];
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
		try {
			let index = 0;
			let callback;

			// array lengths are re-read on each cycle, as they may increase when new updates get
			// added by the running code

			// run ticks
			for (; index < ticks.length; index += 1) {
				callback = ticks[index];
				if (callback.$life === callback.$lifecycle!.$life) {
					if (__DEV__) {
						callback.$re = scheduler.$epoch;
					}

					invoke(callback);
				}
			}

			// run tocks
			for (index = 0; index < tocks.length; index += 1) {
				callback = tocks[index];
				if (callback.$life === callback.$lifecycle!.$life) {
					if (__DEV__) {
						callback.$re = scheduler.$epoch;
					}

					invoke(callback);
				}
			}
		}
		finally {
			isPending = false;
			ticks.length = 0;
			tocks.length = 0;
			scheduler.$epoch += 1;
		}
	};

	return scheduler;
}

function schedule(lifecycle: Lifecycle, queue: UpdateCallback[], callback: UpdateCallback) {
	const scheduler = lifecycle.$scheduler;
	if (callback.$se === scheduler.$epoch) {
		if (__DEV__ && callback.$re === scheduler.$epoch) {
			// if run epoch (::$re) matches, the callback already executed this tick and now is being
			// scheduled again in the same tick -> this is potentially an infinite loop, complain:
			throw new Error("Refusing to re-schedule an update after it already executed, as it may cause an infinite loop. Are you mutating an Atom inside an effect that observes it?");
		}

		// if schedule epoch (::$se) matches, the callback was already scheduled -> bail
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
 * Runs a block of code on the next tick of the scheduler, synchronized with other updates. If a
 * tick is not currently pending, a new one is scheduled.
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
 * If a tick is not currently pending, a new one is scheduled.
 */
export function tock(block: () => void, lifecycle = getLifecycle()) {
	schedule(lifecycle, lifecycle.$scheduler.$onTock, { $fn: block });
}
