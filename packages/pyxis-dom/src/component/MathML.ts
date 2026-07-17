import { Native, fork, type HNode, type JsxObject, type JsxResult, type MountingGroup } from "@calmdown/pyxis/core";

import { MathMLAdapter } from "~/adapter/MathMLAdapter";

import type { Mutable } from "./types";

// @ts-expect-error fake overload to allow use with JSX
export function MathML(props: JSX.IntrinsicElements["MathML"]): JsxResult;

export function MathML(
	jsx: JsxObject,
	hParent: HNode<Node>,
	nUsedParent: Node,
	nRealParent: Node,
	nBefore: Node | null,
	isBatch: boolean,
) {
	const group = fork(hParent);
	(group as Mutable<MountingGroup<Node>>).adapter = MathMLAdapter;

	Native(jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch);
	group.mounted = true;
}
