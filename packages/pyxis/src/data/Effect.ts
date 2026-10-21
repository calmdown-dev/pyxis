import type { ArgsMax3, Nil } from "~/support/types";

import { getLifecycle, onceUnmounted, type Lifecycle } from "./Lifecycle";
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
		fn: runEffect,
		a0: effect,
	});
}

function runEffect(effect: Effect<ReturnType<EffectBlock>>) {
	const lifecycle = effect.$lifecycle;

	// effect was scheduled in a previous life and is now stale
	if (effect.$life !== lifecycle.$life) {
		return;
	}

	teardownEffect(effect);

	// the teardown may have unmounted the owner lifecycle
	if (effect.$life !== lifecycle.$life) {
		return;
	}

	effect.$dispose = resolve(effect) as Nil<() => void>;

	// the effect body also may cause the owner to unmount... if so, dispose immediately
	if (effect.$life !== lifecycle.$life) {
		teardownEffect(effect);
		return;
	}

	if (!effect.$tracksUnmount && effect.$dispose) {
		effect.$tracksUnmount = true;
		onceUnmounted(lifecycle, {
			fn: teardownEffect,
			a0: effect,
		});
	}
}

function teardownEffect(effect: Effect<ReturnType<EffectBlock>>) {
	const fn = effect.$dispose;
	if (!fn) {
		return;
	}

	const prevLifecycle = runtime.$currentLifecycle;
	runtime.$currentLifecycle = effect.$lifecycle;
	effect.$dispose = null;

	try {
		fn();
	}
	finally {
		runtime.$currentLifecycle = prevLifecycle;
	}
}

/**
 * Resolves an Effect: runs user logic tracking accessed Atoms and updating dependency links.
 * Returned value is forwarded.
 * @internal
 */
export function resolve<TEffect extends Effect<any>>(effect: TEffect): TEffect extends Effect<infer T> ? T : unknown {
	effect.$rc = 0;

	const cycle = (effect.$cycle += 1);
	const prevLifecycle = runtime.$currentLifecycle;
	const prevEffect = runtime.$currentEffect;
	const prevTail = effect.$et;
	runtime.$currentLifecycle = effect.$lifecycle;
	runtime.$currentEffect = effect;

	try {
		return effect.$block();
	}
	finally {
		runtime.$currentLifecycle = prevLifecycle;
		runtime.$currentEffect = prevEffect;

		// on re-runs, check if new Atoms were accessed - if so, eagerly cleanup
		if (cycle > 1 && effect.$rc > 0 && prevTail) {
			let current = effect.$eh;
			let next;

			while (current) {
				next = current.$en;
				if (current.a1! < cycle) {
					unlinkEffectDep(effect, current);
				}

				// beyond the previous tail, there can only be new dependencies -> cleanup done
				if (current === prevTail) {
					break;
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
export function unlinkEffectDep<TEffect extends Effect<any>>(effect: TEffect, dep: EffectDependency) {
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

	effect.$deps?.delete(dep.$target!);
	unlink(dep);
}

/**
 * Reports an Atom has been accessed. Does nothing if not within an Effect.
 * @internal
 */
export function reportAccess(atom: DependencyList) {
	const currentEffect = runtime.$currentEffect;
	if (!currentEffect || currentEffect.$life !== currentEffect.$lifecycle.$life) {
		return;
	}

	// look for a Dependency object already linked to this Atom
	const deps = currentEffect.$deps;
	let dep: EffectDependency | null | undefined;
	let count = 0;

	if (deps) {
		dep = deps.get(atom);
	}
	else {
		dep = currentEffect.$eh;
		while (dep) {
			count += 1;
			if (dep.$target === atom) {
				break;
			}

			dep = dep.$en;
		}
	}

	if (dep) {
		// Dependency found, refresh its cycle number
		dep.a1 = currentEffect.$cycle;
		if (!dep.$lifecycle) {
			// Dependency has become temporarily stale and got unlinked while still lingering in
			// the $deps WeakMap - that's okay, but it must be re-linked to work again
			link(currentEffect.$lifecycle, atom, dep);
		}
	}
	else {
		// no Dependency found, link a new one for this Atom
		link(currentEffect.$lifecycle, atom, dep = {
			fn: currentEffect.$react,
			a0: currentEffect,
			a1: currentEffect.$cycle,
		});

		if (deps) {
			deps.set(atom, dep);
		}
		else if (count >= 5) {
			// this Effect now has enough Dependencies to justify a WeakMap for faster lookups
			const map = currentEffect.$deps = new WeakMap<DependencyList, EffectDependency>();

			// insert existing Dependencies to the map
			let current = currentEffect.$eh;
			do {
				map.set(current!.$target!, current!);
			}
			while (current = current!.$en);

			// insert the new Dependency
			map.set(atom, dep);
		}

		// link to the Effect itself (the link function only links to Lifecycle and the Atom)
		if (currentEffect.$et) {
			currentEffect.$et.$en = dep;
			dep.$ep = currentEffect.$et;
		}
		else {
			currentEffect.$eh = dep;
		}

		currentEffect.$et = dep;
		currentEffect.$rc! += 1;
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
	const prevEffect = runtime.$currentEffect;
	runtime.$currentEffect = null;

	try {
		return block(a0, a1, a2);
	}
	finally {
		runtime.$currentEffect = prevEffect;
	}
}
