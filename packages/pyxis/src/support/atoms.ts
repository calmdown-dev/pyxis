import { isAtom, read, update, write, type Atom, type MaybeAtom } from "~/data/Atom";
import type { JsxText } from "~/Component";

import { noop } from "./common";
import { derived } from '~/data/Derivation';

/**
 * A template string tag that creates a Derivation Atom from the tagged template. The derivation
 * automatically observes any Atoms among substitutions and updates the resulting string whenever
 * one or more of these Atoms change.
 */
export function text(strings: TemplateStringsArray, ...values: JsxText[]) {
	const { length } = values;
	return derived(() => {
		let index = 0;
		let text = strings[0];
		while (index < length) {
			text += read(values[index]) + strings[++index];
		}

		return text;
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
