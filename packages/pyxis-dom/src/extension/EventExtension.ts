import { getLifecycle, peek, unmounted, withLifecycle, type ElementsType, type ExtensionProps, type Lifecycle, type MaybeAtom, type Nil, type NodeType } from "@calmdown/pyxis/core";

export interface EventExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: (
			TElements[TElementName] & ExtensionProps<TExtensionKey, {
				readonly [TEventName in keyof GlobalEventHandlersEventMap]?: EventListenerType<GlobalEventHandlersEventMap[TEventName], NodeType<TElements[TElementName]>, TEventName>;
			}>
		);
	};

	set: (node: HTMLElement, className: string, toggle: EventListenerType<unknown, unknown, string>) => void;
}

export type EventListenerType<TEvent, TNode = EventTarget, TEventName = string> =
	| MaybeAtom<Nil<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>>
	| (AddEventListenerOptions & { capture?: false } & {
		readonly listener: MaybeAtom<Nil<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>>;
	})
	| (AddEventListenerOptions & { capture: true } & {
		readonly listener: MaybeAtom<Nil<(e: ExtendedEvent<TEvent, EventTarget | null, TEventName>) => void>>;
	});

export type ExtendedEvent<TEvent, TNode = EventTarget, TEventName = string> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly currentTarget: TNode;
		readonly type: TEventName;
	};

/**
 * Extension adding EventListener access to any Element. Recommended prefix:
 * `"on"`
 *
 * All standard DOM events can be subscribed using this extension. You can pass
 * a function directly to add a simple listener, or pass an object to
 * additionally specify listener options. In both cases the listener can be an
 * atom, allowing to dynamically change the listener callback. Listener options
 * cannot be dynamically changed.
 *
 * Example usage:
 * ```tsx
 * <div
 *   on:contextmenu={e => {
 *     // ...
 *   }}
 *   on:scroll={{
 *     passive: true,
 *     listener: e => {
 *       // ...
 *     },
 *   }}
 * />
 * ```
 */
export const EventExtension = {
	set: (
		node: HTMLElement,
		type: string,
		listener: EventListenerType<unknown, unknown, string>,
	) => {
		// see if listener options have been given
		type ListenerAtom = MaybeAtom<Nil<(e: unknown) => unknown>>;
		let listenerAtom = listener as ListenerAtom;
		let options: AddEventListenerOptions | undefined;

		const maybeOptions = peek(listener);
		if (maybeOptions !== null && typeof maybeOptions === "object") {
			listenerAtom = maybeOptions.listener as ListenerAtom;
			options = maybeOptions;
		}

		if (!listenerAtom) {
			return;
		}

		// listen
		const lifecycle = getExtendedLifecycle();
		const listenerWithLifecycle = (e: unknown) => {
			const handler = peek(listenerAtom);
			if (handler) {
				withLifecycle(lifecycle, handler, e);
			}
		};

		node.addEventListener(type, listenerWithLifecycle, options);
		lifecycle.$events.push({
			$f: listenerWithLifecycle,
			$n: node,
			$e: type,
			$o: options,
		});
	},
} as EventExtensionType;


function getExtendedLifecycle() {
	const lifecycle = getLifecycle() as ExtendedLifecycle;
	if (!lifecycle.$events) {
		const entries: ListenerEntry[] = [];
		unmounted(() => {
			const { length } = entries;
			let index = 0;
			let entry;

			for (; index < length; index += 1) {
				entry = entries[index];
				entry.$n.removeEventListener(entry.$e, entry.$f, entry.$o);
			}

			entries.length = 0;
		});

		lifecycle.$events = entries;
	}

	return lifecycle;
}

interface ExtendedLifecycle extends Lifecycle {
	$events: ListenerEntry[];
}

interface ListenerEntry {
	$f: (e: unknown) => void;
	$n: HTMLElement;
	$e: string;
	$o?: AddEventListenerOptions;
}
