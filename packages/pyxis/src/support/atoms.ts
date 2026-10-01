import { isAtom, peek, read, update, write, type Atom, type MaybeAtom } from "~/data/Atom";
import type { JsxText } from "~/Component";

import type { Nil } from "./types";
import { noop } from "./common";

function tag(
	access: (value: JsxText) => Nil<string | number | bigint | boolean>,
	strings: TemplateStringsArray,
	values: readonly JsxText[],
): string {
	const { length } = values;

	let index = 0;
	let text = strings[0];
	while (index < length) {
		text += access(values[index]) + strings[++index];
	}

	return text;
}

/**
 * A template literal tag that automatically wraps each substitution in a {@link read} call.
 * @see {@link read}
 */
export function reads(strings: TemplateStringsArray, ...values: JsxText[]) {
	return tag(read, strings, values);
}

/**
 * A template literal tag that automatically wraps each substitution in a {@link peek} call.
 * @see {@link peek}
 */
export function peeks(strings: TemplateStringsArray, ...values: JsxText[]) {
	return tag(peek, strings, values);
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
