import { Text } from "~/component/Text";
import { isAtom } from "~/data/Atom";
import { getContextContainer, setContextContainer, type ContextContainer } from "~/data/Context";
import { setLifecycle, type Lifecycle } from "~/data/Lifecycle";
import { createScheduler } from "~/data/Scheduler";
import type { ElementsType, Mutable, Nil } from "~/support/types";

import type { Adapter, ExtensionsType } from "./Adapter";
import type { ComponentHandler, JsxResult } from "./Component";
import { invoke } from "./support/common";
import { unlinkAll } from "./data/Dependency";

/** @internal */
// @ts-expect-error this is a unique symbol at runtime
export const S_COMPONENT: unique symbol = __DEV__ ? Symbol.for("pyxis:component") : Symbol();

export interface Renderer<TNode, TIntrinsicElements extends ElementsType = ElementsType> {
	/**
	 * Carries information about the available intrinsic elements when using this Renderer.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $elements?: TIntrinsicElements;

	mount: (root: TNode, jsx: JsxResult) => void;
	unmount: () => void;
}

export type ElementsOf<TRenderer> = TRenderer extends { readonly $elements?: infer TElements }
	? TElements
	: {};


export interface MountingGroup<TNode> extends Lifecycle, Hierarchy<TNode> {
	readonly $isGroup: true;
	readonly $isNative?: never;

	/** the Adapter rendering this MountingGroup */
	readonly adapter: Adapter<TNode>;

	/** @internal */
	readonly $extensions: ExtensionsType<TNode>;

	/** @internal */
	readonly $context?: ContextContainer;
}

export interface NativeNode<TNode> extends Hierarchy<TNode> {
	readonly $isNative: true;
	readonly $isGroup?: never;
	readonly $nn: TNode;
}

export interface Hierarchy<TNode> {
	/** @internal */
	readonly $isGroup?: true;

	/** @internal */
	readonly $isNative?: true;

	/**
	 * the nearest mounting group - can be self
	 * @internal
	 */
	readonly $ng: MountingGroup<TNode>;

	/**
	 * the nearest *ancestor* group this node belongs to
	 * @internal
	 */
	readonly $pg: MountingGroup<TNode> | null;

	/**
	 * the nearest native node (ancestor or self) - on groups, this is only present in dev mode
	 * @internal
	 */
	readonly $nn?: TNode;

	/**
	 * the first child of this h-node
	 * @internal
	 */
	$hh?: Nil<HNode<TNode>>;

	/**
	 * the last child of this h-node
	 * @internal
	 */
	$ht?: Nil<HNode<TNode>>;

	/**
	 * the previous sibling of this h-node
	 * @internal
	 */
	$hp?: Nil<HNode<TNode>>;

	/**
	 * the next sibling of this h-node
	 * @internal
	 */
	$hn?: Nil<HNode<TNode>>;
}

export type HNode<TNode> =
	| MountingGroup<TNode>
	| NativeNode<TNode>;


/** @internal */
export function createRenderer<TNode, TIntrinsicElements extends ElementsType>(
	adapter: Adapter<TNode>,
	extensions: ExtensionsType<TNode>,
): Renderer<TNode, TIntrinsicElements> {
	const hGroup: Mutable<MountingGroup<TNode> & Renderer<TNode, TIntrinsicElements>> = {
		adapter: adapter,
		mounted: false,
		$isGroup: true,
		$scheduler: createScheduler(adapter.tick),
		$extensions: extensions,
		$life: 1,
		$pg: null,
		$ng: null!,
		unmount: () => unmount(hGroup),
		mount: (nRoot, jsx) => {
			if (__DEV__) {
				hGroup.$nn = nRoot;
			}

			const isBatch = Boolean(adapter.batch);
			const nParent = isBatch ? adapter.batch!() : nRoot;
			mount(jsx, hGroup, nParent, nRoot, null, isBatch);
			if (isBatch) {
				adapter.insert(nParent, nRoot, null);
			}
		},
	};

	hGroup.$ng = hGroup;
	if (__DEV__) {
		globalThis.__PYXIS_ROOT__ ??= hGroup;
	}

	return hGroup;
}

/**
 * Creates a sub-group within the provided MountingGroup. Needed whenever a subtree needs to mount
 * or unmount dynamically.
 */
export function fork<TNode>(
	hParent: HNode<TNode>,
	hBefore: HNode<TNode> | null = null,
): MountingGroup<TNode> {
	const ng = hParent.$ng;
	const hGroup: Mutable<MountingGroup<TNode>> = {
		adapter: ng.adapter,
		mounted: false,
		$isGroup: true,
		$scheduler: ng.$scheduler,
		$extensions: ng.$extensions,
		$life: 1,
		$context: getContextContainer(),
		$pg: ng,
		$ng: null!,
	};

	hGroup.$ng = hGroup;
	if (__DEV__) {
		hGroup.$nn = hParent.$nn;
	}

	track(hGroup, hParent, hBefore);
	return hGroup;
}

/**
 * Adds a HNode to the hierarchy.
 */
export function track<TNode>(
	hNode: HNode<TNode>,
	hParent: HNode<TNode>,
	hBefore: HNode<TNode> | null = null,
) {
	// insert into hierarchy before given sibling
	if (hBefore?.$pg === hParent) {
		if (hBefore.$hp) {
			hNode.$hp = hBefore.$hp;
			hNode.$hn = hBefore;
			hBefore.$hp.$hn = hNode;
			hBefore.$hp = hNode;
		}
		else {
			hNode.$hp = null;
			hNode.$hn = hParent.$hh;
			if (hParent.$hh === hBefore) {
				// this should always run: since before has no previous sibling, it must be at the
				// head, otherwise the hierarchy is malformed and bad things will happen...
				hBefore.$hp = hNode;
			}

			hParent.$hh = hNode;
		}
	}
	// append at the tail of the hierarchy
	else {
		if (hParent.$ht) {
			hParent.$ht.$hn = hNode;
			hNode.$hp = hParent.$ht;
		}
		else {
			hParent.$hh = hNode;
		}

		hParent.$ht = hNode;
	}
}

/**
 * Removes a HNode from the tracking hierarchy.
 */
export function untrack<TNode>(hNode: HNode<TNode>) {
	if (hNode.$hp) {
		hNode.$hp.$hn = hNode.$hn;
	}
	else if (hNode.$pg?.$hh === hNode) {
		hNode.$pg.$hh = hNode.$hn;
	}

	if (hNode.$hn) {
		hNode.$hn.$hp = hNode.$hp;
	}
	else if (hNode.$pg?.$ht === hNode) {
		hNode.$pg.$ht = hNode.$hp;
	}

	hNode.$hp = null;
	hNode.$hn = null;
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
	jsx: any,
	hGroup: MountingGroup<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	if (hGroup.mounted) {
		reinsertNodes(hGroup, nUsedParent, nBefore);
		return;
	}

	const previousLifecycle = setLifecycle(hGroup);
	setContextContainer(hGroup.$context);
	try {
		mountJsx(jsx, hGroup, nUsedParent, nRealParent, nBefore, isBatch);
	}
	finally {
		setLifecycle(previousLifecycle);
		hGroup.mounted = true;

		// only dispatch mount notifications when the parent group is already mounted, or if this is the
		// top-level group - otherwise, mount notification will arrive once the parent mounts
		if (hGroup.$pg?.mounted !== false) {
			notifyMounted(hGroup);
		}
	}
}

/**
 * Only used by `mount`, do not call directly.
 *
 * Recursively (dept-first) runs components' `mounted` callbacks.
 * @see {@link mount}
 * @internal
 */
function notifyMounted<TNode>(hNode: HNode<TNode>) {
	let current = hNode.$hh;
	while (current) {
		notifyMounted(current);
		current = current.$hn;
	}

	let callbacks;
	if (hNode.$isGroup && hNode.mounted && (callbacks = hNode.$onMount)) {
		const previousLifecycle = setLifecycle(hNode);
		try {
			callbacks.forEach(invoke);
		}
		finally {
			callbacks.length = 0;
			setLifecycle(previousLifecycle);
		}
	}
}

/**
 * Only used by `mount`, do not call directly.
 *
 * Re-inserts native nodes of the given group to the specified location in the native tree. Only
 * moves the uppermost nodes - any children should move implicitly with them.
 * @see {@link mount}
 * @internal
 */
function reinsertNodes<TNode>(hGroup: MountingGroup<TNode>, nParent: TNode, nBefore: TNode | null) {
	const { adapter } = hGroup;

	let current = hGroup.$hh;
	while (current) {
		if (current.$isNative) {
			adapter.insert(current.$nn, nParent, nBefore);
			// no need to recurse, group is already mounted, so any sub-groups within this native
			// node have been already moved with it
		}
		else {
			reinsertNodes(current, nParent, nBefore);
		}

		current = current.$hn;
	}
}

/**
 * Unmounts the contents of a MountingGroup from the node tree. The group itself, though empty,
 * remains usable and can be remounted later.
 */
export function unmount<TNode>(group: MountingGroup<TNode>): void;

/** @internal */
export function unmount<TNode>(hNode: HNode<TNode>, top?: boolean): void;
export function unmount<TNode>(hNode: HNode<TNode>, top: boolean = true) {
	if (hNode.$isGroup) {
		if (hNode.mounted) {
			let callbacks;
			if (callbacks = hNode.$onUnmount) {
				const previousLifecycle = setLifecycle(hNode);
				try {
					callbacks.forEach(invoke);
				}
				finally {
					callbacks.length = 0;
					setLifecycle(previousLifecycle);
				}
			}

			hNode.mounted = false;
			hNode.$life += 1;
		}

		// unmounted groups shouldn't have anything to unlink, but a zombie dependency can have
		// catastrophic consequences, so...
		unlinkAll(hNode);
	}

	const { adapter } = hNode.$ng;
	let current = hNode.$hh;
	let next;

	while (current) {
		if (current.$isNative && top) {
			adapter.remove(current.$nn);
			unmount(current, false);
		}
		else {
			unmount(current, top);
		}

		next = current.$hn;
		current.$hp = null;
		current.$hn = null;
		current = next;
	}

	hNode.$hh = null;
	hNode.$ht = null;
}

/**
 * Mounts components described by the JsxResult to the specified location in the node tree.
 */
export function mountJsx<TNode>(
	jsx: any,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
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
					mountJsx(jsx[index], hParent, nUsedParent, nRealParent, nBefore, isBatch);
				}

				break;
			}

			if (!isAtom(jsx)) {
				(jsx[S_COMPONENT] as ComponentHandler | undefined)
					?.(jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch);

				break;
			}

			// fall through

		case "string":
		case "number":
		case "boolean":
		case "bigint":
			Text(jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch);
			break;
	}
}

/**
 * Inserts a native node and adds it to the tracking hierarchy. Necessary to preserve render order.
 * Should only be called by component handlers!
 */
export function insert<TNode>(
	nNode: TNode,
	children: any,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	let hNative = hParent;
	if (hNative.$isGroup) {
		// parent is a group, so this is its top-level node -> find insertion point
		let hBefore = null;
		if (nBefore) {
			let current = hParent.$ht;
			while (current) {
				if (current.$isNative && current.$nn === nBefore) {
					hBefore = current;
					break;
				}

				current = current.$hp;
			}
		}

		track(hNative = {
			$isNative: true,
			$pg: hNative,
			$ng: hNative,
			$nn: nNode,
		}, hParent, hBefore);
	}

	mountJsx(children, hNative, nNode, nNode, null, isBatch);
	hParent.$ng.adapter.insert(nNode, nUsedParent, nBefore);
}
