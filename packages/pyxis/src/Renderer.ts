import { isAtom, type ReadAtom } from "~/data/Atom";
import { bind, teardown } from "~/data/Dependency";
import { setLifecycle, type Lifecycle } from "~/data/Lifecycle";
import { createScheduler } from "~/data/Scheduler";
import { invoke } from "~/support/common";
import type { ElementsType, Mutable, Nil } from "~/support/types";

import type { Adapter, ExtensionsType } from "./Adapter";
import type { ComponentHandler, JsxResult } from "./Component";
import { S_COMPONENT } from "./symbols";

export interface Renderer<TNode, TElements extends ElementsType = ElementsType> extends Lifecycle {
	/**
	 * Carries information about the available intrinsic elements when using this Renderer.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $elements?: TElements;

	mount: (root: TNode, jsx: JsxResult) => void;
	unmount: () => void;
}

/** Extracts the typings of intrinsic elements supported by the given Renderer. */
export type ElementsOf<TRenderer, TFallback extends ElementsType = {}> = (
	TRenderer extends { readonly $elements?: infer TElements extends ElementsType }
		? TElements
		: TFallback
);


export interface MountingGroup<TNode> extends Lifecycle, Hierarchy<TNode> {
	readonly $isGroup: true;
	readonly $isNative?: never;

	/** the Adapter rendering this MountingGroup */
	readonly adapter: Adapter<TNode>;

	/** @internal */
	readonly $extensions: ExtensionsType<TNode>;

	/** @internal */
	mounted: boolean;

	/**
	 * tracks whether all mounting work has been completed and that this Lifecycle can be
	 * "officially" mounted
	 * @internal
	 */
	$canMount?: boolean;
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
	 * the nearest native node (ancestor or self) - on groups, this is only present in dev mode
	 * @internal
	 */
	readonly $nn?: TNode;

	/**
	 * the parent h-node of this h-node
	 * @internal
	 */
	$ph: HNode<TNode> | null;

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
/*@__NO_SIDE_EFFECTS__*/
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
		$ng: null!,
		$ph: null,
		unmount: () => unmount(hGroup),
		mount: (nRoot, jsx) => {
			if (__DEV__) {
				hGroup.$nn = nRoot;
			}

			const isBatch = !!adapter.batch;
			const nParent = isBatch ? adapter.batch!() : nRoot;
			mount(jsx, hGroup, nParent, nRoot, null, isBatch);
			if (isBatch) {
				adapter.insert(nParent, nRoot, null);
				flush(hGroup);
			}
		},
	};

	hGroup.$ng = hGroup;
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
		$ng: null!,
		$ph: hParent,
	};

	hGroup.$ng = hGroup;
	if (__DEV__) {
		hGroup.$nn = hParent.$nn;
	}

	track(hGroup, hParent, hBefore);
	return hGroup;
}

/**
 * Inserts a HNode to the hierarchy. When reusing nodes, callers must make sure `untrack` has been
 * previously called on the node to be re-inserted.
 * @see {@link untrack}
 */
export function track<TNode>(
	hNode: HNode<TNode>,
	hParent: HNode<TNode>,
	hBefore: HNode<TNode> | null = null,
) {
	// insert into hierarchy before given sibling
	if (hBefore?.$ph === hParent) {
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

	hNode.$ph = hParent;
}

/**
 * Removes a HNode from the tracking hierarchy. Removed nodes may be reused and re-inserted using
 * the `track` function.
 * @see {@link track}
 */
export function untrack<TNode>(hNode: HNode<TNode>) {
	if (hNode.$hp) {
		hNode.$hp.$hn = hNode.$hn;
	}
	else if (hNode.$ph?.$hh === hNode) {
		hNode.$ph.$hh = hNode.$hn;
	}

	if (hNode.$hn) {
		hNode.$hn.$hp = hNode.$hp;
	}
	else if (hNode.$ph?.$ht === hNode) {
		hNode.$ph.$ht = hNode.$hp;
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
	try {
		mountJsx(jsx, hGroup, nUsedParent, nRealParent, nBefore, isBatch);
	}
	finally {
		setLifecycle(previousLifecycle);
	}

	hGroup.$canMount = true;
	if (!isBatch) {
		flush(hGroup);
	}
}

/**
 * Marks the provided hGroup and all of its descendants as mounted and dispatches notifications
 * where appropriate.
 *
 * Normally this happens automatically as part of calling {@link mount}, but it is necessary to
 * flush manually when rendering into a batch. Batch owners are responsible for calling this
 * function once the batch has been committed.
 */
export function flush<TNode>(hGroup: MountingGroup<TNode>) {
	// only dispatch mount notifications when the parent group is already mounted, or if this is the
	// top-level group - otherwise, mount notification will arrive once the parent mounts
	if (hGroup.$ph?.$ng.mounted !== false) {
		notifyMounted(hGroup);
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

	if (hNode.$isGroup && hNode.$canMount && !hNode.mounted) {
		hNode.mounted = true;

		let callbacks;
		if ((callbacks = hNode.$onMount)?.length) {
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
		try {
			// regardless of mounted state, always run teardown callbacks when there are any
			if (hNode.$onUnmount?.length) {
				const previousLifecycle = setLifecycle(hNode);
				try {
					hNode.$onUnmount.forEach(invoke);
				}
				finally {
					setLifecycle(previousLifecycle);
				}
			}
		}
		finally {
			hNode.mounted = false;
			hNode.$canMount = false;
			teardown(hNode);
		}
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
		current.$ph = null;
		current = next;
	}

	hNode.$hh = null;
	hNode.$ht = null;
}

/**
 * Mounts components described by JSX to the specified location in the node tree.
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
				const text = mountJsxArray(jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch);
				if (text) {
					mountStaticText(text, hParent, nUsedParent, nBefore, isBatch);
				}

				break;
			}

			if (isAtom(jsx)) {
				mountDynamicText(jsx, hParent, nUsedParent, nBefore, isBatch);
			}
			else {
				(jsx[S_COMPONENT] as ComponentHandler | undefined)?.(jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch);
			}

			break;

		case "string":
			if (jsx === "") {
				break;
			}

			// fall through

		case "number":
		case "bigint":
			mountStaticText("" + jsx, hParent, nUsedParent, nBefore, isBatch);
			break;
	}
}

/**
 * Mounts components described by an array of JSX items to the specified location in the node tree.
 * Returns pending static text.
 */
function mountJsxArray<TNode>(
	jsx: readonly any[],
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
	text: string = "",
): string {
	const { length } = jsx;
	let index = 0;
	let item;

	for (; index < length; index += 1) {
		item = jsx[index];
		switch (typeof item) {
			case "string":
			case "number":
			case "bigint":
				text += item;
				break;

			case "boolean":
				break;

			default:
				if (item === null || item === undefined) {
					break;
				}

				if (Array.isArray(item)) {
					text = mountJsxArray(item, hParent, nUsedParent, nRealParent, nBefore, isBatch, text);
					break;
				}

				if (text) {
					mountStaticText(text, hParent, nUsedParent, nBefore, isBatch);
					text = "";
				}

				mountJsx(item, hParent, nUsedParent, nRealParent, nBefore, isBatch);
				break;
		}
	}

	return text;
}

function mountStaticText<TNode>(
	text: string,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	const node = hParent.$ng.adapter.text(text, null);
	insert(node, null, hParent, nUsedParent, nBefore, isBatch);
}

function mountDynamicText<TNode>(
	atom: ReadAtom<Nil<string | number | bigint | boolean>>,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	const { adapter } = hParent.$ng;
	let node: TNode | null = null;

	bind(hParent.$ng, atom, () => {
		const value = atom.get();
		node = adapter.text(
			value === null || value === undefined || typeof value === "boolean" ? "" : "" + value,
			node,
		);
	});

	insert(node!, null, hParent, nUsedParent, nBefore, isBatch);
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
			$ng: hNative,
			$nn: nNode,
			$ph: hNative,
		}, hParent, hBefore);
	}

	mountJsx(children, hNative, nNode, nNode, null, isBatch);
	hParent.$ng.adapter.insert(nNode, nUsedParent, nBefore);
}
