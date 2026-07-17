import type { S_TAG_NAME } from "~/component/Native";
import type { MaybeReadonlyAtom } from "~/data/Atom";
import { getContextContainer, setContextContainer } from "~/data/Context";
import { unmounted } from "~/data/Lifecycle";
import type { Nil, PropsType } from "~/support/types";

import { mount, mountJsx, S_COMPONENT, fork, unmount, type HNode, insert } from "./Renderer";

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

export function component(
	block: ComponentBlock,
): ComponentHandler {
	let devId: string | undefined; // gets removed by bundler in production
	if (__DEV__) {
		devId = arguments[1];
		devId && globalThis.__PYXIS_HMR__.component.upsert(devId, block);
	}

	return (jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch) => {
		const context = getContextContainer();
		try {
			if (__DEV__) {
				if (!import.meta.hot || !devId) {
					setContextContainer(context); // allow child components to branch context
					mountJsx(block(jsx), hParent, nUsedParent, nRealParent, nBefore, isBatch);
					return;
				}

				const hGroup = fork(hParent);
				const nMarker = hGroup.adapter.marker(`/${devId}`);
				insert(nMarker, null, hParent, nUsedParent, nBefore, isBatch);

				const unsubscribe = globalThis.__PYXIS_HMR__.component.subscribe(devId, impl => {
					unmount(hGroup);
					mount(
						/* jsx = */ {
							...jsx,
							[S_COMPONENT]: (() => (
								mountJsx(impl(jsx), hGroup, nUsedParent, nRealParent, nMarker, isBatch)
							)) satisfies ComponentHandler,
						},
						/* hGroup = */ hGroup,
						/* nUsedParent = */ nUsedParent,
						/* nRealParent = */ nRealParent,
						/* nBefore = */ nMarker,
						/* isBatch = */ isBatch,
					);
				});

				unmounted(unsubscribe);

				// forget stale batch before future re-renders
				nUsedParent = nRealParent;
				isBatch = false;
			}
			else {
				setContextContainer(context); // allow child components to branch context
				mountJsx(block(jsx), hParent, nUsedParent, nRealParent, nBefore, isBatch);
			}
		}
		finally {
			// reset back to this Component's container, prevents leakage of branched off child contexts
			setContextContainer(context);
		}
	};
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
 * Primitive types accepted to render as text.
 */
export type JsxText = MaybeReadonlyAtom<Nil<string | number | boolean | bigint>>;

/**
 * Describes the objects returned by JSX factories.
 *
 * Pyxis uses very lightweight factories returning the props object directly,
 * adding a few extra props:
 *
 * - S_COMPONENT ... hidden, contains a reference to the ComponentHandler function
 * - S_TAG_NAME ... hidden, specifies the tag name, only populated for native elements
 * - children ... always present and always an array, empty array for childless components
 */
export interface JsxObject {
	[propName: string]: unknown;
	readonly children: readonly unknown[];

	/** @internal */
	readonly [S_COMPONENT]: ComponentHandler;

	/** @internal */
	readonly [S_TAG_NAME]?: string;
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

/** @internal */
export interface ComponentHandler {
	<TNode>(
		jsx: JsxObject,
		hParent: HNode<TNode>,
		nUsedParent: TNode,
		nRealParent: TNode,
		nBefore: TNode | null,
		isBatch: boolean,
	): void;
}
