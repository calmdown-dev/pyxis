import { invoke } from "~/support/common";
import type { ArgsMax2, Callback, Nil } from "~/support/types";

import { getLifecycle, type Lifecycle } from "./Lifecycle";

/**
 * Manages a queue of scheduled updates.
 * @internal
 */
export interface Scheduler {
	readonly $scheduleTick: () => void;
	$epoch: number;
	$pending?: Nil<UpdateCallback[]>;
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
	$lc?: Lifecycle;

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
	const scheduler: Scheduler = {
		$epoch: 1,
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
			const callbacks = scheduler.$pending!;

			// re-read length on each cycle, as it may increase
			let index = 0;
			let callback;

			for (; index < callbacks.length; index += 1) {
				callback = callbacks[index];
				if (callback.$lc!.mounted) {
					if (__DEV__) {
						callback.$re = scheduler.$epoch;
					}

					invoke(callbacks[index]);
				}
			}
		}
		finally {
			isPending = false;
			scheduler.$pending = null;
			scheduler.$epoch += 1;
		}
	};

	return scheduler;
}

/**
 * Adds the provided callback to the update queue. Does nothing if already queued.
 * @internal
 */
export function schedule(lifecycle: Lifecycle, callback: UpdateCallback) {
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

	callback.$lc = lifecycle;
	callback.$se = scheduler.$epoch;
	(scheduler.$pending ??= []).push(callback);
	scheduler.$scheduleTick();
}

/**
 * Runs a block of code on the next tick of the scheduler, synchronized with other updates. If a
 * tick is not currently pending, a new one is scheduled.
 */
export function tick(block: () => void, lifecycle = getLifecycle()) {
	schedule(lifecycle, { $fn: block });
}
