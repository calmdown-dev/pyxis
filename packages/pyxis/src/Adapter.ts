import type { TickFn } from "~/data/Scheduler";
import type { ElementsType, S_ELEM_NAME, S_NODE_TYPE } from "~/support/types";

import type { MountingGroup } from "./Renderer";

export interface Adapter<TNode, TIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Carries information about the available intrinsic elements when using this Adapter.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $elements?: TIntrinsicElements;

	/**
	 * A function able to schedule a callback to be executed at a later time, e.g. `queueMicrotask`.
	 * The function must guarantee that the callback will be eventually executed.
	 */
	readonly tick: TickFn;

	/**
	 * Creates a native (intrinsic) element node by the element name.
	 */
	readonly element: (
		name: string,
	) => TNode;

	/**
	 * Creates or updates a text node. In both cases the node is returned.
	 */
	readonly text: (
		value: string,
		node: TNode | null,
	) => TNode;

	/**
	 * Creates a marker node used to preserve a position within the node tree.
	 */
	readonly marker: (
		comment?: string,
	) => TNode;

	/**
	 * Creates a batch to which nodes can be inserted "offline," without causing any updates. The
	 * batch is later inserted all at once using the `insert` function, causing only a single
	 * update.
	 *
	 * Adapters may omit this function when batching is not supported.
	 */
	readonly batch?: () => TNode;

	/**
	 * Inserts the given `node` as a child of the `parent`. If `before` is provided, the child will
	 * be inserted just before the referenced node (which itself must be a child of the parent),
	 * otherwise the child is inserted at the end, becoming the new last child of the parent.
	 */
	readonly insert: (
		node: TNode,
		parent: TNode,
		before: TNode | null,
	) => void;

	/**
	 * Removes a node from the hierarchy.
	 */
	readonly remove: (
		node: TNode,
	) => void;

	/**
	 * Sets a named property of the given node.
	 */
	readonly set: (
		elem: TNode,
		prop: string,
		value: any,
	) => void;
}

export type ExtensionsType<TNode> = { [_ in string]?: Extension<TNode> };

export interface Extension<TNode, TPropMapping extends ExtensionPropMapping<TNode> = ExtensionPropMapping<TNode>> {
	/**
	 * Carries information about the props this extension adds to native elements.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $mapping?: TPropMapping;

	/**
	 * Sets a named extension property of the given element. The prop name arrives unprefixed, i.e.
	 * without any extension key prefix.
	 */
	readonly set: (
		node: TNode,
		prop: string,
		value: any,
		group: MountingGroup<TNode>,
	) => void;
}

export interface ExtensionPropMapping<TNode> {
	/** Will contain a concrete type of the element for which props are being mapped. */
	node: TNode;

	/** Will contain a name of the element for which props are being mapped. */
	name: string;

	/**
	 * Override this field with an inferred object containing typed extension props. Prop names
	 * should be plain, do not include their extension prefix. It will be added automatically.
	 *
	 * To infer concrete types, you may use:
	 *
	 * - `this["node"]` ... concrete type of the element node
	 * - `this["name"]` ... the name of the element, as used in JSX
	 */
	extension: {};
}

export function extension<TNode, TPropMapping extends ExtensionPropMapping<TNode>>(
	propSetter: Extension<TNode>["set"],
): Extension<TNode, TPropMapping> {
	return { set: propSetter };
}

/**
 * Builds a set of extension props using an Extension reference rather than relying on a globally
 * registered prefixed extension props. The resulting object is intended to be ...spread directly
 * onto JSX elements.
 *
 * Typically used in libraries where relying on a specific prefix convention would limit the users.
 */
export function ext<TMapping extends ExtensionPropMapping<any>, TNodeType, TElemName>(
	extension: { readonly $mapping?: TMapping },
	props: (TMapping & { node: TNodeType; name: TElemName; })["extension"],
): {
	readonly [S_NODE_TYPE]?: TNodeType;
	readonly [S_ELEM_NAME]?: TElemName;
} {
	return null!; // TODO
}
