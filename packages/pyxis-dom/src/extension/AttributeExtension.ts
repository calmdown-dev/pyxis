import { bind, extension, isAtom, type ExtensionPropMapping, type MaybeAtom, type Nil } from "@calmdown/pyxis/core";

import { setAttr } from "~/adapter/common";

interface AttributePropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TAttribute in string]?: MaybeAtom<Nil<string | number | boolean>>;
	};
}

/**
 * Sets attributes by their literal names. Recommended prefix: `"attr"`.
 *
 * Strings and numbers use `setAttribute`; booleans toggle an attribute's presence (or use explicit
 * true/false values for SVG/MathML boolean-value attributes). Null or undefined remove the
 * attribute. Use strings for enumerated values such as `contenteditable="false"`. Atoms update the
 * attribute whenever their value changes.
 */
export const AttributeExtension = /*@__PURE__*/ extension<Node, AttributePropMapping>((node, prop, value, group) => {
	if (isAtom(value)) {
		bind(group, value, () => {
			setAttr(node, prop, value.get());
		});
	}
	else {
		setAttr(node, prop, value);
	}
});
