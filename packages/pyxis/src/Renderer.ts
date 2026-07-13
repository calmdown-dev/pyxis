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
	 * When null, a re-scan is needed.
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
 * Creates a sub-group of the provided MountingGroup. Needed whenever a subtree may need to mount or
 * unmount dynamically.
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
				// this should always run: since before has no previous sibling,
				// it must be at the head, otherwise the hierarchy is malformed
				// and bad things will happen...
				before.$hp = node;
			}

			parent.$hh = node;
		}

		invalidateFirstNodeCache(node, false);
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

}

/**
 * Invalidates the first node cache of the provided node and any of its previous siblings and
 * parents sharing the same reference.
 * @internal
 */
function invalidateFirstNodeCache<TNode>(node: HierarchyNode<TNode>, isRemoval: boolean) {

	// bail when:
	// - no ref is cached
	// - node will be removed and the same ref is used by the *next* sibling - cache remains valid after removal

	const ref = node.$fn;
	if (
		ref === undefined ||
		(isRemoval && (node.$hn ?? node.$ph?.$hn)?.$fn === ref)
	) {
		return;
	}

	doInvalidateFirstNodeCache(node, ref);
}

/**
 * Used by `invalidateFirstNodeCache`, do not call directly.
 * @see {@link invalidateFirstNodeCache}
 * @internal
 */
function doInvalidateFirstNodeCache<TNode>(node: HierarchyNode<TNode>, ref: TNode | null) {
	node.$fn = undefined;

	let current = node.$hp;
	while (current) {
		if (current.$fn !== ref) {
			return;
		}

		current.$fn = undefined;
		current = current.$hp;
	}

	if (node.$ph) {
		doInvalidateFirstNodeCache(node.$ph, ref);
	}
}

/**
 * Removes a MountingGroup from the tracking hierarchy. Necessary to call before a group is disposed
 * of to preserve rendering order.
 */
export function untrack<TNode>(node: MountingGroup<TNode>) {
	invalidateFirstNodeCache(node, true);

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

	// no first node cache invalidation here, since this function should only be called within
	// components -> those get mounted via `mount` which takes care of the cache
}

/**
 * Gets the next native sibling node for the given group to anchor new renders against.
 *
 * Search goes sibling by sibling. Recurses upwards when no anchor is found within a group.
 * Results are cached to optimize future lookups.
 * @internal
 */
function getAnchor<TNode>(node: HierarchyNode<TNode>): TNode | null {
	// we don't check or update cache here, since `getFirstNode` does that already
	let tmp;
	if (tmp = getFirstNode(node)) {
		return tmp;
	}

	// no native nodes found within this hierarchy node
	// 1. advance to this h-node's sibling, if it has one
	// 2. or advance to this h-node's parent's sibling, if it has one

	// we don't search the parent itself, since at this point, we must've already done so!

	const next = node.$hn ?? node.$ph?.$hn;
	return (
		node.$fn = next ? getAnchor(next) : null
	);
}

/**
 * Scans the hierarchy downwards (depth-first) looking for the first rendered native node.
 * Results are cached to optimize future lookups.
 * @internal
 */
function getFirstNode<TNode>(node: HierarchyNode<TNode>): TNode | null {
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

	return (node.$fn = null);
}

/**
 * Mounts a MountingGroup to the specified location in the node tree. If the
 * group is already mounted, it is moved to the new location without re-mounting
 * its components.
 */
export function mount<TNode>(
	group: MountingGroup<TNode>,
	jsx: any,
	before?: Nil<TNode>,
) {
	if (group.mounted) {
		return;
	}

	if (!before) {
		const next = group.$hn ?? group.$ph?.$hn;
		before = next ? getAnchor(next) : null;
	}

	// new render
	setCurrentContainer(group.$context);
	withLifecycle(group, mountJsx, jsx, group, before);
	invalidateFirstNodeCache(group, false);

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
 * Unmounts the contents of a MountingGroup from the node tree. Although empty, the group itself
 * remains usable and can be remounted later.
 */
export function unmount<TNode>(group: MountingGroup<TNode>) {
	if (!group.mounted) {
		return;
	}

	notifyUnmounted(group);
	invalidateFirstNodeCache(group, true);

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
 * and does not remove native nodes - assumes native parent nodes will be removed, handing the whole
 * sub-tree at once.
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
