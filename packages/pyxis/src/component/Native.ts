import { isAtom, type Atom } from "~/data/Atom";
import { link, type Dependency } from "~/data/Dependency";
import type { Adapter } from "~/Adapter";
import type { JsxObject } from "~/Component";
import { insert, type HNode } from "~/Renderer";
import { runtime } from "~/Runtime";
import { S_TAG_NAME } from "~/symbols";

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
	let index;
	let value;
	let target;

	// for..in doesn't iterate symbol keys, so we don't need to manually exclude internal symbols
	// (S_COMPONENT, S_TAG_NAME, S_DEV_INFO), just the children prop
	//
	// also, since props from transpiled JSX are always plain objects, we shouldn't need to run
	// checks to exclude inherited fields
	for (name in jsx) {
		index = name.indexOf(":");
		value = jsx[name];

		if (index === 0) {
			// reserved ':' prefix for extension props set by reference via the `ext` utility
			if ((target = runtime.x[name])) {
				target.$ext.set(nNode, target.$prop, value, hGroup);
			}
			else if (__DEV__) {
				throw new Error(`invalid reserved prop "${name}"`);
			}
		}
		else if (index > 0) {
			// regular prefixed extension props
			$extensions[name.slice(0, index)]?.set(nNode, name.slice(index + 1), value, hGroup);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				link(hGroup, value, {
					fn: setBoundProp,
					a0: adapter,
					a1: nNode,
					a2: name,
				});

				value = value.get();
			}

			adapter.set(nNode, name, value);
		}
	}

	insert(nNode, jsx.children, hParent, nUsedParent, nBefore, isBatch);
	return nNode;
}

function setBoundProp<TNode>(
	this: Dependency,
	adapter: Adapter<TNode>,
	node: TNode,
	prop: string,
) {
	adapter.set(node, prop, (this.$target as Atom).get());
}
