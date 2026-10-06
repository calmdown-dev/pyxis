import { bind, extension, isAtom, type ExtensionPropMapping } from "@calmdown/pyxis/core";

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
export const AriaExtension = extension<Node, AriaPropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		bind(group, value, () => {
			(node as Element)[prop as keyof ARIAProps] = value.get();
		});
	}
	else {
		(node as Element)[prop as keyof ARIAProps] = value;
	}
});
