import { extension, isAtom, link, type Atom, type ExtensionPropMapping, type MaybeAtom, type Nil } from "@calmdown/pyxis";

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
		link(group, value, {
			// setBoundAttribute, node, prop, value
			fn: setBoundAttribute,
			a0: node,
			a1: prop,
			a2: value,
		});

		value = value.get();
	}

	setAttr(node, prop, value);
});

function setBoundAttribute(node: Node, prop: string, atom: Atom<Nil<string | number | boolean>>) {
	setAttr(node, prop, atom.get());
}
