import { S_ATOM } from "~/symbols";

import { scheduleAtomNotification, type Atom, type WriteAtom } from "./Atom";
import { resolve, unlinkEffectDep, type Effect, type EffectDependency } from "./Effect";
import { getLifecycle } from "./Lifecycle";

/**
 * Holds a value derived from values of other Atoms, managing reactions to their changes.
 * Derivations are read-only. Use the `read` function to access its value.
 * @see {@link read}
 */
export interface Derivation<T = unknown> extends Atom<T> {
	/** @internal */
	$dirty: boolean;

	/** @internal */
	$value: T;
}

/** @internal */
interface DerivationInternal<T> extends Derivation<T>, WriteAtom<T>, Effect<T> {}

/**
 * Creates a Derivation - an Atom with its value computed from other Atoms. The block runs once
 * eagerly to compute the initial value, then re-runs within scheduler ticks whenever its source
 * Atoms change. Observers are only notified if the new value differs from the previous.
 */
export function derived<T>(block: () => T, lifecycle = getLifecycle()): Derivation<T> {
	const atom: DerivationInternal<T> = {
		[S_ATOM]: true,
		$dirty: false,
		$value: null!,
		$tracksValue: true,
		$lifecycle: lifecycle,
		$life: lifecycle.$life,
		$lastValue: null!,
		$cycle: 0,
		$block: block,
		$react: scheduleReaction,
		get: getValue,
		set: setValue,
	};

	const value = resolve(atom) as T;
	atom.$value = value;
	atom.$lastValue = value;

	return atom;
}

function scheduleReaction(this: EffectDependency, derivation: DerivationInternal<any>, cycle: number) {
	if (
		// derivation was scheduled in a previous life and this run is now stale
		derivation.$life !== derivation.$lifecycle.$life ||

		// when we get an update from a stale dependency, the reported cycle number will be lower
		// than our current one (see the reportAccess function). We can unlink the dep and bail out.
		derivation.$cycle > cycle
	) {
		unlinkEffectDep(derivation, this);
		return;
	}

	// we're already within a scheduler tick; the effect will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already queued updates and coalesces
	// additional notifications while the first one is still pending.
	derivation.$dirty = true;
	scheduleAtomNotification(derivation);
}

function getValue<T>(this: DerivationInternal<T>): T {
	// life number must match, otherwise we'd re-link deps within a lifecycle that already ended
	if (this.$dirty && this.$life === this.$lifecycle.$life) {
		this.$value = resolve(this) as T;
		this.$dirty = false;
	}

	return this.$value!;
}

function setValue() {
	return false;
}
