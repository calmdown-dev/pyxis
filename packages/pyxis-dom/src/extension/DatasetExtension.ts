import { bind, isAtom, type ElementsType, type ExtensionProps, type MaybeReadonlyAtom, type MountingGroup, type NodeType } from "@calmdown/pyxis/core";

export interface DatasetExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			NodeType<TElements[TElementName]> extends HTMLOrSVGElement
				? TElements[TElementName] & ExtensionProps<TExtensionKey, { readonly [TKey in string]?: MaybeReadonlyAtom<string | undefined> }>
				: TElements[TElementName]
		);
	};

	set: (node: HTMLOrSVGElement, key: string, value: MaybeReadonlyAtom<string | undefined>, group: MountingGroup<Node>) => void;
}

/**
 * Extension adding dataset access to any HTML or SVG element. Recommended
 * prefix: `"data"`
 *
 * Any arbitrary dataset value can be set using this extension. Values must
 * always be strings. When given an Atom for the value, it will be dynamically
 * updated.
 *
 * Example usage:
 * ```tsx
 * <div data:testId="test-wrapper" />
 * ```
 */
export const DatasetExtension = {
	set: (node, key, value, group) => {
		if (isAtom(value)) {
			bind(group, value, () => {
				const tmp = value.get();
				if (tmp === undefined) {
					delete node.dataset[key];
				}
				else {
					node.dataset[key] = tmp;
				}
			});
		}
		else if (value !== undefined) {
			node.dataset[key] = value;
		}
	},
} as DatasetExtensionType;
