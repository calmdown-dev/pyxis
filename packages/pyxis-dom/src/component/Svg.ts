import { Native, S_COMPONENT, S_TAG_NAME, fork, mount, type HNode, type JsxObject, type JsxResult, type MountingGroup } from "@calmdown/pyxis/core";

import { SvgAdapter } from "~/adapter/SvgAdapter";

import type { Mutable } from "./types";

// @ts-expect-error fake overload to allow use with JSX
export function Svg(props: JSX.IntrinsicElements["Svg"]): JsxResult;

export function Svg(
	jsx: Mutable<JsxObject>,
	hParent: HNode<Node>,
	nUsedParent: Node,
	nRealParent: Node,
	nBefore: Node | null,
	isBatch: boolean,
) {
	const group = fork(hParent);
	(group as Mutable<MountingGroup<Node>>).adapter = SvgAdapter;

	try {
		jsx[S_COMPONENT] = Native;
		jsx[S_TAG_NAME] = "svg";
		mount(jsx, group, nUsedParent, nRealParent, nBefore, isBatch);
	}
	finally {
		jsx[S_COMPONENT] = Svg;
	}
}
