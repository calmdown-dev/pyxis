import { extension, getLifecycle, peek, unmounted, withLifecycle, type ExtensionPropMapping, type Lifecycle, type MaybeReadAtom, type Nil } from "@calmdown/pyxis/core";

interface EventPropMapping extends ExtensionPropMapping<Node> {
	extension: EventProps<this["node"]>;
}

type EventProps<TNode> = {
	[TEventName in keyof GlobalEventHandlersEventMap]?: EventListenerType<GlobalEventHandlersEventMap[TEventName], TNode, TEventName>;
};

export type EventListenerType<TEvent, TNode = EventTarget, TEventName = string> =
	| MaybeReadAtom<Nil<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>>
	| {
		readonly listener: MaybeReadAtom<Nil<(e: ExtendedEvent<TEvent, TNode, TEventName>) => void>>;
		readonly capture?: boolean;
		readonly once?: boolean;
		readonly passive?: boolean;
	};

export type ExtendedEvent<TEvent, TNode = EventTarget, TEventName = string> =
	& Omit<TEvent, "type" | "currentTarget">
	& {
		readonly currentTarget: TNode;
		readonly type: TEventName;
	};

/**
 * Extension adding event subscriptions to any Element. Recommended prefix: `"on"`.
 *
 * Out of the box, common DOM events can be subscribed using this extension. You can pass a function
 * directly to add a simple listener, or pass an object to also specify additional listener options.
 * Example usage:
 *
 * ```tsx
 * <div
 *   on:click={e => {
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
 *
 * Custom events are fully supported, however with TypeScript, their typings must first be added to
 * the global `GlobalEventHandlersEventMap` type via interface merging:
 *
 * ```tsx
 * declare global {
 *   interface GlobalEventHandlersEventMap {
 *     "my-event": Event & { myValue: string };
 *   }
 * }
 *
 * // once declared, custom events become available and fully typed:
 * <div on:my-event={e => { console.log(e.myValue) }} />
 * ```
 */
export const EventExtension = extension<Node, EventPropMapping>((node, prop, value) => {
	// see if listener options have been given
	type ListenerAtom = MaybeReadAtom<Nil<(e: unknown) => unknown>>;
	let listenerAtom = value as ListenerAtom;
	let options: AddEventListenerOptions | undefined;

	const maybeOptions = peek(value);
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

	node.addEventListener(prop, listenerWithLifecycle, options);
	lifecycle.$events.push({
		$f: listenerWithLifecycle,
		$n: node,
		$e: prop,
		$o: options,
	});
});


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
	$n: Node;
	$e: string;
	$o?: AddEventListenerOptions;
}
