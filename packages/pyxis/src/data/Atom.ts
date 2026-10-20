import type { Nil } from "~/support/types";
import { runtime } from "~/Runtime";
import { S_ATOM } from "~/symbols";

import { notify, type DependencyList } from "./Dependency";
import { reportAccess } from "./Effect";
import { getLifecycle, type Lifecycle } from "./Lifecycle";
import { scheduleTick } from "./Scheduler";

/**
 * Holds any single value, managing reactions to its changes. A bare Atom is read-only. Use the
 * `read` and `peek` functions to access its value.
 * @see {@link read}
 * @see {@link peek}
 * @see {@link WriteAtom}
 */
export interface Atom<out T> extends DependencyList {
	/** Pyxis Atom type guard marker. */
	readonly [S_ATOM]: true;

	/** @internal */
	readonly $lifecycle: Lifecycle;

	/**
	 * Gets the value of this Atom. Only use this method when the target is guaranteed to be an
	 * Atom, otherwise it is recommended to use the `read` or `peek` functions.
	 *
	 * This method does *not* report access, thus within effects it is analogous to `peek`.
	 * @see {@link read}
	 * @see {@link peek}
	 */
	get: () => T;
}

/**
 * Holds any single value, managing reactions to its changes. Values of WriteAtom are mutable and
 * can be freely changed at any time. Use the `read`, `peek`, `write` or `update` functions to
 * access or manipulate its value.
 * @see {@link read}
 * @see {@link peek}
 * @see {@link write}
 * @see {@link update}
 * @see {@link Atom}
 */
export interface WriteAtom<T = unknown> extends Atom<T> {
	/**
	 * Sets the value of this Atom. Does nothing if this Atom is readonly. This method does *not*
	 * emit any change notification to the Atom's observers; Using it recklessly can leave observers
	 * out of date with stale state! Please make sure you know exactly what you're doing; It is
	 * *strongly* recommended to use the `write` or `update` functions instead.
	 *
	 * @returns Boolean indicating whether the value of this Atom changed.
	 * @see {@link write}
	 * @see {@link update}
	 */
	set: (value: T) => boolean;

	/** @internal */
	$tracksValue?: boolean;

	/** @internal */
	$lastValue?: T;

	/**
	 * The ID of this Atom, only present in development mode with transpiler.
	 * @internal
	 */
	$devId?: string;
}

interface DirectAtom<T> extends WriteAtom<any> {
	$value: T;
}

/**
 * Union of the given type or an Atom of that type. Use the `read`, `peek` or `isAtom` functions to
 * interact with such values.
 * @see {@link read}
 * @see {@link peek}
 * @see {@link isAtom}
 */
export type MaybeAtom<T> = Atom<T> | T;

/**
 * Union of the given type or a WriteAtom of that type. Use the `read`, `peek`, `write`, `update` or
 * `isAtom` functions to interact with such values.
 * @see {@link read}
 * @see {@link peek}
 * @see {@link write}
 * @see {@link update}
 * @see {@link isAtom}
 */
export type MaybeWriteAtom<T> = WriteAtom<T> | T;

/**
 * Creates an empty WriteAtom; i.e. value set to `undefined`.
 */
export function atomOf<T>(): WriteAtom<T | undefined>;

/**
 * Creates a WriteAtom initialized to the provided value.
 *
 * If the provided initial value is itself an Atom, its value is automatically unwrapped.
 *
 * If you're intentionally creating an Atom intended to hold other Atoms, create an empty Atom first
 * and write it separately, e.g.:
 *
 * ```ts
 * const atom = atomOf<Atom<number>>();
 * write(atom, otherAtom);
 * ```
 */
export function atomOf<T>(initialValue: MaybeAtom<T>, lifecycle?: Lifecycle, devId?: string): WriteAtom<T>;

export function atomOf<T>(initialValue?: MaybeAtom<T>, lifecycle = getLifecycle()) {
	if (isAtom(initialValue)) {
		initialValue = initialValue.get();
	}

	const atom: DirectAtom<T> = {
		[S_ATOM]: true,
		$value: initialValue as T,
		$tracksValue: true,
		$lifecycle: lifecycle,
		$lastValue: initialValue,
		get: getValue,
		set: setValue,
	};

	if (__DEV__) {
		const devId = arguments[2];
		atom.$devId = devId;
		runtime.$hmrState!.restore(lifecycle, devId, value => {
			atom.$value = value;
			atom.$lastValue = value;
		});
	}

	return atom;
}

function getValue<T>(this: DirectAtom<T>) {
	return this.$value;
}

function setValue<T>(this: DirectAtom<T>, value: T) {
	if (Object.is(this.$value, value)) {
		return false;
	}

	this.$value = value;
	if (__DEV__) {
		runtime.$hmrState!.preserve(this.$lifecycle, this.$devId, value);
	}

	return true;
}

/**
 * Atom type guard, checks if the provided input is an Atom.
 */
export function isAtom<T = unknown>(input: Nil<MaybeWriteAtom<T>>): input is WriteAtom<T>;
export function isAtom<T = unknown>(input: Nil<MaybeAtom<T>>): input is Atom<T>;
export function isAtom<T = unknown>(input: unknown): input is WriteAtom<T>;
export function isAtom(input: unknown): input is WriteAtom<any> {
	return (
		input !== null &&
		typeof input === "object" &&
		(input as { [S_ATOM]?: true })[S_ATOM] === true
	);
}

/**
 * Checks if the provided input is an Atom and reads its value. Non-atom inputs are returned as-is.
 * Reports read access when inside an effect.
 * @see {@link isAtom}
 * @see {@link peek}
 * @see {@link write}
 * @see {@link update}
 */
export function read<A>(input: A): A extends MaybeAtom<infer T> ? T : never;
export function read<T>(input: MaybeAtom<T>) {
	if (isAtom<T>(input)) {
		reportAccess(input);
		return input.get();
	}

	return input;
}

/**
 * Checks if the provided input is an Atom and reads its value. Non-atom inputs are returned as-is.
 * Does NOT report read access when inside an effect.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link write}
 * @see {@link update}
 */
export function peek<A>(input: A): A extends MaybeAtom<infer T> ? T : never;
export function peek<T>(input: MaybeAtom<T>): T {
	if (isAtom<T>(input)) {
		return input.get();
	}

	return input;
}

/**
 * Checks if the provided input is an Atom, writes its value and returns the new value.
 *
 * Writing readonly Atoms is simply a no-op. Their current value will be returned and the provided
 * new value discarded.
 *
 * Non-atom inputs are never modified in any way. Instead the provided new value is discarded and
 * the input is returned as-is.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link peek}
 * @see {@link update}
 */
export function write<A>(
	input: A,
	value: A extends WriteAtom<infer T> ? T : never,
	force?: boolean,
): A extends MaybeWriteAtom<infer T> ? T : never;

export function write<T>(input: MaybeWriteAtom<T>, value: T, force = false): T {
	if (!isAtom(input)) {
		return input;
	}

	if (input.set(value) || force) {
		if (input.$dh) {
			input.$force ||= force;
			scheduleTick(input.$lifecycle, input.$notify ??= {
				$fn: notifyAtomObservers,
				$a0: input,
			});
		}
		else if (input.$tracksValue) {
			return (input.$lastValue = input.get());
		}
	}

	return input.get();
}

/**
 * Checks if the provided input is an Atom, updates its value using the provided transform function
 * and returns the new value.
 *
 * Updating readonly Atoms is simply a no-op. Their current value will be returned and the
 * transformed new value discarded.
 *
 * Non-atom inputs are never modified in any way and the input is returned as-is.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link peek}
 * @see {@link write}
 */
export function update<A>(
	input: A,
	transform: A extends WriteAtom<infer T> ? (value: T) => T : never,
	force?: boolean,
): A extends MaybeWriteAtom<infer T> ? T : never;

export function update<T>(input: MaybeWriteAtom<T>, transform: (value: T) => T, force = false): T {
	if (!isAtom(input)) {
		return input;
	}

	const value = transform(input.get());
	if (input.set(value) || force) {
		if (input.$dh) {
			input.$force ||= force;
			scheduleTick(input.$lifecycle, input.$notify ??= {
				$fn: notifyAtomObservers,
				$a0: input,
			});
		}
		else if (input.$tracksValue) {
			return (input.$lastValue = input.get());
		}
	}

	return input.get();
}

/**
 * Notifies the dependencies of an Atom.
 * @internal
 */
export function notifyAtomObservers<T>(input: WriteAtom<T>) {
	// optimization: when Atom changes multiple times within a single update and ends up with the
	// same value it started with, the notification can be skipped, unless forced - this flag is set
	// either by users via the `write` or `update` functions, or by the framework when a new
	// observer joins while a notification is already pending and might've seen an outdated value
	if (input.$tracksValue) {
		const newValue = input.get();
		if (!input.$force && Object.is(input.$lastValue, newValue)) {
			return;
		}

		input.$lastValue = newValue;
	}

	input.$force = false;
	notify(input);
}
