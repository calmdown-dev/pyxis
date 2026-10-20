import { bind, extension, isAtom, type ExtensionPropMapping, type MaybeAtom } from "@calmdown/pyxis/core";

interface ClassListPropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TClassName in string]?: MaybeAtom<boolean>;
	};
}

/**
 * Extension adding ClassList access to any Element. Recommended prefix: `"cl"`.
 *
 * CSS classes can be added via boolean props, e.g.:
 *
 * ```tsx
 * <div cl:my-class />
 * ```
 *
 * or dynamically toggled when an `Atom<boolean>` is given as value:
 *
 * ```tsx
 * <div cl:my-class={toggle} />
 * ```
 *
 * This extension can be used in tandem with the `@calmdown/rollup-plugin-pyxis` plugin to
 * automatically rewrite class names when using CSS modules.
 */
export const ClassListExtension = /*@__PURE__*/ extension<Node, ClassListPropMapping>((node, prop, value, group) => {
	// extensions are only applicable to JSX elements which get rendered via DomAdapter::element
	// despite the typings, node is actually guaranteed to be an Element here

	if (isAtom(value)) {
		bind(group, value, () => {
			(node as Element).classList.toggle(prop, value.get());
		});
	}
	else if (value !== undefined) {
		// if somehow the class existed on the node before this setter ran, toggle will remove it
		// in case the prop was set as `cl:xyz={false}`, making it consistent with the dynamic
		// setter above (when an Atom is given)
		(node as Element).classList.toggle(prop, value);
	}
});
