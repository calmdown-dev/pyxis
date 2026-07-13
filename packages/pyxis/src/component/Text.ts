import { isAtom } from "~/data/Atom";
import { bind } from "~/data/Dependency";
import type { JsxText } from "~/Component";
import { insert, type HierarchyNode } from "~/Renderer";

export function Text<TNode>(
	jsx: NonNullable<JsxText>,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const { adapter } = parent.$ng;
	let node: TNode | null = null;

	if (isAtom(jsx)) {
		bind(parent.$ng, jsx, () => {
			node = adapter.text(jsx.$get()?.toString() ?? "", node);
		});
	}
	else {
		// static nil values are already filtered out by Renderer, never passed to this component
		node = adapter.text(jsx.toString(), null);
	}

	insert(node!, null, parent, before);
}
