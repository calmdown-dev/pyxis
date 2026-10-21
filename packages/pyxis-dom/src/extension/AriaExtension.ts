import { extension, isAtom, link, type Atom, type ExtensionPropMapping } from "@calmdown/pyxis";

import type { ARIAProps } from "~/jsx/baked";

interface AriaPropMapping extends ExtensionPropMapping<Node> {
	extension: ARIAProps;
}

/**
 * Extension adding ARIA attributes to any Element. Recommended prefix: `"aria"`.
 *
 * Example usage:
 *
 * ```tsx
 * <div aria:role="button" />
 * ```
 */
export const AriaExtension = /*@__PURE__*/ extension<Node, AriaPropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		link(group, value, {
			fn: setBoundAria,
			a0: node,
			a1: prop,
			a2: value,
		});

		value = value.get();
	}

	(node as Element)[prop as keyof ARIAProps] = value ?? null;
});

function setBoundAria(node: Node, prop: string, atom: Atom<any>) {
	(node as Element)[prop as keyof ARIAProps] = atom.get() ?? null;
}
