import { isAtom } from "~/data/Atom";
import type { JsxObject } from "~/Component";
import { insert, type HNode } from "~/Renderer";
import { bind } from "~/data/Dependency";

const RE_EXT = /^([^:]+?):(.+)$/;

/** @internal */
// @ts-expect-error this is a unique symbol at runtime
export const S_TAG_NAME: unique symbol = __DEV__ ? Symbol.for("pyxis:tagName") : Symbol();

export function Native<TNode>(
	jsx: JsxObject,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	_nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	const hGroup = hParent.$ng;
	const { adapter, $extensions } = hGroup;
	const nNode = adapter.element(jsx[S_TAG_NAME]!);

	let name;
	let match;
	let value;

	// for..in doesn't iterate symbol keys, so we don't need to manually exclude
	// internal symbols (S_COMPONENT, S_TAG_NAME, S_DEV_INFO), just children
	for (name in jsx) {
		match = RE_EXT.exec(name);
		value = jsx[name];
		if (match) {
			$extensions[match[1]]?.set(nNode, match[2], value, hGroup);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				const prop = name;
				const atom = value;
				bind(hGroup, atom, () => {
					adapter.set(nNode, prop, atom.$get());
				});
			}
			else {
				adapter.set(nNode, name, value);
			}
		}
	}

	insert(nNode, jsx.children, hParent, nUsedParent, nBefore, isBatch);
}
