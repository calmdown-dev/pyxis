import { UNIQUE_VALUE } from "~/support/common";
import type { Nil } from "~/support/types";
import { S_ATOM } from "~/symbols";

import { isAtom, scheduleAtomNotification, type MaybeAtom, type WriteAtom } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { getLifecycle, type Lifecycle } from "./Lifecycle";

export interface ProxyAtom<T> extends WriteAtom<T> {
	/**
	 * Binds this ProxyAtom to a new value. If it is an Atom, the proxy will mirror it, otherwise it
	 * will be a read-only atom with a static value until rebound.
	 * Binding a proxy to itself throws in development and is ignored in production.
	 */
	use(value: MaybeAtom<T>): void;

	/** @internal */
	use(value: MaybeAtom<T>, isInit?: boolean): void;

	/** @internal */
	$dep?: Dependency;

	/** @internal */
	$upstream?: Nil<WriteAtom<T>>;

	/** @internal */
	$value?: Nil<T>;
}

/**
 * Creates a ProxyAtom bound to the provided initial value. If it is an Atom, the proxy will mirror
 * it, otherwise it will be a read-only atom with a static value until rebound via its `use` method.
 */
export function proxyOf<T>(initialValue: MaybeAtom<T>, lifecycle = getLifecycle()): ProxyAtom<T> {
	// `set` is assigned by the use call below
	const self: Omit<ProxyAtom<T>, "get" | "set"> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		use,
	};

	self.use(initialValue, true);
	return self as ProxyAtom<T>;
}

function use<T>(this: ProxyAtom<T>, value: MaybeAtom<T>, isInit: boolean = false) {
	if (value === this) {
		if (__DEV__) {
			throw new Error("ProxyAtom cannot proxy itself");
		}

		return;
	}

	const upstream = this.$upstream;
	if (upstream && upstream === value) {
		// value is an Atom and we're already forwarding it, nothing to do
		return;
	}

	let shouldNotify = true;
	if (isAtom(value)) {
		if (!upstream || isInit) {
			// switching from static to forwarding mode
			this.$value = null;
			this.$tracksValue = false;
			this.$lastValue = null!;
			this.get = getUpstreamValue;
			this.set = setUpstreamValue;
		}
		else {
			// staying in forwarding mode, but re-linking to a different Atom
			unlink(this.$dep!);
		}

		// all Atoms actually implement the WriteAtom interface
		this.$upstream = value as WriteAtom<T>;
		link(this.$lifecycle, value, this.$dep ??= {
			$fn: scheduleAtomNotification,
			$a0: this,
		});
	}
	else {
		if (upstream || isInit) {
			// switching from forwarding to static mode
			this.$upstream = null;
			this.$tracksValue = true;
			this.$lastValue = UNIQUE_VALUE;
			this.get = getStaticValue;
			this.set = setStaticValue;

			if (!isInit) {
				unlink(this.$dep!);
			}
		}
		else {
			// staying in static mode, notification may be skipped if the value didn't change
			shouldNotify = !Object.is(this.$value, value);
		}

		this.$value = value;
	}

	if (this.$dh) {
		if (shouldNotify) {
			scheduleAtomNotification(this);
		}
	}
	else if (this.$tracksValue) {
		this.$lastValue = value as any;
	}
}

function getUpstreamValue<T>(this: ProxyAtom<T>) {
	// Calling raw `get` doesn't report access, which is what we want here. Sites accessing this
	// proxy atom would do so via `read`, which then reports access on this proxy rather than the
	// upstream atom, which may change
	return this.$upstream!.get();
}

function setUpstreamValue<T>(this: ProxyAtom<T>, value: T) {
	// set the upstream atom and schedule a notification if it changed - copies the behavior of
	// `write`, skipping parts we don't need here
	const atom = this.$upstream!;
	if (atom.set(value) && atom.$dh) {
		scheduleAtomNotification(atom);
	}

	// Always return false, even if the upstream changed. This way, `write` and `update` functions
	// don't schedule notifications, which is desirable. The proxy forwards notifications from the
	// upstream Atom, which will have one already scheduled if the value changed.
	return false;
}

function getStaticValue<T>(this: ProxyAtom<T>) {
	return this.$value!;
}

function setStaticValue(this: ProxyAtom<any>) {
	return false;
}

/** @internal */
export type ProxyObject =
	& { proxied: any }
	& { [_ in PropertyKey]?: ProxyAtom<any> };

export type Proxied<T, P extends readonly (keyof T)[]> =
	& { readonly proxied: T }
	& { readonly [K in P[number]]: ProxyAtom<T[K] extends MaybeAtom<infer V> ? V : T[K]> };

/**
 * Copies select keys from a data object into a new object where values are all wrapped in
 * ProxyAtoms and can be updated later.
 * @see {@link updateProxy}
 * @internal
 **/
export function createProxy(lifecycle: Lifecycle, data: any, keys: readonly PropertyKey[]) {
	const source: Record<PropertyKey, unknown> = isObject(data) ? data : UNIQUE_VALUE;
	const proxy = Object.create(null) as ProxyObject;
	const { length } = keys;

	let index = 0;
	let key;

	for (; index < length; index += 1) {
		key = keys[index];
		proxy[key] = proxyOf(source[key], lifecycle);
	}

	proxy.proxied = data;
	return proxy;
}

/**
 * Updates the values proxied by a previously created proxy object. The keys array must be the same
 * as was used during creation (or a subset).
 * @see {@link createProxy}
 * @internal
 **/
export function updateProxy(proxy: ProxyObject, data: any, keys: readonly PropertyKey[]) {
	const source: Record<PropertyKey, unknown> = isObject(data) ? data : UNIQUE_VALUE;
	const { length } = keys;
	proxy.proxied = data;

	let index = 0;
	let key;

	for (; index < length; index += 1) {
		key = keys[index];
		proxy[key]!.use(source[key]);
	}
}

function isObject(value: unknown): value is Record<PropertyKey, unknown> {
	return value !== null && typeof value === "object";
}
