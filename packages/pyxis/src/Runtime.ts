import type { ContextContainer } from "./data/Context";
import type { Effect } from "./data/Effect";
import type { Lifecycle } from "./data/Lifecycle";
import type { ComponentRegistry } from "./dev/ComponentRegistry";
import type { StateRegistry } from "./dev/StateRegistry";
import { S_RUNTIME } from "./symbols";

export interface Runtime {
	/** current lifecycle */
	l: Lifecycle | null;

	/** current effect */
	e: Effect<any> | null;

	/** current context container */
	c: ContextContainer | null;

	/** is new context container */
	n: boolean;

	/** hot module reload registries, only populated in dev builds */
	hmr?: HotReload;
}

export interface HotReload {
	readonly component: ComponentRegistry;
	readonly state: StateRegistry;
}

// @ts-ignore-error
export const runtime: Runtime = (globalThis[S_RUNTIME] ??= {
	l: null,
	e: null,
	c: null,
	n: false,
});
