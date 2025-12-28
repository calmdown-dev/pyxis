import type { Adapter, ExtensionMap } from "./Adapter";
import type { Component, DataTemplate, Template } from "./Component";
import { isAtom, read, type Atom } from "./data/Atom";
import { contextMounted, contextUnmounted, getContext, onMounted, onUnmounted, withContext, type Context } from "./data/Context";
import { reaction } from "./data/Reaction";
import { createScheduler, type TickFn } from "./data/Scheduler";
import { EMPTY_ARRAY, EMPTY_OBJECT, wrap } from "./support/common";

export interface Renderer<TNode> {
	mount(root: TNode, template: Template): void;
	unmount(): void;
}

/** @internal */
export interface RendererContext<TNode = any, TExtensions extends ExtensionMap = ExtensionMap> extends Context {
	readonly adapter: Adapter<TNode>;
	readonly extensions: TExtensions;
	readonly parent?: RendererContext<TNode, TExtensions>;
	topNodes: readonly TNode[];
}

export interface RendererOptions<TNode, TExtensions extends ExtensionMap = {}> {
	adapter: Adapter<TNode>;
	extensions?: TExtensions;
	tick: TickFn;
}

export function createRenderer<TNode, TExtensions extends ExtensionMap>(
	options: RendererOptions<TNode, TExtensions>,
): Renderer<TNode> {
	const context: RendererContext<TNode, TExtensions> & Renderer<TNode> = {
		scheduler: createScheduler(options.tick),
		adapter: options.adapter,
		extensions: options.extensions ?? (EMPTY_OBJECT as TExtensions),
		topNodes: EMPTY_ARRAY,
		mounted: false,
		unmount: () => unmount(context),
		mount: (root, template) => {
			const nodes = withContext(context, () => (
				context.topNodes = wrap(template())
			));

			appendChildren(options.adapter, root, nodes);
			contextMounted(context);
		},
	};

	return context;
}

const RE_EXT = /^([^:]+):([^:]+)$/;

export function render(
	tagName: string,
	props: { readonly [_ in string]?: unknown },
): JSX.Node;

export function render<TProps extends {}, TReturn>(
	component: Component<TProps, TReturn>,
	props: TProps,
): TReturn;

export function render(
	componentOrTagName: Component<any> | string,
	props: any,
) {
	if (typeof componentOrTagName !== "string") {
		return componentOrTagName(props);
	}

	const context = getContext() as RendererContext;
	const { adapter, extensions } = context;

	const node = adapter.createNativeNode(componentOrTagName);

	let name;
	let match;
	let value;
	for (name in props) {
		match = RE_EXT.exec(name);
		value = props[name];
		if (match) {
			extensions[match[1]]?.setProp(node, match[2], value);
		}
		else if (name !== "children") {
			if (isAtom(value)) {
				const prop = name;
				const atom = value;
				reaction(() => adapter.setProp(node, prop, read(atom)), context);
			}
			else {
				adapter.setProp(node, name, value);
			}
		}
	}

	appendChildren(adapter, node, props.children);
	return node;
}

/**
 * Creates a sub-context of the provided RendererContext. Needed whenever a subtree may need to
 * dynamically re-render or unmount entirely.
 * @internal
 */
export function fork<TNode, TExtensions extends ExtensionMap>(
	context: RendererContext<TNode, TExtensions> = (getContext() as RendererContext<TNode, TExtensions>),
): RendererContext<TNode, TExtensions> {
	const subContext = {
		scheduler: context.scheduler,
		adapter: context.adapter,
		extensions: context.extensions,
		parent: context,
		topNodes: [],
		mounted: false,
	};

	onUnmounted(context, {
		fn: unmount,
		a0: subContext,
	});

	return subContext;
}

/** @internal */
export function mount<TNode>(context: RendererContext<TNode>, template: Template, data?: undefined, before?: TNode): void;

/** @internal */
export function mount<TNode, T>(context: RendererContext<TNode>, template: DataTemplate<T>, data: T, before?: TNode): void;

export function mount<TNode>(context: RendererContext<TNode>, template: Template | DataTemplate<any>, data?: any, before?: TNode) {
	if (context.mounted) {
		insertChildren(context.adapter, before!, context.topNodes);
		return;
	}

	withContext(context, () => {
		context.topNodes = wrap(template(data))
	});

	if (before && context.parent!.mounted === true) {
		insertChildren(context.adapter, before, context.topNodes);
		contextMounted(context);
	}
	else {
		onMounted(context.parent!, {
			fn: contextMounted,
			a0: context,
		});
	}
}

/** @internal */
export function unmount(context: RendererContext) {
	contextUnmounted(context);
	if (context.parent?.mounted !== false) {
		// only remove nodes if the parent context is still mounted, otherwise this context's nodes
		// will be removed as part of the tree
		const { adapter, topNodes } = context;
		const { length } = topNodes;

		let i = 0;
		for (; i < length; i += 1) {
			adapter.removeNode(topNodes[i]);
		}
	}

	context.topNodes = EMPTY_ARRAY;
}

function appendChildren<TNode>(adapter: Adapter<TNode>, root: TNode, children: readonly TNode[]) {
	const { length } = children;
	let child;
	let i = 0;

	for (; i < length; i += 1) {
		child = children[i];
		if (child !== null && child !== undefined) {
			if (Array.isArray(child)) {
				appendChildren(adapter, root, child);
			}
			else {
				adapter.appendNode(child, root);
			}
		}
	}
}

function insertChildren<TNode>(adapter: Adapter<TNode>, before: TNode, children: readonly TNode[]) {
	const { length } = children;
	let child;
	let i = 0;

	for (; i < length; i += 1) {
		child = children[i];
		if (child !== null && child !== undefined) {
			if (Array.isArray(child)) {
				insertChildren(adapter, before, child);
			}
			else {
				adapter.insertNode(child, before);
			}
		}
	}
}
