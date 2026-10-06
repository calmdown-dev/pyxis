import { bind, extension, isAtom, type ExtensionPropMapping, type MaybeReadAtom, type Nil } from "@calmdown/pyxis/core";

interface CssVariablePropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TVarName in string]?: MaybeReadAtom<Nil<string | number>>;
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
export const CssVariableExtension = extension<Node, CssVariablePropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		bind(group, value, () => {
			setProp((node as StylableElement).style, prop, value.get());
		});
	}
	else if (value) {
		setProp((node as StylableElement).style, prop, value);
	}
});

function setProp(style: CSSStyleDeclaration, varName: string, value: Nil<string | number>) {
	if (value === null || value === undefined || value === "") {
		value = null;
	}
	else if (typeof value === "number") {
		value = value.toFixed(3);
	}

	style.setProperty("--" + varName, value);
}
