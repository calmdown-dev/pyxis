import { bind, extension, isAtom, type ExtensionPropMapping, type MaybeReadAtom } from "@calmdown/pyxis/core";

interface DatasetPropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TDataKey in string]?: MaybeReadAtom<string | undefined>;
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
export const DatasetExtension = extension<Node, DatasetPropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		bind(group, value, () => {
			const tmp = value.get();
			if (tmp === undefined) {
				delete (node as ElementWithDataset).dataset[prop];
			}
			else {
				(node as ElementWithDataset).dataset[prop] = tmp;
			}
		});
	}
	else if (value !== undefined) {
		(node as ElementWithDataset).dataset[prop] = value;
	}
});
