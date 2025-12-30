import { getContext, reaction, read, unmounted, withContext, type MaybeAtom } from "@calmdown/pyxis";

export type EventExtensionType = {
	[TType in keyof GlobalEventHandlersEventMap]: {
		set<TNode extends HTMLElement>(
			node: TNode,
			type: TType,
			listener: MaybeAtom<(e: ExtendedEvent<GlobalEventHandlersEventMap[TType], TType, TNode>) => any>,
		): void;
	};
}[keyof GlobalEventHandlersEventMap];

export type ExtendedEvent<TEvent, TType, TNode> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly type: TType;
		readonly currentTarget: TNode;
	};

export const EventExtension: EventExtensionType = {
	set: (
		node: HTMLElement,
		type: string,
		listenerAtom: MaybeAtom<(e: any) => any>,
	) => {
		let callback: (e: any) => any;

		const context = getContext();
		const listener = (e: any) => withContext(context, callback!, e);

		reaction(() => {
			callback = read(listenerAtom);
		}, context);

		node.addEventListener(type, listener);
		unmounted(() => {
			node.removeEventListener(type, listener);
		}, context);
	},
};
