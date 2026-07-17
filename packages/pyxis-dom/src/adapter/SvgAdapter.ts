import type { Adapter } from "@calmdown/pyxis/core";

import type { IntrinsicElements } from "~/jsx/baked";

import { batch, insert, marker, remove, text, setAttr } from "./common";

export const SvgAdapter: Adapter<Node, IntrinsicElements> = {
	element,
	text,
	marker,
	batch,
	insert,
	remove,
	set: setAttr,
	tick: queueMicrotask,
};

const NS = "http://www.w3.org/2000/svg";

function element(tagName: string | undefined) {
	// undefined only comes from the <Svg> component
	return document.createElementNS(NS, tagName ?? "svg");
}
