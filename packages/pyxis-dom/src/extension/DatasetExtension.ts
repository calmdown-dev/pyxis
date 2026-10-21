import { extension, isAtom, link, type Atom, type ExtensionPropMapping, type MaybeAtom, type Nil } from "@calmdown/pyxis";

interface DatasetPropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TDataKey in string]?: MaybeAtom<Nil<string>>;
	};
}

// MathMLElement also inherits from HTMLOrSVGElement, despite the naming
type ElementWithDataset = Node & HTMLOrSVGElement;

/**
 * Extension adding dataset access to any element. Recommended prefix: `"data"`.
 *
 * Any dataset value can be set using this extension. Values must always be strings. When given an
 * Atom, the value will be updated dynamically. Example usage:
 *
 * ```tsx
 * <div data:testId="wrapper" />
 * ```
 */
export const DatasetExtension = /*@__PURE__*/ extension<Node, DatasetPropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		link(group, value, {
			fn: setBoundData,
			a0: node,
			a1: prop,
			a2: value,
		});

		value = value.get();
	}

	setData(node, prop, value);
});

function setBoundData(node: Node, prop: string, atom: Atom<Nil<string>>) {
	setData(node, prop, atom.get());
}

function setData(node: Node, prop: string, data: Nil<string>) {
	if (typeof data === "string") {
		(node as ElementWithDataset).dataset[prop] = data;
	}
	else {
		delete (node as ElementWithDataset).dataset[prop];
	}
}
