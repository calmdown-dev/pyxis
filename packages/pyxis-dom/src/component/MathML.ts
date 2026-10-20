import { Native, S_COMPONENT, S_TAG_NAME, fork, mount, type ComponentHandler, type HNode, type JsxObject, type JsxResult, type MountingGroup } from "@calmdown/pyxis/core";

import { MathMLAdapter } from "~/adapter/MathMLAdapter";

import type { Mutable } from "./types";

export type MathMLProps = JSX.IntrinsicElements["MathML"];

// @ts-expect-error fake overload to allow use with JSX
export function MathML(props: MathMLProps): JsxResult;

export function MathML(
	jsx: Mutable<JsxObject>,
	hParent: HNode<Node>,
	nUsedParent: Node,
	nRealParent: Node,
	nBefore: Node | null,
	isBatch: boolean,
) {
	const group = fork(hParent);
	(group as Mutable<MountingGroup<Node>>).adapter = MathMLAdapter;

	try {
		jsx[S_COMPONENT] = Native;
		jsx[S_TAG_NAME] = "math";
		mount(jsx, group, nUsedParent, nRealParent, nBefore, isBatch);
	}
	finally {
		jsx[S_COMPONENT] = MathML as ComponentHandler;
	}
}
