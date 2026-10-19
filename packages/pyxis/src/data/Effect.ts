import type { ArgsMax3, Nil } from "~/support/types";

import { getLifecycle, onUnmounted, setLifecycle, type Lifecycle } from "./Lifecycle";
import { link, unlink, type Dependency, type DependencyList } from "./Dependency";
import { scheduleEffect, type UpdateCallback } from "./Scheduler";
import { runtime } from "~/Runtime";

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
	readonly $react: (effect: this, cycle: number) => void;

	/**
	 * Keeps track of the effect run cycle, incrementing on each effect run. Used to detect stale
	 * dependencies and lazily unlink them.
	 * @internal
	 */
	$cycle: number;

	/**
	 * The head of the effect dependencies linked list.
	 * @internal
	 */
	$eh?: Nil<EffectDependency>;

	/**
	 * The tail of the effect dependencies linked list.
	 * @internal
	 */
	$et?: Nil<EffectDependency>;

	/**
	 * The number of previously unseen Atoms accessed during the current Effect run.
	 * @internal
	 */
	$rc?: number;

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
export interface EffectDependency extends Dependency<[ effect: Effect<any>, cycle: number ]> {
	/**
	 * Previous EffectDependency within an Effect's dependency list.
	 */
	$ep?: Nil<EffectDependency>;

	/**
	 * Next EffectDependency within an Effect's dependency list.
	 */
	$en?: Nil<EffectDependency>;
}

/**
 * Creates an Effect - a block of logic executed each time any of the Atoms accessed within it
 * change. The block is first synchronously executed when the Effect is created. Atoms may be
 * written or even created within the block, but note that writing an Atom this Effect depends on
 * may cause an infinite update loop when the state doesn't converge to a point where no more
 * re-runs of this Effect are required.
 *
 * When a teardown callback is returned, it will be run before the next re-run of this Effect, or
 * once the enclosing Component unmounts, whichever comes first.
 */
export function effect(block: EffectBlock, lifecycle = getLifecycle()) {
	runEffect({
		$lifecycle: lifecycle,
		$life: lifecycle.$life,
		$block: block,
		$react: scheduleReaction,
		$cycle: 0,
	});
}

function scheduleReaction(this: EffectDependency, effect: Effect<ReturnType<EffectBlock>>, cycle: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported cycle will be lower
	// than our current one (see the reportAccess function). We can unlink and skip the effect.
	if (effect.$cycle > cycle) {
		unlinkEffectDep(effect, this);
		return;
	}

	// we're already within a scheduler tick; the effect will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already queued updates and coalesces
	// additional re-run attempts while the first one is still pending.
	scheduleEffect(effect.$lifecycle, effect.$resolve ??= {
		$fn: runEffect,
		$a0: effect,
	});
}

function runEffect(effect: Effect<ReturnType<EffectBlock>>) {
	// effect was scheduled in a previous life and is now stale
	if (effect.$life !== effect.$lifecycle.$life) {
		return;
	}

	teardownEffect(effect);
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
	const fn = effect.$dispose;
	if (!fn) {
		return;
	}

	const previousLifecycle = setLifecycle(effect.$lifecycle);
	try {
		fn();
	}
	finally {
		setLifecycle(previousLifecycle);
		effect.$dispose = null;
	}
}

/**
 * Resolves an Effect: runs user logic tracking accessed Atoms and updating dependency links.
 * Returned value is forwarded.
 * @internal
 */
export function resolve<TEffect extends Effect<any>>(effect: TEffect): TEffect extends Effect<infer T> ? T : unknown {
	effect.$deps ??= new WeakMap();
	effect.$rc = 0;

	const cycle = (effect.$cycle += 1);
	const previousEffect = runtime.e;
	const previousLifecycle = setLifecycle(effect.$lifecycle);
	runtime.e = effect;

	try {
		return effect.$block();
	}
	finally {
		setLifecycle(previousLifecycle);
		runtime.e = previousEffect;

		// on re-runs, check if new Atoms were accessed - if so, eagerly cleanup
		if (cycle > 1 && effect.$rc > 0) {
			let current = effect.$eh;
			let next;
			while (current) {
				next = current.$en;
				if (current.$a1! < cycle) {
					unlinkEffectDep(effect, current);
				}

				current = next;
			}
		}
	}
}

/**
 * Unlinks an EffectDependency from the Effect, its Lifecycle and the target Atom. Also deletes its
 * entry from the deps WeakMap.
 * @internal
 */
function unlinkEffectDep(effect: Effect<any>, dep: EffectDependency) {
	if (dep.$ep) {
		dep.$ep.$en = dep.$en;
	}
	else if (effect.$eh === dep) {
		effect.$eh = dep.$en;
	}

	if (dep.$en) {
		dep.$en.$ep = dep.$ep;
	}
	else if (effect.$et === dep) {
		effect.$et = dep.$ep;
	}

	dep.$ep = null;
	dep.$en = null;

	effect.$deps!.delete(dep.$target!);
	unlink(dep);
}

/**
 * Reports an Atom has been accessed. Does nothing if not within an Effect.
 * @internal
 */
export function reportAccess(atom: DependencyList) {
	const currentEffect = runtime.e;
	if (!currentEffect || currentEffect.$life !== currentEffect.$lifecycle.$life) {
		return;
	}

	let dep = currentEffect.$deps!.get(atom);
	if (dep) {
		// refresh dependency to the current cycle number
		dep.$a1 = currentEffect.$cycle;
		if (!dep.$lifecycle) {
			// dep has become temporarily stale and got unlinked while still lingering in the
			// $deps WeakMap - that's okay, but must be re-linked to work again
			link(currentEffect.$lifecycle, atom, dep);
		}
	}
	else {
		link(currentEffect.$lifecycle, atom, dep = {
			$fn: currentEffect.$react,
			$a0: currentEffect,
			$a1: currentEffect.$cycle,
		});

		currentEffect.$deps!.set(atom, dep);
		currentEffect.$rc! += 1;

		// add the dependency to the Effect's list
		if (currentEffect.$et) {
			currentEffect.$et.$en = dep;
			dep.$ep = currentEffect.$et;
		}
		else {
			currentEffect.$eh = dep;
		}

		currentEffect.$et = dep;
	}
}

/**
 * Runs a block of code removed from any effects. Accessing atoms within this block will be ignored
 * by any effect that may otherwise be observing this code.
 */
export function noEffect<TArgs extends ArgsMax3, TReturn>(
	block: (...args: TArgs) => TReturn,
	...args: TArgs
): TReturn;

export function noEffect(
	block: (a0: any, a1: any, a2: any) => any,
	a0?: any,
	a1?: any,
	a2?: any,
) {
	const prevEffect = runtime.e;
	runtime.e = null;

	try {
		return block(a0, a1, a2);
	}
	finally {
		runtime.e = prevEffect;
	}
}
