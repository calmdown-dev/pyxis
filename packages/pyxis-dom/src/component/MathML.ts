import { Native, S_COMPONENT, S_TAG_NAME, fork, mount, type ComponentHandler, type HNode, type JsxObject, type JsxResult, type MountingGroup } from "@calmdown/pyxis";

import { MathMLAdapter } from "~/adapter/MathMLAdapter";

import type { Mutable } from "./types";

export type MathMLProps = JSX.IntrinsicElements["MathML"];

// @ts-expect-error fake overload to allow use with JSX
export function MathML(props: MathMLProps): JsxResult;

export function MathML(
	jsx: Mutable<JsxObject>,
	hParent: HNode<Node>,
	hBefore: HNode<Node> | null,
	nUsedParent: Node,
	nRealParent: Node,
	isBatch: boolean,
) {
	const hGroup = fork(hParent, hBefore);
	(hGroup as Mutable<MountingGroup<Node>>).adapter = MathMLAdapter;

	try {
		jsx[S_COMPONENT] = Native;
		jsx[S_TAG_NAME] = "math";
		mount(jsx, hGroup, hBefore, nUsedParent, nRealParent, isBatch);
	}
	finally {
		jsx[S_COMPONENT] = MathML as ComponentHandler;
	}
}
