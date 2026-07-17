import type { TickFn } from "~/data/Scheduler";
import type { ElementsType, Intersection, PropsType } from "~/support/types";

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
	 * Creates a native (intrinsic) element node by its name.
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
	 * be inserted just before the referenced node, otherwise the child is inserted as the new last
	 * child.
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
		node: TNode,
		prop: string,
		value: any,
	) => void;
}

export interface Extension<TNode, TExtensionKey extends string = string, TIntrinsicElements extends ElementsType = ElementsType, TExtendedIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Infers prop types to decorate existing types with extensions.
	 * Type only, this call signature does not exist at runtime!
	 */
	(extensionKey: TExtensionKey, intrinsicElements: TIntrinsicElements): TExtendedIntrinsicElements;

	/**
	 * Sets a named extension property of the given node.
	 */
	readonly set: (
		node: TNode,
		prop: string,
		value: any,
		group: MountingGroup<TNode>,
	) => void;
}

export type ExtensionsType<TNode> = { [_ in string]?: Extension<TNode> };

export type ExtensionProps<TExtensionKey extends string, TProps extends PropsType> = Intersection<{
	[TPropKey in keyof TProps] -?: TPropKey extends string
		? { readonly [_ in `${TExtensionKey}:${TPropKey}`]?: TProps[TPropKey] }
		: never
}[keyof TProps]>;
