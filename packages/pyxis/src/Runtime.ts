import type { ContextContainer } from "./data/Context";
import type { Effect } from "./data/Effect";
import type { Lifecycle } from "./data/Lifecycle";
import type { ComponentRegistry } from "./dev/ComponentRegistry";
import type { StateRegistry } from "./dev/StateRegistry";
import type { Extension } from "./Adapter";
import { S_RUNTIME } from "./symbols";

export interface Runtime {
	/** routing for extension props applied by reference (via the `ext` utility) */
	readonly x: { [K in string]?: ExtensionPropDestination };

	/** auto-increment index used to assign unique keys to extensions */
	i: number;

	/** the current Lifecycle */
	l: Lifecycle | null;

	/** the currently running Effect */
	e: Effect<any> | null;

	/** the current ContextContainer */
	c: ContextContainer | null;

	/**
	 * whether the current context container {@link c} (if any) was newly created within the
	 * current component
	 */
	n: boolean;

	/** hot module reload registry for components, only populated in dev builds */
	hmrComponent?: ComponentRegistry;

	/** hot module reload registry for atom state, only populated in dev builds */
	hmrState?: StateRegistry;
}

export interface ExtensionPropDestination {
	readonly $ext: Extension<any>;
	readonly $prop: string;
}

// @ts-ignore-error
export const runtime: Runtime = (globalThis[S_RUNTIME] ??= {
	x: {},
	i: 0,
	l: null,
	e: null,
	c: null,
	n: false,
} satisfies Runtime);
