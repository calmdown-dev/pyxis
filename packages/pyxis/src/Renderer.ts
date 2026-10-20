import { isAtom, type Atom } from "~/data/Atom";
import type { ContextContainer } from "~/data/Context";
import { bind, teardown } from "~/data/Dependency";
import type { Lifecycle } from "~/data/Lifecycle";
import { createScheduler } from "~/data/Scheduler";
import { invoke, rethrow } from "~/support/common";
import type { ElementsType, Mutable, Nil } from "~/support/types";

import type { Adapter, ExtensionsType } from "./Adapter";
import type { ComponentHandler, JsxResult } from "./Component";
import { runtime } from "./Runtime";
import { S_COMPONENT } from "./symbols";

export interface Renderer<TNode, TElements extends ElementsType = ElementsType> extends Lifecycle {
	/**
	 * Carries information about the available intrinsic elements when using this Renderer.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $elements?: TElements;

	mount: (root: TNode, jsx: JsxResult) => MountingGroup<TNode>;
	unmount: (group: MountingGroup<TNode>) => void;
}

/** Extracts the typings of intrinsic elements supported by the given Renderer. */
export type ElementsOf<TRenderer, TFallback extends ElementsType = {}> = (
	TRenderer extends { readonly $elements?: infer TElements extends ElementsType }
		? TElements
		: TFallback
);


export interface MountingGroup<TNode> extends Lifecycle, Hierarchy<TNode> {
	/** @internal */
	readonly $isGroup: true;

	/** @internal */
	readonly $isNative?: never;

	/** the Adapter rendering this MountingGroup */
	readonly adapter: Adapter<TNode>;

	/** @internal */
	readonly $extensions: ExtensionsType<TNode>;

	/** @internal */
	readonly $context: ContextContainer | null;

	/** @internal */
	mounted: boolean;

	/**
	 * active render nesting depth - only the outermost invocation occupies the mount stack
	 * @internal
	 */
	$depth: number;

	/**
	 * tracks whether all mounting work has been completed and that this Lifecycle can be
	 * "officially" mounted
	 * @internal
	 */
	$canMount?: boolean;
}

interface NativeNode<TNode> extends Hierarchy<TNode> {
	/** @internal */
	readonly $isNative: true;

	/** @internal */
	readonly $isGroup?: never;

	/** @internal */
	readonly $nn: TNode;
}

interface Hierarchy<TNode> {
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
	const hRoot: Mutable<MountingGroup<TNode> & Renderer<TNode, TIntrinsicElements>> = {
		adapter: adapter,
		mounted: true,
		$isGroup: true,
		$scheduler: createScheduler(adapter.tick),
		$extensions: extensions,
		$context: null,
		$depth: 0,
		$life: 1,
		$ng: null!,
		$ph: null,
		unmount: destroy,
		mount: (nRoot, jsx) => {
			const hGroup = fork(hRoot, null, null);
			try {
				willMount(hGroup, () => {
					const isBatch = !!adapter.batch;
					const nParent = isBatch ? adapter.batch!() : nRoot;
					mount(jsx, hGroup, nParent, nRoot, null, isBatch);
					if (isBatch) {
						adapter.insert(nParent, nRoot, null);
						flush(hGroup);
					}
				})();

				return hGroup;
			}
			catch (ex) {
				destroy(hGroup);
				throw ex;
			}
		},
	};

	hRoot.$ng = hRoot;
	return hRoot;
}

/**
 * Unmounts a MountingGroup and removes it from the hierarchy. The removal is guaranteed even if
 * user code throws during unmount. Also clears refs to its original parent node. Destroyed groups
 * cannot be reused.
 */
export function destroy<TNode>(hGroup: MountingGroup<TNode>) {
	if (!deferUnmount(hGroup, true)) {
		const errors: unknown[] = [];
		doUnmount(hGroup, errors);
		untrack(hGroup);
		hGroup.$ph = null;

		rethrow(errors);
	}
}

/**
 * Creates a sub-group within the provided MountingGroup. Needed whenever a subtree needs to mount
 * or unmount dynamically.
 */
export function fork<TNode>(
	hParent: HNode<TNode>,
	hBefore?: HNode<TNode> | null,
): MountingGroup<TNode>;

/** @internal */
export function fork<TNode>(
	hParent: HNode<TNode>,
	hBefore: HNode<TNode> | null,
	context: ContextContainer | null,
): MountingGroup<TNode>

export function fork<TNode>(
	hParent: HNode<TNode>,
	hBefore: HNode<TNode> | null = null,
	context: ContextContainer | null = runtime.$currentContext,
): MountingGroup<TNode> {
	const ng = hParent.$ng;
	const hGroup: Mutable<MountingGroup<TNode>> = {
		adapter: ng.adapter,
		mounted: false,
		$isGroup: true,
		$scheduler: ng.$scheduler,
		$extensions: ng.$extensions,
		$context: context,
		$depth: 0,
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
 * Creates a reusable callback for a complete render operation, including reactive reads, nested
 * mounts and batch commits. Each invocation defers conflicting unmounts until the outermost render
 * finishes, preserves the caller's reactive tracking, and returns the block's result unchanged.
 *
 * Deferred teardown errors are reported by the outermost render, after all requests are processed.
 */
export function willMount<TNode, TResult>(hGroup: MountingGroup<TNode>, block: () => TResult){
	return (() => {
		const errors: unknown[] = [];
		const mounts = runtime.$mounts ??= [];
		if (++hGroup.$depth === 1) {
			mounts.push(hGroup);
		}

		try {
			return block();
		}
		catch (ex) {
			errors.push(ex);
		}
		finally {
			if (--hGroup.$depth === 0) {
				mounts.pop();
			}

			finishMount(errors);
		}
	}) as (() => TResult);
}

/**
 * Mounts JSX into a group that is not already mounted. When rendering into an externally owned
 * batch, enclose the complete operation (including the commit and `flush`) in {@link willMount}.
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
		return;
	}

	const errors: unknown[] = [];
	const mounts = runtime.$mounts ??= [];
	if (++hGroup.$depth === 1) {
		mounts.push(hGroup);
	}

	const prevLifecycle = runtime.$currentLifecycle;
	const prevEffect = runtime.$currentEffect;
	const prevContext = runtime.$currentContext;
	const prevContextNew = runtime.$currentContextNew;
	runtime.$currentLifecycle = hGroup;
	runtime.$currentContext = hGroup.$context;
	runtime.$currentContextNew = false;
	runtime.$currentEffect = null;

	try {
		mountJsx(jsx, hGroup, nUsedParent, nRealParent, nBefore, isBatch);

		hGroup.$canMount = true;
		if (!isBatch) {
			flush(hGroup);
		}
	}
	catch (ex) {
		errors.push(ex);
	}

	runtime.$currentLifecycle = prevLifecycle;
	runtime.$currentEffect = prevEffect;
	runtime.$currentContext = prevContext;
	runtime.$currentContextNew = prevContextNew;
	if (--hGroup.$depth === 0) {
		mounts.pop();
	}

	if (errors.length && !deferUnmount(hGroup)) {
		doUnmount(hGroup, errors);
	}

	finishMount(errors);
}

/**
 * Processes deferred unmount requests once the outermost render finishes. Throws collected errors,
 * if any.
 */
function finishMount(errors: unknown[]) {
	if (!runtime.$mounts!.length) {
		// nested renders get a separate queue while this one is being drained
		const pending = runtime.$unmounts;
		runtime.$unmounts = null;

		if (pending) {
			const { length } = pending;
			let index = 0;
			let request;

			for (; index < length; index += 1) {
				request = pending[index];

				// an earlier ancestor teardown may have already ended this generation
				if (request.$life !== request.$group.$life) {
					continue;
				}

				doUnmount(request.$group, errors);
				if (request.$destroy) {
					untrack(request.$group);
					request.$group.$ph = null;
				}
			}
		}
	}

	rethrow(errors);
}

/** Queues only teardown requests that would interrupt an active render. */
function deferUnmount<TNode>(hGroup: MountingGroup<TNode>, isDestroy = false) {
	const mounts = runtime.$mounts;
	if (!mounts?.length) {
		return false;
	}

	const lifecycle = runtime.$currentLifecycle as MountingGroup<TNode> | null;
	const { length } = mounts;
	let index = 0;
	let active;

	for (; index < length; index += 1) {
		active = mounts[index];
		// mount callbacks can run on a descendant of the mount's own group
		if (
			ancestorContainsNode(hGroup, active) || (
				lifecycle?.$isGroup &&
				ancestorContainsNode(active, lifecycle) &&
				ancestorContainsNode(hGroup, lifecycle)
			)
		) {
			break;
		}
	}

	if (index === length) {
		return false;
	}

	const pending = runtime.$unmounts ??= [];
	const pendingLength = pending.length;
	let pendingIndex = 0;
	let request;

	for (; pendingIndex < pendingLength; pendingIndex += 1) {
		request = pending[pendingIndex];
		if (request.$group === hGroup && request.$life === hGroup.$life) {
			request.$destroy ||= isDestroy;
			return true;
		}
	}

	pending.push({
		$group: hGroup,
		$life: hGroup.$life,
		$destroy: isDestroy,
	});

	return true;
}

function ancestorContainsNode<TNode>(hAncestor: HNode<TNode>, hNode: HNode<TNode> | null) {
	while (hNode) {
		if (hNode === hAncestor) {
			return true;
		}

		hNode = hNode.$ph;
	}

	return false;
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
		const prevLifecycle = runtime.$currentLifecycle;
		const prevEffect = runtime.$currentEffect;
		runtime.$currentEffect = null;

		const errors: unknown[] = [];
		const mounts = runtime.$mounts ??= [];
		if (++hGroup.$depth === 1) {
			mounts.push(hGroup);
		}

		doFlush(hGroup, errors);

		runtime.$currentLifecycle = prevLifecycle;
		runtime.$currentEffect = prevEffect;
		if (--hGroup.$depth === 0) {
			mounts.pop();
		}

		finishMount(errors);
	}
}

/**
 * Recursively (dept-first) runs components' `mounted` callbacks.
 * @see {@link mount}
 * @internal
 */
function doFlush<TNode>(hNode: HNode<TNode>, errors: unknown[]) {
	let current = hNode.$hh;
	while (current) {
		doFlush(current, errors);
		current = current.$hn;
	}

	if (hNode.$isGroup && hNode.$canMount && !hNode.mounted) {
		hNode.mounted = true;

		if (hNode.$onMount?.length) {
			// the callbacks array may change when a callback causes a nested unmount run
			const callbacks = hNode.$onMount;
			let index = 0;

			runtime.$currentLifecycle = hNode;
			for (; index < callbacks.length; index += 1) {
				try {
					invoke(callbacks[index]);
				}
				catch (ex) {
					errors.push(ex);
				}
			}

			callbacks.length = 0;
		}
	}
}

/**
 * Re-inserts native nodes of the given group to the specified location in the native tree. Only
 * moves the uppermost nodes - any children are assumed to move implicitly with them.
 * @see {@link mount}
 * @internal
 */
export function reinsertNodes<TNode>(hGroup: MountingGroup<TNode>, nParent: TNode, nBefore: TNode | null) {
	if (!hGroup.mounted) {
		return;
	}

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
 *
 * If teardown would interrupt an active render, it is deferred until the outermost render
 * operation finishes. Any teardown errors are then reported by that operation.
 */
export function unmount<TNode>(hGroup: MountingGroup<TNode>): void;

/** @internal */
export function unmount<TNode>(hGroup: MountingGroup<TNode>, errors?: unknown[]): void;

export function unmount<TNode>(hGroup: MountingGroup<TNode>, errors?: unknown[]) {
	if (deferUnmount(hGroup)) {
		rethrow(errors);
		return;
	}

	errors ??= [];
	doUnmount(hGroup, errors);
	rethrow(errors);
}

function doUnmount<TNode>(hGroup: MountingGroup<TNode>, errors: unknown[]) {
	const prevLifecycle = runtime.$currentLifecycle;
	const prevEffect = runtime.$currentEffect;
	runtime.$currentEffect = null;

	unmountNode(hGroup, errors, true);
	runtime.$currentLifecycle = prevLifecycle;
	runtime.$currentEffect = prevEffect;
}

function unmountNode<TNode>(hNode: HNode<TNode>, errors: unknown[], top: boolean) {
	if (hNode.$isGroup) {
		// regardless of mounted state, always run teardown callbacks when there are any
		if (hNode.$onUnmount?.length) {
			// the callbacks array may change when a callback causes a nested unmount run
			const callbacks = hNode.$onUnmount;
			let index = 0;

			runtime.$currentLifecycle = hNode;
			for (; index < callbacks.length; index += 1) {
				try {
					invoke(callbacks[index]);
				}
				catch (ex) {
					errors.push(ex);
				}
			}
		}

		hNode.mounted = false;
		hNode.$canMount = false;
		teardown(hNode); // also clears mount and unmount callback arrays
	}

	const { adapter } = hNode.$ng;
	let current = hNode.$hh;
	let next;

	while (current) {
		if (current.$isNative && top) {
			try {
				adapter.remove(current.$nn);
			}
			catch (ex) {
				errors.push(ex);
			}

			unmountNode(current, errors, false);
		}
		else {
			unmountNode(current, errors, top);
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

/**
 * Mounts a text node with static content to the specified location in the node tree.
 */
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

/**
 * Mounts a text node with dynamic content to the specified location in the node tree. An observer
 * is setup to drive reactions, updating the rendered text as needed.
 */
function mountDynamicText<TNode>(
	atom: Atom<Nil<string | number | bigint | boolean>>,
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
