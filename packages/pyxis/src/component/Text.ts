import { isAtom, read } from "~/data/Atom";
import { effect } from "~/data/Effect";
import type { JsxText } from "~/Component";
import { insert, type HierarchyNode } from "~/Renderer";

export function Text<TNode>(
	jsx: NonNullable<JsxText>,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const { adapter } = parent.$ng;
	let node: TNode;

	if (isAtom(jsx)) {
		node = adapter.text("", null);
		effect(() => {
			adapter.text(read(jsx)?.toString() ?? "", node);
		}, parent.$ng);
	}
	else {
		node = adapter.text(jsx.toString(), null);
	}

	insert(node, null, parent, before);
}
