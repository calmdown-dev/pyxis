import { peek, read } from "~/data/Atom";
import type { JsxText } from "~/Component";

import type { Nil } from "./types";

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
 * A template literal tag that automatically wraps each substitution in a `read` call.
 * @see {@link read}
 */
export function reads(strings: TemplateStringsArray, ...values: JsxText[]) {
	return tag(read, strings, values);
}

/**
 * A template literal tag that automatically wraps each substitution in a `peek` call.
 * @see {@link peek}
 */
export function peeks(strings: TemplateStringsArray, ...values: JsxText[]) {
	return tag(peek, strings, values);
}
