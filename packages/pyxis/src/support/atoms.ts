import { isAtom, read, update, write, type Atom, type MaybeAtom } from "~/data/Atom";
import { derived } from "~/data/Derivation";

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
