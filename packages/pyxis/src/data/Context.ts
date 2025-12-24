import { invoke, type ArgsMax5, type Callback } from "~/support/Callback";
import type { Nil } from "~/support/types";

import type { Dependency } from "./Dependency";
import type { Scheduler } from "./Scheduler";

export interface Context {
	/** @internal */
	readonly scheduler: Scheduler;

	/**
	 * The head of the dependencies linked list.
	 * @internal
	 */
	dh?: Nil<Dependency>;

	/**
	 * The tail of the dependencies linked list.
	 * @internal
	 */
	dt?: Nil<Dependency>;

	/**
	 * The head of the mount callback linked list.
	 * @internal
	 */
	mh?: Nil<MountCallback>;

	/**
	 * The tail of the mount callback linked list.
	 * @internal
	 */
	mt?: Nil<MountCallback>;

	/**
	 * The head of the unmount callback linked list.
	 * @internal
	 */
	uh?: Nil<UnmountCallback>;

	/**
	 * The tail of the unmount callback linked list.
	 * @internal
	 */
	ut?: Nil<UnmountCallback>;
}

/**
 * A mount callback running setup logic for contextual resources.
 */
export interface MountCallback<TArgs extends ArgsMax5 = ArgsMax5> extends Callback<TArgs> {
	mn?: Nil<MountCallback>;
}

/**
 * An unmount callback running teardown logic for contextual resources.
 */
export interface UnmountCallback<TArgs extends ArgsMax5 = ArgsMax5> extends Callback<TArgs> {
	un?: Nil<UnmountCallback>;
}


/**
 * Registers a callback to run when the current Component mounts.
 */
export function mounted(callback: MountCallback): void;

/**
 * Registers a callback to invoke when the given Context is being cleared.
 * @internal
 */
export function mounted(callback: () => void, context: Context): void;

export function mounted(callback: MountCallback | (() => void), context: Context = getContext()) {
	const obj = typeof callback === "function" ? { fn: callback } : callback;

	if (context.mt) {
		context.mt.mn = obj;
	}
	else {
		context.mh = obj;
	}

	context.mt = obj;
}


/**
 * Registers a callback to run once the current Component unmounts.
 */
export function unmounted(callback: () => void): void;

/**
 * Registers a callback to invoke when the given Context is being cleared.
 * @internal
 */
export function unmounted(callback: UnmountCallback, context: Context): void;

export function unmounted(callback: UnmountCallback | (() => void), context: Context = getContext()) {
	const obj = typeof callback === "function" ? { fn: callback } : callback;

	if (context.ut) {
		context.ut.un = obj;
	}
	else {
		context.uh = obj;
	}

	context.ut = obj;
}


let currentContext: Context | null = null;

export function getContext(): Context {
	if (__DEV__ && !currentContext) {
		throw new Error('Cannot get current context.');
	}

	return currentContext!;
}

export function withContext<TArgs extends ArgsMax5, TReturn>(
	context: Context,
	block: (...args: TArgs) => void,
	...args: TArgs
): TReturn;

export function withContext(
	context: Context,
	block: (...args: ArgsMax5) => any,
	a0: any,
	a1: any,
	a2: any,
	a3: any,
	a4: any,
) {
	try {
		currentContext = context;
		return block(a0, a1, a2, a3, a4);
	}
	finally {
		currentContext = null;
	}
}

export function runMountCallbacks(context: Context) {
	try {
		let callback = context.mh;
		let tmp;
		while (callback) {
			tmp = callback.mn;
			invoke(callback);
			callback.mn = null;
			callback = tmp;
		}
	}
	finally {
		context.mh = null;
		context.mt = null;
	}
}

export function runUnmountCallbacks(context: Context) {
	try {
		let callback = context.uh;
		let tmp;
		while (callback) {
			tmp = callback.un;
			invoke(callback);
			callback.un = null;
			callback = tmp;
		}
	}
	finally {
		context.uh = null;
		context.ut = null;
	}
}

export function destroyContext(context: Context) {
	// unlink all contextual dependencies
	let dep = context.dh;
	let tmp;
	let atom;

	while (dep) {
		tmp = dep.cn;
		atom = dep.atom!;

		if (dep.ap) {
			dep.ap.an = dep.an;
		}
		else if (atom.dh === dep) {
			atom.dh = dep.an;
		}

		if (dep.an) {
			dep.an.ap = dep.ap;
		}
		else if (atom.dt === dep) {
			atom.dt = dep.ap;
		}

		dep.atom = null;
		dep.ap = null;
		dep.an = null;

		dep.context = null;
		dep.cp = null;
		dep.cn = null;

		dep = tmp;
	}

	context.dh = null;
	context.dt = null;
}
