import { atomOf, isAtom, peek, read, update, write, type Atom, type MaybeAtom, type ReadAtom } from "~/data/Atom";
import { derived } from "~/data/Derivation";
import { getLifecycle, type Lifecycle } from "~/data/Lifecycle";

import { noop } from "./common";
import type { Flatten } from "./types";

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
export type AtomsOf<TData extends { readonly [K in string]: any }, TKeys extends (keyof TData & (string | number)) | undefined = undefined> = (
	undefined extends TKeys
		? {
			[K in keyof TData as K extends string | number ? K : never]: undefined extends TData[K]
				? MaybeAtom<ValueType<TData[K]>>
				: Atom<ValueType<TData[K]>>;
		}
		: Flatten<(
			& { [K in TKeys & keyof TData & (string | number)] -?: Atom<ValueType<TData[K]>> }
			& Omit<Pick<TData, keyof TData & (string | number)>, TKeys & keyof TData>
		)>
);

/**
 * Creates a new data object mapped from the one provided, with its fields' values wrapped in
 * mutable Atoms. Optionally, a tuple of keys can be given to only wrap the select fields, copying
 * others as-is.
 */
export function atomsOf<TData extends { readonly [K in string]: any }>(
	data: TData,
	lifecycle?: Lifecycle,
): AtomsOf<TData>;

export function atomsOf<TData extends { readonly [K in string]: any }, const TKeys extends readonly (keyof TData & (string | number))[]>(
	data: TData,
	keys: TKeys & (number extends TKeys["length"] ? never : unknown),
	lifecycle?: Lifecycle,
): AtomsOf<TData, TKeys[number]>;

export function atomsOf(
	data: { readonly [K in string]: any },
	keysOrLifecycle?: readonly (string | number)[] | Lifecycle,
	maybeLifecycle?: Lifecycle,
) {
	let keys: readonly (string | number)[] | undefined;
	let lifecycle: Lifecycle | undefined;

	if (keysOrLifecycle === undefined || Array.isArray(keysOrLifecycle)) {
		keys = keysOrLifecycle as (readonly (string | number)[] | undefined);
		lifecycle = maybeLifecycle;
	}
	else {
		lifecycle = keysOrLifecycle as (Lifecycle | undefined);
	}

	lifecycle ??= getLifecycle();

	const result: { [K in string]: Atom<any> } = Object.create(null);
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
 * Assigns values taken from the provided data object to the store (typically previously created
 * via {@link atomsOf}). Optionally, a tuple of keys can be given to treat select fields as
 * guaranteed Atoms while copying others as-is. Typically, you'd pass the same keys tuple to both
 * `atomsOf` and later `assign` calls.
 */
export function assign<TData extends { readonly [K in string]: any }, TStore extends AtomsOf<TData>>(
	store: TStore,
	data: TData,
	lifecycle?: Lifecycle,
): TStore;

export function assign<TData extends { readonly [K in string]: any }, const TKeys extends readonly (keyof TData & (string | number))[], TStore extends AtomsOf<TData, TKeys[number]>>(
	store: TStore,
	data: TData,
	keys: TKeys & (number extends TKeys["length"] ? never : unknown),
	lifecycle?: Lifecycle,
): TStore;

export function assign(
	store: { [K in string]?: Atom<any> },
	data: { readonly [K in string]: any },
	keysOrLifecycle?: readonly (string | number)[] | Lifecycle,
	maybeLifecycle?: Lifecycle,
) {
	let keys: readonly (string | number)[] | undefined;
	let lifecycle: Lifecycle | undefined;

	if (keysOrLifecycle === undefined || Array.isArray(keysOrLifecycle)) {
		keys = keysOrLifecycle as (readonly (string | number)[] | undefined);
		lifecycle = maybeLifecycle;
	}
	else {
		lifecycle = keysOrLifecycle as (Lifecycle | undefined);
	}

	const visited: { [K in string]?: true } = Object.create(null);
	if (keys) {
		const { length } = keys;
		let index = 0;
		let key;

		for (; index < length; index += 1) {
			key = keys[index];
			write(store[key], peek(data[key]));
			visited[key] = true;
		}

		for (key in data) {
			if (!visited[key]) {
				store[key] = data[key];
			}
		}
	}
	else {
		let key;
		let atom;

		for (key in store) {
			atom = store[key];
			if (isAtom(atom)) {
				write(atom, peek(data[key]));
			}
			else {
				store[key] = atomOf(peek(data[key]), lifecycle ??= getLifecycle());
			}

			visited[key] = true;
		}

		for (key in data) {
			if (!visited[key]) {
				store[key] = atomOf(peek(data[key]), lifecycle ??= getLifecycle());
			}
		}
	}

	return store;
}
