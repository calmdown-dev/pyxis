import type { Nil } from "~/support/types";
import { runtime } from "~/Runtime";
import { S_ATOM } from "~/symbols";

import { notify, type DependencyList } from "./Dependency";
import { reportAccess } from "./Effect";
import { getLifecycle, type Lifecycle } from "./Lifecycle";
import { scheduleTick } from "./Scheduler";

/** Contract for Atoms where they need to be read. */
export interface ReadAtom<out T> extends DependencyList {
	/** Pyxis Atom type guard marker. */
	readonly [S_ATOM]: true;

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
 * Holds any single value, managing reactions to its changes. Use the `read`, `write` functions to
 * access its value.
 * @see {@link read}
 * @see {@link write}
 */
export interface Atom<T = unknown> extends ReadAtom<T> {
	/**
	 * Sets the value of this Atom. Does nothing if this Atom is readonly. Only use this method when
	 * the target is guaranteed to be an Atom, otherwise it is recommended to use the `write` or
	 * `update` functions.
	 *
	 * This method does *not* send out any change notifications to observers!
	 * @returns Boolean indicating whether the value of this Atom changed.
	 * @see {@link write}
	 * @see {@link update}
	 */
	set: (value: T) => boolean;

	/** @internal */
	readonly $lifecycle: Lifecycle;

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

interface DirectAtom<T> extends Atom<any> {
	$value: T;
}

/**
 * Union of the given type or an Atom of that type. Use the `read`, `peek`, `write`, `update` or
 * `isAtom` functions to interact with such values.
 * @see {@link read}
 * @see {@link peek}
 * @see {@link write}
 * @see {@link update}
 * @see {@link isAtom}
 */
export type MaybeAtom<T> = Atom<T> | T;

/**
 * Union of the given type or the ReadAtom contract of that type. Use the `read`, `peek` or `isAtom`
 * functions to interact with such values.
 * @see {@link read}
 * @see {@link peek}
 * @see {@link isAtom}
 */
export type MaybeReadAtom<T> = ReadAtom<T> | T;

/**
 * Creates an empty Atom; i.e. value set to `undefined`.
 */
export function atomOf<T>(): Atom<T | undefined>;

/**
 * Creates an Atom initialized to the provided value. If the provided value is already an Atom, it
 * is returned as-is.
 * @see {@link isAtom}
 */
export function atomOf<T>(initialValue: MaybeAtom<T>, lifecycle?: Lifecycle, devId?: string): Atom<T>;

export function atomOf<T>(initialValue?: MaybeAtom<T>, lifecycle = getLifecycle()) {
	if (isAtom(initialValue)) {
		return initialValue;
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
		runtime.hmrState!.restore(lifecycle, devId, value => {
			atom.$value = value;
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
		runtime.hmrState!.preserve(this.$lifecycle, this.$devId, value);
	}

	return true;
}

/**
 * Atom type guard, checks if the provided input is an Atom.
 */
export function isAtom<T = unknown>(input: Nil<MaybeAtom<T>>): input is Atom<T>;
export function isAtom<T = unknown>(input: Nil<MaybeReadAtom<T>>): input is ReadAtom<T>;
export function isAtom<T = unknown>(input: unknown): input is Atom<T>;
export function isAtom(input: unknown): input is Atom<any> {
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
export function read<A>(input: A): A extends MaybeReadAtom<infer T> ? T : never;
export function read<T>(input: MaybeReadAtom<T>) {
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
export function peek<A>(input: A): A extends MaybeReadAtom<infer T> ? T : never;
export function peek<T>(input: MaybeReadAtom<T>): T {
	if (isAtom<T>(input)) {
		return input.get();
	}

	return input;
}

/**
 * Checks if the provided input is an Atom, writes its value and returns the new value.
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
	value: A extends Atom<infer T> ? T : never,
	force?: boolean,
): A extends MaybeAtom<infer T> ? T : never;

export function write<T>(input: MaybeAtom<T>, value: T, force = false): T {
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
 * Non-atom inputs are never modified in any way and the input is returned as-is.
 * @see {@link isAtom}
 * @see {@link read}
 * @see {@link peek}
 * @see {@link write}
 */
export function update<A>(
	input: A,
	transform: A extends Atom<infer T> ? (value: T) => T : never,
	force?: boolean,
): A extends MaybeAtom<infer T> ? T : never;

export function update<T>(input: MaybeAtom<T>, transform: (value: T) => T, force = false): T {
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
export function notifyAtomObservers<T>(input: Atom<T>) {
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
