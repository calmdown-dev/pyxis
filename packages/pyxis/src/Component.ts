import type { MaybeAtom } from "~/data/Atom";
import { onceUnmounted } from "~/data/Lifecycle";
import type { Nil, PropsType } from "~/support/types";

import { mount, mountJsx, fork, unmount, type HNode, insert } from "./Renderer";
import { runtime } from "./Runtime";
import { S_COMPONENT, S_DEV_INFO, S_TAG_NAME } from "./symbols";

/**
 * Represents a Pyxis Component function responsible for setting up a view model and returning a
 * chunk of JSX to be rendered.
 */
export interface Component<TProps extends PropsType = {}> {
	(props: TProps): JsxResult;
}

export type PropsOf<T> = T extends Component<infer TProps> ? TProps : unknown;

/**
 * Represents a template function returning a chunk of JSX to be rendered with specific input data.
 */
export interface DataTemplate<TData> {
	(data: TData): JsxResult;
}

export interface ComponentBlock {
	(props: PropsType): JsxResult;
}

export function component<TPropsArg extends [ {} ]>(
	block: (...args: TPropsArg) => JsxResult,
	devId?: string,
): (...args: [ props: JsxProps<TPropsArg[0]> ]) => JsxResult;

/*@__NO_SIDE_EFFECTS__*/
export function component(
	block: ComponentBlock,
): ComponentHandler {
	let devId: string | undefined; // gets removed by bundler in production
	if (__DEV__) {
		devId = arguments[1];
		devId && runtime.$hmrComponent!.upsert(devId, block);
	}

	return (props, hParent, hBefore, nUsedParent, nRealParent, isBatch) => {
		const capturedContext = runtime.$currentContext;
		const capturedContextNew = runtime.$currentContextNew;
		try {
			if (__DEV__) {
				if (!import.meta.hot || !devId) {
					mountJsx(__DEV__evalComponent(block, props), hParent, hBefore, nUsedParent, nRealParent, isBatch);
					return;
				}

				const hGroup = fork(hParent, hBefore);
				let hMarker = hBefore;

				const unsubscribe = runtime.$hmrComponent!.subscribe(devId, impl => {
					unmount(hGroup);
					mount(
						/* jsx = */ {
							...props,
							[S_COMPONENT]: (() => (
								mountJsx(__DEV__evalComponent(impl, props), hGroup, hMarker, nUsedParent, nRealParent, isBatch)
							)) satisfies ComponentHandler,
						},
						/* hParent = */ hGroup,
						/* hBefore = */ hMarker,
						/* nUsedParent = */ nUsedParent,
						/* nRealParent = */ nRealParent,
						/* isBatch = */ isBatch,
					);
				});

				onceUnmounted(hParent.$ng, { fn: unsubscribe });

				// Initial content renders before the marker, matching Show's batching order.
				hMarker = insert(hGroup.adapter.marker(`/${devId}`), null, hParent, hBefore, nUsedParent, isBatch, true);

				// forget stale batch before future re-renders
				nUsedParent = nRealParent;
				isBatch = false;
			}
			else {
				runtime.$currentContextNew = false; // reset context container
				mountJsx(block(props), hParent, hBefore, nUsedParent, nRealParent, isBatch);
			}
		}
		finally {
			// reset back to this Component's container, prevents leakage of branched off child contexts
			runtime.$currentContext = capturedContext;
			runtime.$currentContextNew = capturedContextNew;
		}
	};
}

function __DEV__evalComponent(block: ComponentBlock, props: JsxObject) {
	const prevLifecycle = runtime.$componentEvalLifecycle ?? null;
	const prevEffect = runtime.$componentEvalEffect ?? null;
	runtime.$componentEvalLifecycle = runtime.$currentLifecycle;
	runtime.$componentEvalEffect = runtime.$currentEffect;
	runtime.$currentContextNew = false; // reset context container
	try {
		return block(props);
	}
	finally {
		runtime.$componentEvalLifecycle = prevLifecycle;
		runtime.$componentEvalEffect = prevEffect;
	}
}

export function __DEV__assertIsDirectComponentCode(fn: string) {
	if (!runtime.$componentEvalLifecycle || runtime.$componentEvalLifecycle !== runtime.$currentLifecycle) {
		throw new Error(`"${fn}" can only be used directly within components.`);
	}

	if (runtime.$componentEvalEffect !== runtime.$currentEffect) {
		throw new Error(`"${fn}" cannot be used within effects or derivations.`);
	}
}

/**
 * Infers the props object for use with JSX. Because Pyxis always supplies components with child
 * arrays (or tuples), the type needs to be adjusted to reflect the internal mechanics.
 */
export type JsxProps<T> =
	& { readonly [K in keyof T]: K extends "children" ? JsxChildrenProp<T[K]> : T[K] }
	& ("children" extends keyof T ? {} : { readonly children?: [] });

/**
 * When typing children as a single value tuple, it becomes unusable in 'react-jsx' mode. TS rejects
 * valid uses of such components with the error: "This JSX tag's children prop expects type '[T]'
 * which requires multiple children, but only a single child was provided."
 *
 * Likely related to the fact that single children are passed to jsx() factory without wrapping
 * arrays.
 *
 * This utility type unwraps single value tuples, avoiding the problem.
 */
export type JsxChildrenProp<T> = T extends readonly [ any, any, ...any[] ]
	// component requires 2+ children, safe to pass the type as-is, just attach the readonly modifier
	? T extends readonly [ ...infer C ]
		? readonly [ ...C ]
		: T
	: T extends readonly [ infer SC ]
		// component requires a single child, unwrap the tuple
		? SC
		: T extends readonly (infer C)[]
			// component requires any number of children, pass as-is, but also append the unwrapped
			// type to allow single child use
			? readonly C[] | C
			// children typed as a non-array type, pass as-is
			: T;

/**
 * Primitive values (or Atoms of such primitives) accepted as text children. Nil and boolean values
 * do not render any text.
 */
export type JsxText = MaybeAtom<Nil<string | number | boolean | bigint>>;

/**
 * Describes the objects returned by JSX factories.
 *
 * Pyxis uses lightweight factories returning the props object directly, only adding a few extra
 * symbol-keyed props.
 */
export interface JsxObject {
	[propName: string]: unknown;

	/** specifies the ComponentHandler function used to render this object */
	readonly [S_COMPONENT]: ComponentHandler;

	/** specifies the native element tag name, only populated for native elements */
	readonly [S_TAG_NAME]?: string;

	/** holds source code location of individual JSX nodes, only populated in dev mode */
	readonly [S_DEV_INFO]?: JsxDevSourceInfo;

	/** always present and always an array, empty array for childless components */
	readonly children: readonly unknown[];
}

export interface JsxDevSourceInfo {
	readonly fileName: string;
	readonly lineNumber: number;
	readonly columnNumber: number;
}

/**
 * Union of all admissible values within JSX.
 */
export type JsxResult = JsxObject | JsxText;

/**
 * The type of JSX elements accepted as individual children by common components.
 */
export type JsxChildren = JsxResult | readonly JsxChildren[];

/**
 * Utility type adding the standard `children` prop to the given props type.
 */
export type WithChildren<T extends PropsType> = T & { children?: JsxChildren };

/**
 * A handler function rendering a specific Component type. This is the real shape of Pyxis
 * components used internally by the framework. `hBefore` is a tracked native anchor. When
 * `isBatch` is true, native insertions append while `hBefore` still determines the position in the
 * tracking hierarchy.
 */
export interface ComponentHandler {
	<TNode>(
		jsx: JsxObject,
		hParent: HNode<TNode>,
		hBefore: HNode<TNode> | null,
		nUsedParent: TNode,
		nRealParent: TNode,
		isBatch: boolean,
	): void;
}

// Required base typings for JSX; Element and IntrinsicElements are supplied by adapter libraries
// or user code when using prefixed extensions
declare global {
	namespace JSX {
		interface ElementChildrenAttribute {
			children: {};
		}
	}
}
