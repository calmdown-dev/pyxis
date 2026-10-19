import { peek, type Adapter, type JsxObject } from "@calmdown/pyxis/core";

import type { IntrinsicElements } from "~/jsx/baked";
import { PROP_MAP } from "~/jsx/mapping";

import { batch, insert, marker, remove, setAttr, text } from "./common";

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

const isString = (value: unknown) => typeof value === "string";
const isNumber = (value: unknown) => typeof value === "number";
const REAPPLIED_PROPS: { readonly [E in string]?: any[] } = {
	INPUT: [
		"value", isString,
		"defaultValue", isString,
	],
	TEXTAREA: [
		"value", isString,
		"defaultValue", isString,
	],
	SELECT: [
		"value", isString,
		"selectedIndex", isNumber,
	],
};

function finalize(node: Node, props: JsxObject) {
	const pairs = REAPPLIED_PROPS[(node as Element).tagName];
	if (pairs) {
		const { length } = pairs;
		let index = 0;
		let prop;
		let value;

		do {
			prop = pairs[index++];
			value = peek(props[prop]);
			if (pairs[index++](value)) {
				(node as { [P in string]: any })[prop] = value;
			}
		}
		while (index < length);
	}
}

const ATTRIBUTE_PROPS: { readonly [P in string]?: string } = {
	commandFor: "commandfor",
	popoverTarget: "popovertarget",
};

function set(node: Node, prop: string, value: any) {
	let name;
	if ((name = ATTRIBUTE_PROPS[prop])) {
		setAttr(node, name, value);
	}
	else {
		name = (PROP_MAP as { readonly [P in string]?: string })[prop] || prop;
		(node as { [P in string]: any })[name] = value;
	}
}
