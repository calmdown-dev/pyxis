import { peek, type Adapter, type JsxObject } from "@calmdown/pyxis/core";

import type { IntrinsicElements } from "~/jsx/baked";
import { PROP_MAP } from "~/jsx/mapping";

import { batch, insert, marker, remove, text } from "./common";

export const DomAdapter: Adapter<Node, IntrinsicElements> = {
	element,
	finalize,
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

function finalize(node: Node, props: JsxObject) {
	switch ((node as Element).tagName) {
		case "INPUT":
		case "SELECT": {
			let prop;
			if (typeof (prop = peek(props.value)) === "string") {
				(node as HTMLInputElement | HTMLSelectElement).value = prop;
			}

			if (typeof (prop = peek(props.selectedIndex)) === "number") {
				(node as HTMLSelectElement).selectedIndex = prop;
			}

			break;
		}
	}
}

function set(node: Node, prop: string, value: any) {
	(node as { [_ in string]: any })[(PROP_MAP as { [_ in string]?: string })[prop] ?? prop] = value;
}
