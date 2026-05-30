import { notify, S_ATOM, type Atom } from "./Atom";
import { getLifecycle } from "./Lifecycle";
import { unlink } from "./Dependency";
import { resolve, type Effect, type EffectDependency } from "./Effect";
import { schedule } from "./Scheduler";

/**
 * Holds a value derived from values of other Atoms, managing reactions to their changes.
 * Derivations are read-only. Use the `read` function to access its value.
 * @see {@link read}
 */
export interface Derivation<T = unknown> extends Atom<T>, Effect<T> {
	/** @internal */
	$dirty: boolean;

	/** @internal */
	$value: T;
}

/**
 * Creates a Derivation - an Atom with its value computed from other Atoms. The block runs once
 * eagerly to compute the initial value, then re-runs within scheduler ticks whenever its source
 * Atoms change. Observers are only notified if the new value differs from the previous.
 */
export function derived<T>(block: () => T, lifecycle = getLifecycle()): Derivation<T> {
	const atom: Derivation<T> = {
		[S_ATOM]: true,
		$dirty: false,
		$value: null!,
		$tracksValue: true,
		$lifecycle: lifecycle,
		$lastValue: null!,
		$epoch: 0,
		$block: block,
		$react: scheduleNotify,
		$get: getValue,
		$set: setValue,
	};

	const value = resolve(atom) as T;
	atom.$value = value;
	atom.$lastValue = value;

	return atom;
}

function scheduleNotify(this: EffectDependency, derivation: Derivation<any>, epoch: number) {
	// lazy cleanup: when we get an update from a stale dependency, the reported epoch will be lower
	// than our current one (see the reportAccess function). We can unlink and skip the effect.
	if (derivation.$epoch > epoch) {
		unlink(this);
		return;
	}

	// we're already within a scheduler tick; the effect will therefore run synchronously despite
	// being "scheduled" - this also gives priority to already scheduled updates and prevents
	// infinite loops when dependency cycles exist
	derivation.$dirty = true;
	schedule(derivation.$lifecycle, derivation.$notify ??= {
		$fn: notify,
		$a0: derivation,
	});
}

function getValue<T>(this: Derivation<T>): T {
	if (this.$dirty) {
		this.$value = resolve(this) as T;
		this.$dirty = false;
	}

	return this.$value!;
}

function setValue() {
	return false;
}
