import type { Nil } from "~/support/types";
import type { JsxObject, JsxProps, JsxResult } from "~/Component";
import { mountJsx, type HNode } from "~/Renderer";

// FUTURE: currently TypeScript has a bug causing it to skip checking fragment props in "react-jsx" mode
//         allowing users to supply fragment with invalid children
//         https://github.com/microsoft/TypeScript/issues/62358

export interface FragmentProps {
	children?: Nil<JsxResult>[];
}

/**
 * The built-in Fragment Component wrapping multiple Components.
 */
// @ts-expect-error fake overload to enable use with JSX
export function Fragment(props: JsxProps<FragmentProps>): JsxResult;

export function Fragment<TNode>(
	jsx: JsxObject,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	mountJsx(jsx.children, hParent, nUsedParent, nRealParent, nBefore, isBatch);
}
