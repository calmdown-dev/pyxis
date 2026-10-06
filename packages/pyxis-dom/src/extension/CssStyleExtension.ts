import { bind, extension, isAtom, type ExtensionPropMapping } from "@calmdown/pyxis/core";

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
 * <div css:background="red" />
 * ```
 */
export const CssStyleExtension = extension<Node, CssStylePropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		bind(group, value, () => {
			(node as StylableElement).style[prop as keyof CSSStyleDeclarationProps] = value.get();
		});
	}
	else if (value) {
		(node as StylableElement).style[prop as keyof CSSStyleDeclarationProps] = value;
	}
});
