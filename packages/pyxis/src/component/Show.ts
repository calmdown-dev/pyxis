import { isAtom, read, type MaybeAtom, type Atom } from "~/data/Atom";
import { link } from "~/data/Dependency";
import { effect } from "~/data/Effect";
import { createProxy, updateProxy, type Proxied, type ProxyObject } from "~/data/ProxyAtom";
import { mountTemplate } from "~/support/template";
import type { Nil } from "~/support/types";
import type { DataTemplate, JsxChildren, JsxObject, JsxProps, JsxResult } from "~/Component";
import { flush, fork, insert, mountJsx, unmount, willMount, type HNode } from "~/Renderer";

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
	hBefore: HNode<TNode> | null,
	nUsedParent: TNode,
	nRealParent: TNode,
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
				fn: updateShowProxy,
				a0: dataOrProxy as ProxyObject,
				a1: data,
				a2: proxyKeys,
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
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
		}

		mountJsx(
			/* jsx = */ template(dataOrProxy),
			/* hParent = */ hParent,
			/* hBefore = */ hBefore,
			/* nUsedParent = */ nBatchParent,
			/* nRealParent = */ nRealParent,
			/* isBatch = */ isLocalBatch || isBatch,
		);

		if (isLocalBatch) {
			adapter.insert(nBatchParent, nUsedParent, hBefore?.$nn ?? null);
		}

		return;
	}

	// re-mounts may be necessary -> create a sub-group
	const hGroup = fork(hParent, hBefore);
	const dispose = () => unmount(hGroup);

	// (re-)render effect
	let hMarker: HNode<TNode> | null = hBefore;
	effect(willMount(hGroup, () => {
		if (read(when) === false) {
			return undefined;
		}

		const isLocalBatch = shouldBatch && !isBatch;
		let nBatchParent = nUsedParent;
		if (isLocalBatch) {
			nBatchParent = adapter.batch!();
		}

		mountTemplate(
			/* template = */ read(template),
			/* data = */ read(dataOrProxy),
			/* hParent = */ hGroup,
			/* hBefore = */ hMarker,
			/* nUsedParent = */ nBatchParent,
			/* nRealParent = */ nRealParent,
			/* isBatch = */ isLocalBatch || isBatch,
		);

		if (isLocalBatch) {
			adapter.insert(nBatchParent, nUsedParent, hMarker?.$nn ?? null);
			try {
				flush(hGroup);
			}
			catch (ex) {
				unmount(hGroup, [ ex ]);
			}
		}

		return dispose;
	}), hParent.$ng);

	// insert marker to preserve position in the document
	hMarker = insert(
		/* hNode = */ __DEV__ ? adapter.marker("/Show") : adapter.marker(),
		/* children = */ null,
		/* hParent = */ hParent,
		/* hBefore = */ hBefore,
		/* nUsedParent = */ nUsedParent,
		/* isBatch = */ isBatch,
		/* forceTrack = */ true,
	);

	// forget stale batch before future re-renders
	isBatch = false;
	nUsedParent = nRealParent;
}

function updateShowProxy(proxy: ProxyObject, source: Atom, keys: readonly PropertyKey[]) {
	updateProxy(proxy, source.get(), keys);
}
