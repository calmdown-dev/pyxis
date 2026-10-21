import type { Adapter } from "@calmdown/pyxis";

import type { IntrinsicElements } from "~/jsx/baked";
import { PROP_MAP } from "~/jsx/mapping";

import { batch, insert, marker, remove, text } from "./common";

export const DomAdapter: Adapter<Node, IntrinsicElements> = {
	element,
	text,
	marker,
	batch,
	insert,
	remove,
	set,
	tick: queueMicrotask,
};

function element(tagName: string) {
	return document.createElement(tagName);
}

function set(node: Node, prop: string, value: any) {
	(node as { [P in string]: any })[(PROP_MAP as { readonly [P in string]?: string })[prop] || prop] = value;
}
