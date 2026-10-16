import type { Nil } from "~/support/types";
import { runtime } from "~/Runtime";
import { S_ATOM } from "~/symbols";

import { notifyAtomObservers, type Atom, type ReadAtom } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { getLifecycle, type Lifecycle } from "./Lifecycle";
import { UNIQUE_VALUE } from "~/support/common";

/**
 * Describes a Context propagating data throughout the Component hierarchy.
 * @see {@link contextOf}
 */
export interface Context<T> {
	/** @internal */
	readonly $symbol: symbol;

	/**
	 * Carries typings of the data propagated by this Context. Typed as a function to enforce
	 * correct variance of the generic value type.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $contract?: (value: T) => T;
}

/**
 * Creates a typed Context allowing propagation of observable data throughout entire component trees
 * without "prop drilling."
 */
export function contextOf<T>(devId?: string): Context<T>;

export function contextOf<T>(): Context<T> {
	if (__DEV__) {
		const devId = arguments[0];
		const $symbol = runtime.hmrState!.restore(contextOf, devId) ?? Symbol();
		runtime.hmrState!.preserve(contextOf, devId, $symbol);
		return { $symbol };
	}
	else {
		return { $symbol: Symbol() };
	}
}


/** @internal */
export interface ContextContainer {
	[key: symbol]: ContextAtom<any> | undefined;
	readonly $parent: ContextContainer | null;
}

/** @internal */
interface ContextAtom<T> extends Atom<T> {
	$dep?: Nil<Dependency>;
	$upstream?: Nil<Atom<T>>;
	$value?: T;

	/** tracks whether value has been defined, only used in dev builds */
	$defined?: boolean;

	/** cached readonly consumer Atom, only used in dev builds */
	$consumer?: ContextAtom<T>;
}

/** @internal */
export function getContextContainer() {
	return runtime.c;
}

/** @internal */
export function setContextContainer(container: ContextContainer | null) {
	runtime.c = container;
	runtime.n = false;
}


/**
 * Augments the current Component to act as a host (aka provider) of the given Context. Returns a
 * mutable Atom carrying the contextual value propagated to all descendant Components that consume
 * the Context.
 *
 * When a default value is specified, it will immediately be used as the hosted value, overriding
 * any value hosted by ancestors of this Component.
 *
 * Without a default value specified, the Context initializes as "transparent," forwarding values
 * hosted by ancestors of this Component. Once the returned Atom is written into for the first time,
 * it breaks this link and begins hosting the new value from that point onwards. In forwarding mode,
 * if no ancestor hosts the Context, the value is not well defined and reading the Atom will fail.
 *
 * Descendants of this Component are able to consume the hosted value via `contextual(context)`
 * receiving a readonly Atom.
 * @see {@link contextual}
 */
export function host<C>(
	context: C,
	defaultValue?: C extends Context<infer T> ? T : never,
	lifecycle?: Lifecycle,
	devId?: string,
): C extends Context<infer T> ? Atom<T> : never;

export function host<T>(context: Context<T>, defaultValue?: T, lifecycle = getLifecycle()) {
	if (__DEV__) {
		__DEV__assertIsWithinComponent("host");
	}

	if (!runtime.n || !runtime.c) {
		// fork context container -> current component becomes a host
		runtime.n = true;
		runtime.c = {
			$parent: runtime.c,
		};
	}

	if (__DEV__) {
		const devId = arguments[3];
		runtime.hmrState!.restore(lifecycle, devId, value => {
			defaultValue = value;
		});
	}

	const localAtom: ContextAtom<T> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		$value: defaultValue,
		get: getHostedValue,
		set: setHostedValue,
	};

	let upstream;
	if (defaultValue === undefined && (upstream = lookupUpstream(context))) {
		// start in forwarding mode
		localAtom.get = getUpstreamValue;
		localAtom.$upstream = upstream;
		link(lifecycle, upstream, localAtom.$dep = {
			$fn: notifyAtomObservers<T>,
			$a0: localAtom,
		});
	}
	else {
		// start in hosting mode
		localAtom.$tracksValue = true;
		localAtom.$lastValue = defaultValue;
		if (__DEV__) {
			localAtom.$defined = true;
		}
	}

	if (__DEV__) {
		localAtom.$devId = arguments[3];
		if (Object.hasOwn(runtime.c, context.$symbol)) {
			throw new Error("Component declares multiple hosts of the same Context.");
		}
	}

	runtime.c[context.$symbol] = localAtom;
	return localAtom;
}

/**
 * Gets a readonly Atom carrying the value inherited from the nearest ancestor of the current
 * Component hosting the specified Context. This call fails if no ancestor is hosting the Context.
 * @see {@link host}
 */
export function contextual<T>(context: Context<T>): ReadAtom<T> {
	if (__DEV__) {
		__DEV__assertIsWithinComponent("contextual");
	}

	const atom = lookupUpstream(context);
	if (__DEV__) {
		if (!atom) {
			throw new Error("No ancestor is hosting this Context.");
		}

		// in dev builds, we create a separate consumer Atom forwarding the hosted value with a
		// trapped ::set overload that throws on invocation, enforcing the readonly constraint which
		// is otherwise only guarded by types in prod builds
		let consumer = atom.$consumer;
		if (!consumer) {
			consumer = atom.$consumer = {
				[S_ATOM]: true,
				$lifecycle: atom.$lifecycle,
				$upstream: atom,
				get: getUpstreamValue,
				set: __DEV__setConsumerValue,
			};

			link(atom.$lifecycle, atom, {
				$fn: notifyAtomObservers<T>,
				$a0: consumer,
			});
		}

		return consumer;
	}

	return atom!;
}

function lookupUpstream<T>(context: Context<T>): ContextAtom<T> | undefined {
	const { $symbol } = context;
	let ptr: Nil<ContextContainer> = runtime.c;
	let atom;
	while (ptr && !(atom = ptr[$symbol])) {
		ptr = ptr.$parent;
	}

	return atom;
}

function getUpstreamValue<T>(this: ContextAtom<T>) {
	return this.$upstream!.get();
}

function getHostedValue<T>(this: ContextAtom<T>) {
	if (__DEV__ && !this.$defined) {
		throw new Error("Cannot read Context before it has been initialized.");
	}

	return this.$value!;
}

function setHostedValue<T>(this: ContextAtom<T>, value: T) {
	let didChange = true;
	if (this.$upstream) {
		// switching from forwarding to hosting mode
		unlink(this.$dep!);
		this.$upstream = null;
		this.$dep = null;
		this.$tracksValue = true;
		this.$lastValue = UNIQUE_VALUE;
		this.get = getHostedValue;
		if (__DEV__) {
			this.$defined = true;
		}
	}
	else {
		didChange = !Object.is(this.$value, value);
	}

	this.$value = value;
	if (__DEV__) {
		runtime.hmrState!.preserve(this.$lifecycle, this.$devId, value);
	}

	return didChange;
}

function __DEV__setConsumerValue(): never {
	throw new Error("Contextual Atoms cannot be written.");
}

function __DEV__assertIsWithinComponent(fn: string) {
	if (!runtime.componentEvalLifecycle || runtime.componentEvalLifecycle !== runtime.l) {
		throw new Error(`"${fn}" can only be used directly within components.`);
	}

	if (runtime.componentEvalEffect !== runtime.e) {
		throw new Error(`"${fn}" cannot be used within effects or derivations.`);
	}
}
