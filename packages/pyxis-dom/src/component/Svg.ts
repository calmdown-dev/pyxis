import { Native, fork, type HNode, type JsxObject, type JsxResult, type MountingGroup } from "@calmdown/pyxis/core";

import { SvgAdapter } from "~/adapter/SvgAdapter";

import type { Mutable } from "./types";

// @ts-expect-error fake overload to allow use with JSX
export function Svg(props: JSX.IntrinsicElements["Svg"]): JsxResult;

export function Svg(
	jsx: JsxObject,
	hParent: HNode<Node>,
	nUsedParent: Node,
	nRealParent: Node,
	nBefore: Node | null,
	isBatch: boolean,
) {
	const group = fork(hParent);
	(group as Mutable<MountingGroup<Node>>).adapter = SvgAdapter;

	Native(jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch);
	group.mounted = true;
}
