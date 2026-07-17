import type { Nil } from "~/support/types";

import { notify, S_ATOM, type Atom } from "./Atom";
import { link, unlink, type Dependency } from "./Dependency";
import { __DEV__assertNotEffect } from "./Effect";
import { getLifecycle } from "./Lifecycle";

/**
 * Describes a Context distributing data throughout the Component hierarchy.
 * @see {@link createContext}
 */
export interface Context<T> {
	/** @internal */
	readonly $symbol: symbol;

	/**
	 * A fake property kept for TypeScript to properly type-check Context compatibility.
	 * @deprecated **Type only, does not exist at runtime!**
	 */
	readonly $contract?: (value: T) => void;
}

/**
 * Creates a typed Context that can be used to propagate observable data throughout entire component
 * trees without "prop drilling."
 * @see {@link context}
 */
export function createContext<T>(devId?: string): Context<T>;

export function createContext<T>(): Context<T> {
	let $symbol = Symbol();
	if (__DEV__) {
		const devId = arguments[0];
		$symbol = globalThis.__PYXIS_HMR__.state.restore(createContext, devId) ?? $symbol;
		globalThis.__PYXIS_HMR__.state.preserve(createContext, devId, $symbol);
	}

	return { $symbol };
}


/** @internal */
export interface ContextContainer {
	[key: symbol]: unknown;
	readonly $parent?: Nil<ContextContainer>;
}

let $currentContainer: ContextContainer | undefined;
let $isNewContainer = false;

/** @internal */
export function getContextContainer() {
	return $currentContainer;
}

/** @internal */
export function setContextContainer(container: ContextContainer | undefined) {
	$currentContainer = container;
	$isNewContainer = false;
}


interface ContextAtom<T> extends Atom<T> {
	$dep?: Nil<Dependency>;
	$ancestor?: Nil<Atom<T>>;
	$value?: T;
}

/**
 * Gets a consumer Atom for the given Context. This atom will be read-only.
 * @see {@link host}
 */
export function consumerOf<T>(context: Context<T>): Atom<T> | null {
	if (__DEV__) {
		__DEV__assertNotEffect();
	}

	const { $symbol } = context;
	let ptr: Nil<ContextContainer> = $currentContainer;
	let atom;
	while (ptr && !(atom = ptr[$symbol] as Atom<T> | undefined)) {
		ptr = ptr.$parent;
	}

	return atom ?? null;
}

/**
 * Marks the current component as a host for the given context. Returns a mutable ContextAtom;
 * Values written to it will be propagated to any descendant component that consumes the context via
 * `consumerOf(context)`.
 * @see {@link consumerOf}
 */
export function host<T>(context: Context<T>, defaultValue?: T, devId?: string): ContextAtom<T>;

export function host<T>(context: Context<T>, defaultValue?: T) {
	if (__DEV__) {
		__DEV__assertNotEffect();
	}

	if (!$isNewContainer || !$currentContainer) {
		// split context, current component becomes a host
		$isNewContainer = true;
		$currentContainer = {
			$parent: $currentContainer,
		};
	}

	const lifecycle = getLifecycle();
	if (__DEV__) {
		const devId = arguments[2];
		globalThis.__PYXIS_HMR__.state.restore(lifecycle, devId, value => {
			defaultValue = value;
		});
	}

	const localAtom: ContextAtom<T> = {
		[S_ATOM]: true,
		$lifecycle: lifecycle,
		$tracksValue: true,
		$value: defaultValue,
		get: getLocalValue,
		set: setValue,
	};

	if (defaultValue === undefined) {
		const ancestorAtom = consumerOf(context);
		if (ancestorAtom) {
			localAtom.get = getAncestorValue;
			localAtom.$ancestor = ancestorAtom;
			link(lifecycle, ancestorAtom, localAtom.$dep = {
				$fn: notify<T>,
				$a0: localAtom,
			});
		}
	}

	if (__DEV__) {
		localAtom.$devId = arguments[2];
		if (Object.hasOwn($currentContainer, context.$symbol)) {
			throw new Error("Component declares multiple hosts of the same Context.");
		}
	}

	$currentContainer[context.$symbol] = localAtom;
	return localAtom;
}

function getAncestorValue<T>(this: ContextAtom<T>) {
	return this.$ancestor!.get();
}

function getLocalValue<T>(this: ContextAtom<T>) {
	return this.$value!;
}

function setValue<T>(this: ContextAtom<T>, value: T) {
	let oldValue;
	if (this.$ancestor) {
		oldValue = this.$ancestor.get();
		unlink(this.$dep!);
		this.$dep = null;
		this.$ancestor = null;
		this.get = getLocalValue;
	}
	else {
		oldValue = this.$value;
	}

	this.$value = value;
	if (__DEV__) {
		globalThis.__PYXIS_HMR__.state.preserve(this.$lifecycle, this.$devId, value);
	}

	return !Object.is(oldValue, value);
}
