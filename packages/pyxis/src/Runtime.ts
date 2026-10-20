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
	$extIndex: number;

	/** the current Lifecycle */
	$currentLifecycle: Lifecycle | null;

	/** the currently running Effect */
	$currentEffect: Effect<any> | null;

	/** the current ContextContainer */
	$currentContext: ContextContainer | null;

	/**
	 * whether the current context container {@link $currentContext} (if any) was newly created within the
	 * current component
	 */
	$currentContextNew: boolean;

	/** hot module reload registry for components, only used in dev builds */
	$hmrComponent?: ComponentRegistry;

	/** hot module reload registry for atom state, only used in dev builds */
	$hmrState?: StateRegistry;

	/** when running component code, tracks the Lifecycle given to that component, only used in dev builds */
	$componentEvalLifecycle?: Lifecycle | null;

	/** when running component code, tracks the Effect (if any) within which it's running, only used in dev builds */
	$componentEvalEffect?: Effect<any> | null;
}

export interface ExtensionPropDestination {
	readonly $ext: Extension<any>;
	readonly $prop: string;
}

// @ts-ignore-error
export const runtime: Runtime = (globalThis[S_RUNTIME] ??= {
	x: {},
	$extIndex: 0,
	$currentLifecycle: null,
	$currentEffect: null,
	$currentContext: null,
	$currentContextNew: false,
} satisfies Runtime);
