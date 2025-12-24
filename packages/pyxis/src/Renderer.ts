import type { Adapter, Extension } from "./Adapter";
import type { Context } from "./data/Context";
import { createScheduler, type TickFn } from "./data/Scheduler";

export interface Renderer<TNode, TExtensions extends { [_ in string]: Extension<TNode> }> extends Context {
	/** @internal */
	readonly adapter: Adapter<TNode>;

	/** @internal */
	readonly extensions: TExtensions;

	mount(): void;
	unmount(): void;
}

export interface RendererOptions<TNode, TExtensions extends { [_ in string]: Extension<TNode> } = {}> {
	adapter: Adapter<TNode>;
	extensions?: TExtensions;
	root: TNode;
	tick: TickFn;
}

export function createRenderer<TNode, TExtensions extends { [_ in string]: Extension<TNode> }>(
	options: RendererOptions<TNode, TExtensions>,
): Renderer<TNode, TExtensions> {

	return {
		scheduler: createScheduler(options.tick),
		adapter: options.adapter,
		extensions: options.extensions ?? ({} as TExtensions),

	};
}
