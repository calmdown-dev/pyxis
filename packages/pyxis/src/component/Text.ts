import { isAtom } from "~/data/Atom";
import { bind } from "~/data/Dependency";
import type { JsxText } from "~/Component";
import { insert, type HNode } from "~/Renderer";

export function Text<TNode>(
	jsx: NonNullable<JsxText>,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	_nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	const { adapter } = hParent.$ng;
	let node: TNode | null = null;

	if (isAtom(jsx)) {
		bind(hParent.$ng, jsx, () => {
			node = adapter.text(jsx.$get()?.toString() ?? "", node);
		});
	}
	else {
		// static nil values are already filtered out by Renderer, never passed to this component
		node = adapter.text(jsx.toString(), null);
	}

	insert(node!, null, hParent, nUsedParent, nBefore, isBatch);
}
