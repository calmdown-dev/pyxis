import { extension, isAtom, link, type Atom, type ExtensionPropMapping, type MaybeAtom, type Nil } from "@calmdown/pyxis";

interface ClassListPropMapping extends ExtensionPropMapping<Node> {
	extension: {
		[TClassName in string]?: MaybeAtom<Nil<boolean>>;
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
		link(group, value, {
			fn: setBoundClass,
			a0: node,
			a1: prop,
			a2: value,
		});

		value = value.get();
	}

	(node as Element).classList.toggle(prop, value ?? false);
});

function setBoundClass(node: Node, prop: string, atom: Atom<Nil<boolean>>) {
	(node as Element).classList.toggle(prop, atom.get() ?? false);
}
