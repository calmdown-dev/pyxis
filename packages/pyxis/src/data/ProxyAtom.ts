import type { Nil } from "~/support/types";

import { isAtom, notify, S_ATOM, type Atom, type MaybeAtom } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { __DEV__assertNotEffect } from "./Effect";
import { getLifecycle } from "./Lifecycle";
import { schedule } from "./Scheduler";

export interface ProxyAtom<T> extends Atom<T> {
	/**
	 * Binds this ProxyAtom to a new value. If it is an Atom, the proxy will mirror it, otherwise it
	 * will be a read-only atom with a static value until rebound.
	 */
	use: (value: MaybeAtom<T>) => void;

	/** @internal */
	$dep?: Dependency;

	/** @internal */
	$bound?: Nil<Atom<T>>;

	/** @internal */
	$value?: Nil<T>;
}

/**
 * Creates a ProxyAtom bound to the provided initial value. If it is an Atom, the proxy will mirror
 * it, otherwise it will be a read-only atom with a static value until rebound.
 */
export function proxyOf<T>(initialValue: MaybeAtom<T>, lifecycle = getLifecycle()): ProxyAtom<T> {
	if (__DEV__) {
		__DEV__assertNotEffect();
	}

	// $set is assigned by the use call below
	const self: Omit<ProxyAtom<T>, "$set"> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		use,
		$get: getStaticValue,
	};

	// @ts-expect-error canNotify=false hidden by public API
	self.use(initialValue, false);
	return self as ProxyAtom<T>;
}

function use<T>(this: ProxyAtom<T>, value: MaybeAtom<T>, canNotify: boolean = true) {
	if (this.$dep) {
		unlink(this.$dep);
	}

	const oldValue = this.$get();
	if (isAtom(value)) {
		this.$bound = value;
		this.$value = null;
		this.$get = getBoundValue;
		this.$set = setBoundValue;
		link(this.$lifecycle, value, this.$dep ??= {
			$fn: notify<T>,
			$a0: this,
		});
	}
	else {
		this.$bound = null;
		this.$value = value;
		this.$get = getStaticValue;
		this.$set = setStaticValue;
	}

	if (canNotify && !Object.is(oldValue, this.$get())) {
		schedule(this.$lifecycle, this.$notify ??= {
			$fn: notify,
			$a0: this,
		});
	}
}

function getBoundValue<T>(this: ProxyAtom<T>) {
	// calling raw $get doesn't report access, which is what we want
	// sites accessing this proxy atom should do so via read, which will report
	// access on the proxy rather than the bound atom which may change
	return this.$bound!.$get();
}

function setBoundValue<T>(this: ProxyAtom<T>, value: T) {
	// set the bound atom and schedule a notification if it changed - copies the
	// behavior of `write`, skipping parts we don't need here.
	const atom = this.$bound!;
	if (atom.$set(value)) {
		schedule(atom.$lifecycle, atom.$notify ??= {
			$fn: notify,
			$a0: atom,
		});
	}

	// always return false, even if the bound atom changed - this way the
	// `write` and `update` functions won't schedule a redundant notification
	// for this proxy
	return false;
}

function getStaticValue<T>(this: ProxyAtom<T>) {
	return this.$value!;
}

function setStaticValue(this: ProxyAtom<any>) {
	return false;
}
