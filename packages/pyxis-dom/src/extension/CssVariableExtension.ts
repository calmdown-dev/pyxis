import { extension, isAtom, link, type Atom, type ExtensionPropMapping, type MaybeAtom, type Nil } from "@calmdown/pyxis/core";

interface CssVariablePropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TVarName in string]?: MaybeAtom<Nil<string | number>>;
	};
}

type StylableElement = Element & ElementCSSInlineStyle;

/**
 * Extension adding CSS variable access to any Element. Recommended prefix: `"var"`.
 *
 * Any CSS variable can be set using this extension. The "--" prefix is automatically added by this
 * extension, thus extension props should not include it. When given an Atom, the variable will be
 * updated dynamically. Strings are set as-is, while numbers are converted with 3 decimal digit
 * precision. Other types are not allowed. Example usage:
 *
 * ```tsx
 * <div var:max-size="5rem" /> // sets --max-size: 5rem;
 * ```
 */
export const CssVariableExtension = /*@__PURE__*/ extension<Node, CssVariablePropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	const varName = "--" + prop;
	if (isAtom(value)) {
		link(group, value, {
			fn: setBoundCssVariable,
			a0: node,
			a1: varName,
			a2: value,
		});

		value = value.get();
	}

	setCssVariable(node, varName, value);
});

function setBoundCssVariable(node: Node, varName: string, atom: Atom<Nil<string | number>>) {
	setCssVariable(node, varName, atom.get());
}

function setCssVariable(node: Node, varName: string, value: Nil<string | number>) {
	if (value === null || value === undefined || value === "") {
		value = null;
	}
	else if (typeof value === "number") {
		value = value.toFixed(3);
	}

	(node as StylableElement).style.setProperty(varName, value);
}
