import { Text } from "~/component/Text";
import { isAtom } from "~/data/Atom";
import { getCurrentContainer, setCurrentContainer, type ContextContainer } from "~/data/Context";
import { notifyMounted, notifyUnmounted, onMounted, withLifecycle, type Lifecycle } from "~/data/Lifecycle";
import { createScheduler } from "~/data/Scheduler";
import type { ElementsType, Mutable, Nil } from "~/support/types";

import type { Adapter, ExtensionsType } from "./Adapter";
import type { JsxResult } from "./Component";

/** @internal */
// @ts-expect-error this is a unique symbol at runtime
export const S_COMPONENT: unique symbol = __DEV__ ? Symbol.for("pyxis:component") : Symbol();

export interface Renderer<TNode, TIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Carries information about the available intrinsic elements when using this Renderer.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly __elements?: TIntrinsicElements;

	mount: (root: TNode, jsx: JsxResult) => void;
	unmount: () => void;
}

export type ElementsOf<TRenderer> = TRenderer extends { readonly __elements?: infer TElements }
	? TElements
	: {};


export interface MountingGroup<TNode> extends Lifecycle, Hierarchy<TNode> {
	/** @internal */
	readonly $isGroup: true;

	/** @internal */
	readonly $isNode?: never;

	/** the Adapter usable with this MountingGroup */
	readonly adapter: Adapter<TNode>;

	/** @internal */
	readonly $extensions: ExtensionsType<TNode>;

	/** @internal */
	readonly $context?: ContextContainer;
}

export interface NativeNode<TNode> extends Hierarchy<TNode> {
	/** @internal */
	readonly $isGroup?: never;

	/** @internal */
	readonly $isNode: true;
}

export interface Hierarchy<TNode> {
	/** @internal */
	readonly $isGroup?: true;

	/** @internal */
	readonly $isNode?: true;

	/**
	 * the ancestor group this node belongs to
	 * @internal
	 */
	readonly $pg?: MountingGroup<TNode>;

	/**
	 * the immediate hierarchy parent node this node belongs to
	 * @internal
	 */
	readonly $ph?: HierarchyNode<TNode>;

	/**
	 * the nearest mounting group (could be self)
	 * @internal
	 */
	readonly $ng: MountingGroup<TNode>;

	/**
	 * the nearest native node (could be self) to which children should be inserted
	 * @internal
	 */
	readonly $nn: TNode;

	/**
	 * the first child within this hierarchy
	 * @internal
	 */
	$hh?: Nil<HierarchyNode<TNode>>;

	/**
	 * the last child within this hierarchy
	 * @internal
	 */
	$ht?: Nil<HierarchyNode<TNode>>;

	/**
	 * the previous sibling within this hierarchy
	 * @internal
	 */
	$hp?: Nil<HierarchyNode<TNode>>;

	/**
	 * the next sibling within this hierarchy
	 * @internal
	 */
	$hn?: Nil<HierarchyNode<TNode>>;

	/**
	 * Cache of the first native node within this hierarchy node.
	 * When undefined, a re-scan is needed.
	 */
	$fn?: TNode | null;
}

export type HierarchyNode<TNode> = NativeNode<TNode> | MountingGroup<TNode>;

/** @internal */
export function createRenderer<TNode, TIntrinsicElements extends ElementsType>(
	adapter: Adapter<TNode>,
	extensions: ExtensionsType<TNode>,
): Renderer<TNode, TIntrinsicElements> {
	const group: Mutable<MountingGroup<TNode> & Renderer<TNode, TIntrinsicElements>> = {
		$isGroup: true,
		mounted: false,
		adapter: adapter,
		$scheduler: createScheduler(adapter.tick),
		$extensions: extensions,
		$ng: null!,
		$nn: null!,
		$fn: null,
		unmount: () => unmount(group),
		mount: (root, jsx) => {
			group.$nn = root;
			mount(group, jsx, null);
		},
	};

	group.$ng = group;
	return group;
}

/**
 * Creates a sub-group of the provided MountingGroup. Needed whenever a subtree may need to mount
 * or unmount dynamically.
 */
export function split<TNode>(
	parent: HierarchyNode<TNode>,
	before: Nil<HierarchyNode<TNode>> = null,
	adapter?: Adapter<TNode>,
): MountingGroup<TNode> {
	const group = parent.$ng;
	const subGroup: Mutable<MountingGroup<TNode>> = {
		$isGroup: true,
		mounted: false,
		adapter: adapter ?? group.adapter,
		$scheduler: group.$scheduler,
		$extensions: group.$extensions,
		$context: getCurrentContainer(),
		$pg: group,
		$ph: parent,
		$ng: null!,
		$nn: parent.$nn,
	};

	subGroup.$ng = subGroup;
	track(subGroup, parent, before);
	return subGroup;
}

/**
 * Adds a MountingGroup to the tracking hierarchy. Necessary to preserve rendering order.
 */
export function track<TNode>(
	node: HierarchyNode<TNode>,
	parent: HierarchyNode<TNode>,
	before: Nil<HierarchyNode<TNode>> = null,
) {
	// insert into hierarchy before given sibling
	if (before?.$ph === parent) {
		if (before.$hp) {
			node.$hp = before.$hp;
			node.$hn = before;
			before.$hp.$hn = node;
			before.$hp = node;
		}
		else {
			node.$hp = null;
			node.$hn = parent.$hh;
			if (parent.$hh === before) {
				// this should always run: since before has no previous sibling, it must be at the
				// head, otherwise the hierarchy is malformed and bad things will happen...
				before.$hp = node;
			}

			parent.$hh = node;
		}
	}
	// append at the tail of the hierarchy
	else {
		if (parent.$ht) {
			parent.$ht.$hn = node;
			node.$hp = parent.$ht;
		}
		else {
			parent.$hh = node;
		}

		parent.$ht = node;
	}

	invalidateByInsertion(node);
}

/**
 * Invalidates the first node cache of the provided node and any of its previous siblings or
 * ancestors sharing the same reference, assuming an insertion operation preceded.
 * @internal
 */
function invalidateByInsertion<TNode>(node: HierarchyNode<TNode>) {
	// find first previous h-node with defined cache
	let current = node.$hp;
	while (current) {
		if (current.$fn !== undefined) {
			if (current.$isGroup) {
				doInvalidate(current, current.$fn);
			}

			return;
		}

		current = current.$hp;
	}

	// recurse upwards if no previous sibling had anything cached and the parent is a group holding
	// a cached ref - otherwise, previous runs have already cleared upwards, so we can bail
	if (
		(current = node.$ph) &&
		current.$isGroup &&
		current.$fn !== undefined
	) {
		doInvalidate(current, current.$fn);
	}
}

/**
 * Invalidates the first node cache of the provided node and any of its previous siblings or
 * ancestors sharing the same reference, assuming a removal operation will follow.
 * @internal
 */
function invalidateByRemoval<TNode>(node: HierarchyNode<TNode>) {
	// bail if:
	// - h-node is a native node, it acts as a boundary and remains valid
	// - no cache exists, nothing to invalidate
	// - next sibling has the same ref, cache remains valid after this removal
	//   if there's no next sibling, searching for one would defeat the purpose of this early-exit
	//   so just run the invalidation in such cases
	const ref = node.$fn;
	if (
		node.$isNode ||
		ref === undefined ||
		node.$hn?.$fn === ref
	) {
		return;
	}

	doInvalidate(node, ref);
}

/**
 * Only used by `invalidateByInsertion` and `invalidateByRemoval`, do not call directly.
 * @see {@link invalidateByInsertion}
 * @see {@link invalidateByRemoval}
 * @internal
 */
function doInvalidate<TNode>(node: HierarchyNode<TNode>, ref: TNode | null) {
	node.$fn = undefined;

	let current = node.$hp;
	while (current) {
		// stop when a boundary is found - also implicitly stops on native nodes, as they will
		// never match a ref coming from this direction
		if (current.$fn !== ref) {
			return;
		}

		current.$fn = undefined;
		current = current.$hp;
	}

	// recurse upwards if there's a group with a matching ref
	if (
		(current = node.$ph) &&
		current.$isGroup &&
		current.$fn === ref
	) {
		doInvalidate(current, ref);
	}
}

/**
 * Removes a MountingGroup from the tracking hierarchy. Necessary to call before a group is
 * disposed of to preserve rendering order.
 */
export function untrack<TNode>(node: MountingGroup<TNode>) {
	invalidateByRemoval(node);

	// remove from hierarchy
	if (node.$hp) {
		node.$hp.$hn = node.$hn;
	}
	else if (node.$ph?.$hh === node) {
		node.$ph.$hh = node.$hn;
	}

	if (node.$hn) {
		node.$hn.$hp = node.$hp;
	}
	else if (node.$ph?.$ht === node) {
		node.$ph.$ht = node.$hp;
	}

	node.$hp = null;
	node.$hn = null;
	node.$fn = undefined;
}

/**
 * Inserts a native node and adds it to the tracking hierarchy. Necessary to preserve render order.
 * Should only be called from within components!
 */
export function insert<TNode>(
	node: TNode,
	jsx: unknown,
	parent: HierarchyNode<TNode>,
	before: Nil<TNode> = null,
) {
	const hNode: NativeNode<TNode> = {
		$isNode: true,
		$pg: parent.$ng,
		$ph: parent,
		$ng: parent.$ng,
		$nn: node,
		$fn: node,
	};

	track(hNode, parent);
	mountJsx(jsx, hNode, null);
	parent.$ng.adapter.insert(node, parent.$nn, before);
}

/**
 * Gets the next native sibling node for the given group to anchor new renders against.
 *
 * Search goes sibling by sibling. Recurses upwards when no anchor is found within a group.
 * Results are cached to optimize future lookups.
 * @internal
 */
function getAnchor<TNode>(group: MountingGroup<TNode>): TNode | null {
	// this function is called when a group is mounting, but no `before` ref was provided
	// nothing is cached in *this* group, since it is likely to render at least one native node,
	// which would invalidate the cache anyway...
	//
	// nodes visited via `doGetAnchor` can and do update their cache as needed

	// begin by checking the next sibling
	let next = group.$hn;
	if (next) {
		return doGetAnchor(next);
	}

	// no next sibling, check the parent: if no parent exists (we're in the topmost node) or if
	// it's a native node -> resolve to null (no anchor needed, append to end)
	next = group.$ph;
	if (!next || next.$isNode) {
		return null;
	}

	// the parent is also a group -> recurse
	return getAnchor(next);
}

/**
 * Only used by `getAnchor`, do not call directly.
 * @see {@link getAnchor}
 * @internal
 */
function doGetAnchor<TNode>(node: HierarchyNode<TNode>): TNode | null {
	let tmp;
	if ((tmp = getFirstNode(node)) !== undefined) {
		return tmp;
	}

	// no native nodes found within this hierarchy node -> check this h-node's next sibling
	let next = node.$hn;
	if (next) {
		return (node.$fn = doGetAnchor(next));
	}

	// no next sibling, check the parent: if no parent exists (we're in the topmost node) or if
	// it's a native node -> resolve to null (no anchor needed, append to end)
	next = node.$ph;
	if (!next || next.$isNode) {
		return (node.$fn = null);
	}

	// the parent is also a group -> recurse
	return (node.$fn = getAnchor(next));
}

/**
 * Only used by `getAnchor`, do not call directly.
 *
 * Scans the hierarchy downwards (depth-first) looking for the first rendered native node.
 * Results are cached to optimize future lookups.
 * @see {@link getAnchor}
 * @internal
 */
function getFirstNode<TNode>(node: HierarchyNode<TNode>): TNode | null | undefined {
	let tmp = node.$fn;
	if (tmp !== undefined) {
		return tmp; // cached result
	}

	// native nodes always have `$fn` cache set, so here `node` is certainly a group
	if ((node as MountingGroup<TNode>).mounted) {
		let current = node.$hh;
		while (current) {
			if ((tmp = getFirstNode(current)) !== undefined) {
				return (node.$fn = tmp);
			}

			current = current.$hn;
		}
	}

	// return undefined; ... implicit
}

/**
 * Mounts a MountingGroup to the specified location in the node tree. If the group is already
 * mounted (i.e. its native nodes are already rendered somewhere), it is moved to the new location
 * without re-mounting Pyxis components.
 *
 * Note that for successfully moving a group within the tree, you should first `untrack` the group,
 * then re-`track` it to the new location and only then call `mount` to commit the move.
 * @see {@link track}
 * @see {@link untrack}
 */
export function mount<TNode>(
	group: MountingGroup<TNode>,
	jsx: any,
	before: Nil<TNode> = getAnchor(group),
) {
	if (group.mounted) {
		reinsertNodes(group, group.$nn, before);
		return;
	}

	setCurrentContainer(group.$context);
	withLifecycle(group, mountJsx, jsx, group, before);
	invalidateByInsertion(group);

	if (group.$pg?.mounted === false) {
		onMounted(group.$pg, {
			$fn: notifyMounted,
			$a0: group,
		});
	}
	else {
		notifyMounted(group);
	}
}

/**
 * Only used by `mount`, do not call directly.
 *
 * Re-inserts native nodes of the given group at a new location in the DOM tree. Only moves the
 * uppermost nodes - any children move with them.
 * @see {@link mount}
 * @internal
 */
function reinsertNodes<TNode>(group: MountingGroup<TNode>, parent: TNode, before: TNode | null) {
	const { adapter } = group;

	let current = group.$hh;
	while (current) {
		if (current.$isGroup) {
			current.mounted && reinsertNodes(current, parent, before);
		}
		else {
			adapter.insert(current.$nn, parent, before);
		}

		current = current.$hn;
	}
}

/**
 * Unmounts the contents of a MountingGroup from the node tree. Although empty, the group itself
 * remains usable and can be remounted later.
 */
export function unmount<TNode>(group: MountingGroup<TNode>) {
	if (!group.mounted) {
		return;
	}

	notifyUnmounted(group);
	invalidateByRemoval(group);

	const { adapter } = group;
	let current = group.$hh;
	let next;

	while (current) {
		unmountSubTree(current);
		if (current.$isNode) {
			adapter.remove(current.$nn);
		}

		next = current.$hn;
		current.$hp = null;
		current.$hn = null;
		current = next;
	}

	group.$hh = null;
	group.$ht = null;
}

/**
 * Unmounts a sub-tree of hierarchy nodes. Unlike `unmount`, does not invalidate first node cache
 * and does not remove native nodes - assumes native parent nodes will be removed, handing the
 * whole sub-tree at once.
 * @internal
 */
function unmountSubTree<TNode>(node: HierarchyNode<TNode>) {
	if (node.$isGroup) {
		notifyUnmounted(node);
		node.$fn = undefined;
	}

	let current = node.$hh;
	let next;
	while (current) {
		unmountSubTree(current);
		next = current.$hn;
		current.$hp = null;
		current.$hn = null;
		current = next;
	}

	node.$hh = null;
	node.$ht = null;
}

/**
 * Mounts components described by the JsxResult to the specified location in the node tree.
 */
export function mountJsx<TNode>(
	jsx: any,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	switch (typeof jsx) {
		case "object":
			if (jsx === null) {
				break;
			}

			if (Array.isArray(jsx)) {
				const { length } = jsx;
				let index = 0;
				for (; index < length; index += 1) {
					mountJsx(jsx[index], parent, before);
				}

				break;
			}

			if (!isAtom(jsx)) {
				jsx[S_COMPONENT]?.(jsx, parent, before);
				break;
			}

			// fall through

		case "string":
		case "number":
		case "boolean":
		case "bigint":
			Text(jsx, parent, before);
			break;
	}
}
