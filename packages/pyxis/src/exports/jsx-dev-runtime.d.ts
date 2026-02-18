import type { Component, Fragment, JsxResult, PropsType } from "@calmdown/pyxis/core";

export interface DevSourceInfo {
	readonly fileName: string;
	readonly lineNumber: number;
	readonly columnNumber: number;
}

export const S_DEV_INFO: unique symbol;

export function jsxDEV(
	tagName: string,
	props: PropsType,
	key?: any,
	isStaticChildren?: boolean,
	source?: DevSourceInfo,
	self?: any,
): JsxResult;

export function jsxDEV<TProps extends PropsType>(
	tagName: Component<TProps>,
	props: PropsType,
	key?: any,
	isStaticChildren?: boolean,
	source?: DevSourceInfo,
	self?: any,
): JsxResult;

export { Fragment };
