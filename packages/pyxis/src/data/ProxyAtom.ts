import type { Nil } from "~/support/types";
import { S_ATOM } from "~/symbols";

import { isAtom, notifyAtomObservers, type Atom, type MaybeAtom } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { getLifecycle, type Lifecycle } from "./Lifecycle";
import { scheduleTick } from "./Scheduler";

export interface ProxyAtom<T> extends Atom<T> {
	/**
	 * Binds this ProxyAtom to a new value. If it is an Atom, the proxy will mirror it, otherwise it
	 * will be a read-only atom with a static value until rebound.
	 */
	use(value: MaybeAtom<T>): void;

	/** @internal */
	use(value: MaybeAtom<T>, canNotify?: boolean): void;


	/** @internal */
	$dep?: Dependency;

	/** @internal */
	$upstream?: Nil<Atom<T>>;

	/** @internal */
	$value?: Nil<T>;
}

/**
 * Creates a ProxyAtom bound to the provided initial value. If it is an Atom, the proxy will mirror
 * it, otherwise it will be a read-only atom with a static value until rebound via its `use` method.
 */
export function proxyOf<T>(initialValue: MaybeAtom<T>, lifecycle = getLifecycle()): ProxyAtom<T> {
	// `set` is assigned by the use call below
	const self: Omit<ProxyAtom<T>, "set"> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		use,
		get: getStaticValue,
	};

	self.use(initialValue, false);
	return self as ProxyAtom<T>;
}

function use<T>(this: ProxyAtom<T>, value: MaybeAtom<T>, canNotify: boolean = true) {
	if (this.$dep) {
		unlink(this.$dep);
	}

	const oldValue = this.get();
	if (isAtom(value)) {
		this.$upstream = value;
		this.$value = null;
		this.$tracksValue = false;
		this.get = getUpstreamValue;
		this.set = setUpstreamValue;
		link(this.$lifecycle, value, this.$dep ??= {
			$fn: notifyAtomObservers<T>,
			$a0: this,
		});
	}
	else {
		this.$upstream = null;
		this.$value = value;
		this.$tracksValue = true;
		this.$lastValue = oldValue;
		this.get = getStaticValue;
		this.set = setStaticValue;
	}

	if (canNotify && !Object.is(oldValue, this.get()) && this.$dh) {
		scheduleTick(this.$lifecycle, this.$notify ??= {
			$fn: notifyAtomObservers,
			$a0: this,
		});
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
		scheduleTick(atom.$lifecycle, atom.$notify ??= {
			$fn: notifyAtomObservers,
			$a0: atom,
		});
	}

	// always return false, even if the upstream atom changed - this way the `write` and `update`
	// functions won't schedule a redundant notification for this proxy
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

const EMPTY_SOURCE: Record<PropertyKey, unknown> = {};

/**
 * Copies select keys from a data object into a new object where values are all wrapped in
 * ProxyAtoms and can be updated later.
 * @see {@link updateProxy}
 * @internal
 **/
export function createProxy(lifecycle: Lifecycle, data: any, keys: readonly PropertyKey[]) {
	const source = isObject(data) ? data : EMPTY_SOURCE;
	const proxy = {} as ProxyObject;
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
	const source = isObject(data) ? data : EMPTY_SOURCE;
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
