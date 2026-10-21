import { Native, S_COMPONENT, S_TAG_NAME, fork, mount, type ComponentHandler, type HNode, type JsxObject, type JsxResult, type MountingGroup } from "@calmdown/pyxis/core";

import { SvgAdapter } from "~/adapter/SvgAdapter";

import type { Mutable } from "./types";

export type SvgProps = JSX.IntrinsicElements["Svg"];

// @ts-expect-error fake overload to allow use with JSX
export function Svg(props: SvgProps): JsxResult;

export function Svg(
	jsx: Mutable<JsxObject>,
	hParent: HNode<Node>,
	hBefore: HNode<Node> | null,
	nUsedParent: Node,
	nRealParent: Node,
	isBatch: boolean,
) {
	const hGroup = fork(hParent, hBefore);
	(hGroup as Mutable<MountingGroup<Node>>).adapter = SvgAdapter;

	try {
		jsx[S_COMPONENT] = Native;
		jsx[S_TAG_NAME] = "svg";
		mount(jsx, hGroup, hBefore, nUsedParent, nRealParent, isBatch);
	}
	finally {
		jsx[S_COMPONENT] = Svg as ComponentHandler;
	}
}
