import { atomOf, isAtom, peek, read, update, write, type Atom, type MaybeAtom, type ReadAtom } from "~/data/Atom";
import { derived } from "~/data/Derivation";
import { getLifecycle } from "~/data/Lifecycle";

import { noop } from "./common";

/**
 * A template string tag that creates a Derivation Atom from the tagged template. The derivation
 * automatically observes any Atoms among substitutions and updates the resulting string whenever
 * one or more of these Atoms change.
 *
 * Substitutions use String conversion; Failed conversions get replaced with `[error]`. Ideally,
 * you'd want to make sure `String(yourValue)` never fails.
 */
export function text(strings: TemplateStringsArray, ...values: unknown[]) {
	const { length } = values;
	return derived(() => {
		let result = strings[0];
		let index = 0;
		let value;

		while (index < length) {
			value = read(values[index]);

			// only catch stringification errors
			try {
				value = String(value);
			}
			catch {
				value = "[error]";
			}

			result += value + strings[++index];
		}

		return result;
	});
}

/**
 * Creates a callback wrapping a call to the {@link write} function. Useful for decluttering inline
 * event handlers in JSX templates.
 * @see {@link write}
 */
export function writes<A>(
	input: A,
	value: A extends Atom<infer T> ? T : never,
	force?: boolean,
): () => void;

export function writes<T>(input: MaybeAtom<T>, value: T, force?: boolean) {
	return isAtom(input)
		? () => void write(input, value, force)
		: noop;
}

/**
 * Creates a callback wrapping a call to the {@link update} function. Useful for decluttering inline
 * event handlers in JSX templates.
 * @see {@link update}
 */
export function updates<A>(
	input: A,
	transform: A extends Atom<infer T> ? (value: T) => T : never,
	force?: boolean,
): () => void;

export function updates<T>(input: MaybeAtom<T>, transform: (value: T) => T, force?: boolean) {
	return isAtom(input)
		? () => void update(input, transform, force)
		: noop;
}


/**
 * Extracts the type of value represented by the given type, unwrapping Atoms if they're part of the
 * type.
 */
export type ValueType<T> = T extends ReadAtom<infer V> ? V : T;

/**
 * Infers an object with its fields' values wrapped in Atoms. Optionally, if a specific TKeys union
 * is provided, only select fields will be wrapped.
 */
export type AtomsOf<TData extends { readonly [K in string]: any }, TKeys extends keyof TData = keyof TData> = {
	[K in keyof TData]: K extends TKeys
		? Atom<ValueType<TData[K]>>
		: TData[K];
};

/**
 * Creates a new data object mapped from the one provided, with its fields' values wrapped in
 * mutable Atoms. Optionally, a tuple of keys can be given to only wrap the select fields, copying
 * others as-is.
 */
export function atomsOf<TData extends { readonly [K in string]: any }>(
	data: TData,
): AtomsOf<TData>;

export function atomsOf<TData extends { readonly [K in string]: any }, TKeys extends readonly (keyof TData)[]>(
	data: TData,
	keys: TKeys,
): AtomsOf<TData, TKeys[number]>;

export function atomsOf(
	data: { readonly [K in string]: any },
	keys?: readonly string[],
) {
	const result: { [K in string]: Atom<any> } = {};
	const lifecycle = getLifecycle();
	if (keys) {
		const { length } = keys;
		let index = 0;
		let key;

		for (; index < length; index += 1) {
			key = keys[index];
			result[key] = atomOf(peek(data[key]), lifecycle);
		}

		for (key in data) {
			if (result[key] === undefined) {
				result[key] = data[key];
			}
		}
	}
	else {
		let key;
		for (key in data) {
			result[key] = atomOf(peek(data[key]), lifecycle);
		}
	}

	return result;
}

/**
 * Assigns values taken from the provided data object to the store (typically previously created via
 * {@link atomsOf}). Optionally, a tuple of keys can be given to only assign the select fields,
 * ignoring others.
 */
export function assign<TData extends { readonly [K in string]: any }, TStore extends Readonly<AtomsOf<TData>>>(
	store: TStore,
	data: TData,
): TStore;

export function assign<TData extends { readonly [K in string]: any }, TKeys extends readonly (keyof TData)[], TStore extends Readonly<AtomsOf<Pick<TData, TKeys[number]>>>>(
	store: TStore,
	data: TData,
	keys: TKeys,
): TStore;

export function assign(
	store: { readonly [K in string]: Atom<any> },
	data: { readonly [K in string]: any },
	keys?: readonly string[],
) {
	if (keys) {
		const { length } = keys;
		let index = 0;
		let key;

		for (; index < length; index += 1) {
			key = keys[index];
			store[key].set(peek(data[key]));
		}
	}
	else {
		let key;
		for (key in data) {
			store[key].set(peek(data[key]));
		}
	}

	return store;
}
