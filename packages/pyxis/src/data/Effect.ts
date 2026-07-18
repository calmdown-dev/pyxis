import type { Nil } from "~/support/types";

import { getLifecycle, onUnmounted, setLifecycle, type Lifecycle } from "./Lifecycle";
import { link, unlink, type Dependency, type DependencyList } from "./Dependency";
import { schedule, type UpdateCallback } from "./Scheduler";

export interface EffectBlock {
	(): (() => void) | void;
}

export interface Effect<T> {
	/** @internal */
	readonly $lifecycle: Lifecycle;

	/** @internal */
	readonly $life: number;

	/** @internal */
	readonly $block: () => T;

	/** @internal */
	readonly $react: (effect: this, epoch: number) => void;

	/**
	 * Keeps track of the effect run cycle, incrementing on each effect run. Used to detect stale
	 * dependencies and lazily unlink them.
	 * @internal
	 */
	$cycle: number;

	/** @internal */
	$deps?: WeakMap<DependencyList, EffectDependency>;

	/** @internal */
	$resolve?: UpdateCallback<[ effect: this ]>;

	/** @internal */
	$dispose?: Nil<() => void>;

	/** @internal */
	$tracksUnmount?: true;
}

/** @internal */
export type EffectDependency = Dependency<[ effect: Effect<any>, epoch: number ]>;

/**
 * Creates an Effect - a block of logic executed each time any of the Atoms accessed within it
 * change. The block is first synchronously executed when the Effect is created.
 *
 * If a teardown callback is returned, it will be run before the next effect re-run, or on component
 * unmount.
 */
export function effect(block: EffectBlock, lifecycle = getLifecycle()) {
	runEffect({
		$lifecycle: lifecycle,
		$life: lifecycle.$life,
		$block: block,
		$react: scheduleEffect,
		$cycle: 0,
	});
}

function scheduleEffect(this: EffectDependency, effect: Effect<ReturnType<EffectBlock>>, cycle: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported epoch will be lower
	// than our current one (see the reportAccess function). We can unlink and skip the effect.
	if (effect.$cycle > cycle) {
		unlink(this);
		return;
	}

	// we're already within a scheduler tick; the effect will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already scheduled updates and prevents
	// potential infinite loops in case dependency cycles exist
	schedule(effect.$lifecycle, effect.$resolve ??= {
		$fn: runEffect,
		$a0: effect,
	});
}

function runEffect(effect: Effect<ReturnType<EffectBlock>>) {
	// effect was scheduled in a previous life and is now stale
	if (effect.$life !== effect.$lifecycle.$life) {
		return;
	}

	effect.$dispose?.();
	effect.$dispose = resolve(effect) as Nil<() => void>;

	if (!effect.$tracksUnmount && effect.$dispose) {
		effect.$tracksUnmount = true;
		onUnmounted(effect.$lifecycle, {
			$fn: teardownEffect,
			$a0: effect,
		});
	}
}

function teardownEffect(effect: Effect<ReturnType<EffectBlock>>) {
	effect.$dispose?.();
	effect.$dispose = null;
}

let $currentEffect: Effect<any> | null = null;

/**
 * Resolves an Effect: runs user logic tracking accessed Atoms and updating dependency links.
 * Returned value is forwarded.
 * @internal
 */
export function resolve<TEffect extends Effect<any>>(effect: TEffect): TEffect extends Effect<infer T> ? T : unknown {
	effect.$deps ??= new WeakMap();
	effect.$cycle += 1;

	const previousEffect = $currentEffect;
	const previousLifecycle = setLifecycle(effect.$lifecycle);
	$currentEffect = effect;

	try {
		return effect.$block();
	}
	finally {
		setLifecycle(previousLifecycle);
		$currentEffect = previousEffect;
	}
}

/**
 * Reports an Atom has been accessed. Does nothing if not within an Effect.
 * @internal
 */
export function reportAccess(atom: DependencyList) {
	if (!$currentEffect || $currentEffect.$life !== $currentEffect.$lifecycle.$life) {
		return;
	}

	let dep = $currentEffect.$deps!.get(atom);
	if (dep) {
		// refresh dependency to the current epoch
		dep.$a1 = $currentEffect.$cycle;
		if (!dep.$lifecycle) {
			// dep has become temporarily stale and got unlinked while still lingering in the
			// $deps WeakMap - that's okay, but must be re-linked now to work again
			link($currentEffect.$lifecycle, atom, dep);
		}
	}
	else {
		link($currentEffect.$lifecycle, atom, dep = {
			$fn: $currentEffect.$react,
			$a0: $currentEffect,
			$a1: $currentEffect.$cycle,
		});

		$currentEffect.$deps!.set(atom, dep);
	}
}

/**
 * Asserts that the current code is not running within an effect block.
 * Only used in development; In production, this function should be removed by the bundler.
 */
export function __DEV__assertNotEffect() {
	if (
		$currentEffect &&
		$currentEffect.$lifecycle === getLifecycle() &&
		$currentEffect.$life === $currentEffect.$lifecycle.$life
	) {
		throw new Error("Attempt to create an Atom inside an effect block.");
	}
}
