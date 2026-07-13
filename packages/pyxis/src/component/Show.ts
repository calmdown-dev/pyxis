import { isAtom, peek, read, type Atom, type MaybeAtom } from "~/data/Atom";
import { link } from "~/data/Dependency";
import { effect } from "~/data/Effect";
import { withLifecycle } from "~/data/Lifecycle";
import { createProxy, updateProxy, type Proxied, type ProxyObject } from "~/data/ProxyAtom";
import type { Nil } from "~/support/types";
import type { DataTemplate, JsxChildren, JsxObject, JsxProps, JsxResult } from "~/Component";
import { mount, mountJsx, split, unmount, type HierarchyNode } from "~/Renderer";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: JsxChildren;
}

export interface ShowDataProps<T> {
	when?: MaybeAtom<boolean>;
	proxy?: never; // discriminator
	data: MaybeAtom<T>;
	children: [ template: DataTemplate<T> | Atom<Nil<DataTemplate<T>>> ];
}

export interface ShowProxyDataProps<T, P extends readonly (keyof T)[]> {
	when?: MaybeAtom<boolean>;
	proxy: P;
	data: MaybeAtom<T>;
	children: [ template: DataTemplate<Proxied<T, P>> | Atom<Nil<DataTemplate<Proxied<T, P>>>> ];
}

/**
 * The built-in Show Component dynamically mounting and unmounting a Template
 * based on a reactive condition result.
 */
// @ts-expect-error fake overload to enable use with JSX
export function Show(props: JsxProps<ShowProps>): JsxResult;
export function Show<T>(props: JsxProps<ShowDataProps<T>>): JsxResult;
export function Show<T, P extends readonly (keyof T)[]>(props: JsxProps<ShowProxyDataProps<T, P>>): JsxResult;

/** @internal */
export function Show<TNode>(
	jsx: JsxObject,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
): void;

export function Show<TNode>(
	jsx: JsxObject,
	parent: HierarchyNode<TNode>,
	before: TNode | null,
) {
	const when = jsx.when as MaybeAtom<boolean> | undefined;
	if (!isAtom(when) && when === false) {
		// when is statically set to false -> bail out early
		return;
	}

	const { children, data } = jsx;
	const proxyKeys = jsx.proxy as readonly PropertyKey[] | undefined;
	const template: MaybeAtom<(data: any) => any> = Object.hasOwn(jsx, "data")
		? children[0] as MaybeAtom<DataTemplate<any>> // enforced by overload typings
		: () => children;

	// a sub-group for re-mounting is only necessary when either:
	// - `when` can change
	// - `template` can change
	// - `data` can change and we're not using a proxy

	let dataOrProxy: unknown = data;
	if (!(isAtom(when) || isAtom(template) || (!proxyKeys && isAtom(data)))) {
		if (proxyKeys) {
			dataOrProxy = createProxy(parent.$ng, peek(data), proxyKeys);
		}

		mountJsx(withLifecycle(parent.$ng, template, dataOrProxy), parent, before);
		return;
	}

	// re-mounts may be necessary -> create a sub-group
	const group = split(parent);

	// init a proxy if requested
	if (proxyKeys) {
		if (isAtom(data)) {
			dataOrProxy = createProxy(parent.$ng, data.$get(), proxyKeys);
			link(parent.$ng, data, {
				$fn: () => {
					updateProxy(dataOrProxy as ProxyObject, data.$get(), proxyKeys);
				},
			});
		}
		else {
			dataOrProxy = createProxy(parent.$ng, data, proxyKeys);
		}
	}

	// (re-)render effect
	effect(() => {
		if (read(when) === false) {
			return undefined;
		}

		mount(group, withLifecycle(group, read(template), read(dataOrProxy)));
		return () => unmount(group);
	}, parent.$ng);
}
