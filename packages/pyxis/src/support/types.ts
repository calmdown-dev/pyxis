/**
 * Puts `T` into a union with `null` and `undefined`.
 */
export type Nil<T> = T | null | undefined;

/**
 * A type describing any map of intrinsic elements and their props.
 */
export type ElementsType = { readonly [_ in string]?: any };

/**
 * A type describing any props of a Component.
 */
export type PropsType = { readonly [_ in string]?: any };

/**
 * A symbol to include in props typings containing the original Node type.
 * @deprecated **Type only, does not exist at runtime!**
 */
export declare const S_NODE_TYPE: unique symbol;

/**
 * Infers the specific Node type from its props typings, if available.
 */
export type NodeType<P> = P extends { readonly [S_NODE_TYPE]?: infer N } ? N : unknown;

/**
 * A symbol to include in props typings containing the element name.
 * @deprecated **Type only, does not exist at runtime!**
 */
export declare const S_ELEM_NAME: unique symbol;

/**
 * Infers the specific element name from its props typings, if available.
 */
export type ElemName<P> = P extends { readonly [S_ELEM_NAME]?: infer N extends string } ? N : string;

/**
 * Infers a mutable object from a given immutable one.
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/**
 * A tuple of up to 3 arguments.
 */
export type ArgsMax3<A0 = any, A1 = any, A2 = any> = [ a0?: A0, a1?: A1, a2?: A2 ];

/**
 * Describes a callback with up to two stored arguments.
 */
export interface Callback<TArgs extends ArgsMax3 = ArgsMax3, TReturn = void> {
	/** @internal */
	$fn: (this: any, ...args: TArgs) => TReturn;

	/** @internal */
	$a0?: TArgs[0];

	/** @internal */
	$a1?: TArgs[1];

	/** @internal */
	$a2?: TArgs[2];
}
