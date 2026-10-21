import { extension, isAtom, link, type Atom, type ExtensionPropMapping } from "@calmdown/pyxis/core";

import type { CSSStyleDeclarationProps } from "~/jsx/baked";

interface CssStylePropMapping extends ExtensionPropMapping<Node> {
	extension: CSSStyleDeclarationProps;
}

type StylableElement = Element & ElementCSSInlineStyle;

/**
 * Extension adding direct CSS rule access to any Element. Recommended prefix: `"css"`.
 *
 * Any CSS rules accessible from JavaScript can be set using this extension. When given an Atom, the
 * rule will be updated dynamically. Example usage:
 *
 * ```tsx
 * <p css:color="blue">I'm blue, da ba dee...</p>
 * ```
 */
export const CssStyleExtension = /*@__PURE__*/ extension<Node, CssStylePropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		link(group, value, {
			fn: setBoundCssRule,
			a0: node,
			a1: prop,
			a2: value,
		});

		value = value.get();
	}

	(node as StylableElement).style[prop as keyof CSSStyleDeclarationProps] = value ?? "";
});

function setBoundCssRule(node: Node, prop: string, atom: Atom<any>) {
	(node as StylableElement).style[prop as keyof CSSStyleDeclarationProps] = atom.get() ?? "";
}
