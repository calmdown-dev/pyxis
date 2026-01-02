import { getContext, reaction, read, unmounted, withContext, type ElementsType, type ExtensionProps, type MaybeAtom, type NodeType } from "@calmdown/pyxis";

export interface EventExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, {
			readonly [TEventName in keyof GlobalEventHandlersEventMap]?: MaybeAtom<(e: ExtendedEvent<GlobalEventHandlersEventMap[TEventName], TEventName, NodeType<TElements[TElementName]>>) => any>;
		}>;
	};

	set: (node: HTMLElement, className: string, toggle: MaybeAtom<boolean>) => void;
}

export type ExtendedEvent<TEvent, TEventName, TNode> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly type: TEventName;
		readonly currentTarget: TNode;
	};

export const EventExtension = {
	set: (
		node: HTMLElement,
		type: string,
		listener: MaybeAtom<(e: any) => any>,
	) => {
		let callback: (e: any) => any;

		const context = getContext();
		const listenerWithContext = (e: any) => {
			withContext(context, callback!, e);
		};

		reaction(() => {
			callback = read(listener);
		}, context);

		node.addEventListener(type, listenerWithContext);
		unmounted(() => {
			node.removeEventListener(type, listenerWithContext);
		}, context);
	},
} as EventExtensionType;
