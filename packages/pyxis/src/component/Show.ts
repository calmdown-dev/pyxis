import { isAtom, read, type MaybeAtom, type Atom } from "~/data/Atom";
import { link } from "~/data/Dependency";
import { effect } from "~/data/Effect";
import { createProxy, updateProxy, type Proxied, type ProxyObject } from "~/data/ProxyAtom";
import { mountTemplate } from "~/support/template";
import type { Nil } from "~/support/types";
import type { DataTemplate, JsxChildren, JsxObject, JsxProps, JsxResult } from "~/Component";
import { flush, fork, insert, mountJsx, unmount, type HNode } from "~/Renderer";

export interface ShowProps {
	when?: MaybeAtom<boolean>;
	children: JsxChildren;
}

export interface ShowDataProps<T> {
	when?: MaybeAtom<boolean>;
	proxy?: never;
	data: MaybeAtom<T>;
	children: [ template: DataTemplate<T> | Atom<Nil<DataTemplate<T>>> ];
}

export interface ShowProxyDataProps<T, P extends readonly (keyof T)[]> {
	when?: MaybeAtom<boolean>;
	proxy: P & ("proxied" extends P[number] ? never : unknown);
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

export function Show<TNode>(
	props: JsxObject,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	const when = props.when as MaybeAtom<boolean> | undefined;
	if (!isAtom(when) && when === false) {
		// when is statically set to false -> bail out early
		return;
	}

	const { children, data } = props;
	const proxyKeys = props.proxy as readonly PropertyKey[] | undefined;
	const template: MaybeAtom<(data: any) => any> = Object.hasOwn(props, "data")
		? children[0] as MaybeAtom<DataTemplate<any>> // enforced by overload typings
		: () => children;

	let dataOrProxy: unknown = data;
	if (proxyKeys) {
		if (isAtom(data)) {
			dataOrProxy = createProxy(hParent.$ng, data.get(), proxyKeys);
			link(hParent.$ng, data, {
				$fn: () => {
					updateProxy(dataOrProxy as ProxyObject, data.get(), proxyKeys);
				},
			});
		}
		else {
			dataOrProxy = createProxy(hParent.$ng, data, proxyKeys);
		}
	}

	// prepare batching
	const adapter = hParent.$ng.adapter;
	const shouldBatch = !!adapter.batch;

	// a sub-group for re-mounting is only necessary when either:
	// - `when` can change
	// - `template` can change
	// - `data` can change and we're not using a proxy

	if (!(isAtom(when) || isAtom(template) || (!proxyKeys && isAtom(data)))) {
		const isLocalBatch = shouldBatch && !isBatch;
		let nBatchParent = nUsedParent;
		let nBatchBefore = nBefore;
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
			nBatchBefore = null;
		}

		mountJsx(
			/* jsx = */ template(dataOrProxy),
			/* hParent = */ hParent,
			/* nUsedParent = */ nBatchParent,
			/* nRealParent = */ nRealParent,
			/* nBefore = */ nBatchBefore,
			/* isBatch = */ isLocalBatch || isBatch,
		);

		if (isLocalBatch) {
			adapter.insert(nBatchParent, nUsedParent, nBefore);
		}

		return;
	}

	// re-mounts may be necessary -> create a sub-group
	const hGroup = fork(hParent);

	// (re-)render effect
	let nMarker: TNode | null = nBefore;
	effect(() => {
		if (read(when) === false) {
			return undefined;
		}

		const isLocalBatch = shouldBatch && !isBatch;
		let nBatchParent = nUsedParent;
		let nBatchBefore = nMarker;
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
			nBatchBefore = null;
		}

		mountTemplate(
			/* template = */ read(template),
			/* data = */ read(dataOrProxy),
			/* hGroup = */ hGroup,
			/* nUsedParent = */ nBatchParent,
			/* nRealParent = */ nRealParent,
			/* nBefore = */ nBatchBefore,
			/* isBatch = */ isLocalBatch || isBatch,
		);

		if (isLocalBatch) {
			adapter.insert(nBatchParent, nUsedParent, nMarker);
			try {
				flush(hGroup);
			}
			catch (ex) {
				unmount(hGroup, [ ex ]);
			}
		}

		return () => unmount(hGroup);
	}, hParent.$ng);

	// insert marker to preserve position in the document
	nMarker = __DEV__ ? adapter.marker("/Show") : adapter.marker();
	insert(
		/* hNode = */ nMarker,
		/* children = */ null,
		/* hParent = */ hParent,
		/* nUsedParent = */ nUsedParent,
		/* nBefore = */ nBefore,
		/* isBatch = */ isBatch,
	);

	// forget stale batch before future re-renders
	isBatch = false;
	nUsedParent = nRealParent;
}
