export interface Adapter<TNode> extends Extension<TNode> {
	/**
	 * Creates a dummy node occupying a place within the document hierarchy, but is not visually
	 * presented to the user in any way. E.g. a comment node.
	 */
	readonly createAnchorNode: () => TNode;

	/**
	 * Creates a native element node by its tag name.
	 */
	readonly createNativeNode: (
		tagName: string,
	) => TNode;

	/**
	 * Inserts a node into the hierarchy. When `before` is given, the node is inserted before it,
	 * otherwise it is inserted as the last child of the parent.
	 */
	readonly insertNode: (
		parent: TNode,
		node: TNode,
		before: TNode | null,
	) => void;

	/**
	 * Removes a node from the hierarchy.
	 */
	readonly removeNode: (
		parent: TNode,
		node: TNode,
	) => void;
}

export interface Extension<TNode, TProps extends { [_ in string]?: any } = { [_ in string]?: any }> {
	// readonly init?: () => void;

	/**
	 * Sets a named property of the given node.
	 */
	readonly setProp: <TProp extends keyof TProps>(
		node: TNode,
		prop: TProp,
		value: TProps[TProp],
	) => void;
}
