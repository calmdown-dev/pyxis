import type { Adapter } from "@calmdown/pyxis/core";

import type { IntrinsicElements } from "~/jsx/baked";

import { insert, remove, text, setAttr } from "./common";

export const SvgAdapter: Adapter<Node, IntrinsicElements> = {
	native,
	text,
	insert,
	remove,
	set: setAttr,
	tick: queueMicrotask,
};

const NS = "http://www.w3.org/2000/svg";

function native(tagName: string | undefined) {
	// undefined only comes from the <Svg> component
	return document.createElementNS(NS, tagName ?? "svg");
}
