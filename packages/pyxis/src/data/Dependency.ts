import type { ArgsMax2, Callback } from "~/support/Callback";
import type { Nil } from "~/support/types";

import type { ContextInternal } from "./Context";

/**
 * A dependency callback of an Atom. The callback will be run whenever the relevant Atom changes.
 * @internal
 */
export interface Dependency<TArgs extends ArgsMax2 = ArgsMax2> extends Callback<TArgs> {
	$context?: Nil<DependencyList>;
	$target?: Nil<DependencyList<TArgs>>;

	/** Previous Dependency within an Atom's dependency list. */
	$ap?: Nil<Dependency<TArgs>>;

	/** Next Dependency within an Atom's dependency list. */
	$an?: Nil<Dependency<TArgs>>;

	/** Previous Dependency within a Context's dependency list. */
	$cp?: Nil<Dependency>;

	/** Next Dependency within an Context's dependency list. */
	$cn?: Nil<Dependency>;
}

/** @internal */
export interface DependencyList<TArgs extends ArgsMax2 = ArgsMax2> {
	/** The head of the dependencies linked list. */
	$dh?: Nil<Dependency<TArgs>>;

	/** The tail of the dependencies linked list. */
	$dt?: Nil<Dependency<TArgs>>;
}

/**
 * Links a Dependency to an Atom.
 * @internal
 */
export function link<TArgs extends ArgsMax2>(context: ContextInternal, target: DependencyList<TArgs>, dep: Dependency<TArgs>) {
	// link to target
	if (target.$dt) {
		target.$dt.$an = dep;
		dep.$ap = target.$dt;
	}
	else {
		target.$dh = dep;
	}

	dep.$target = target;
	target.$dt = dep;

	// link to context
	if (context.$dt) {
		context.$dt.$cn = dep as Dependency;
		dep.$cp = context.$dt;
	}
	else {
		context.$dh = dep as Dependency;
	}

	dep.$context = context;
	context.$dt = dep as Dependency;
}

/**
 * Unlinks a Dependency from the Atom and Context it has been linked to.
 * @internal
 */
export function unlink(dep: Dependency) {
	// unlink from target
	const target = dep.$target!;
	if (dep.$ap) {
		dep.$ap.$an = dep.$an;
	}
	else if (target.$dh === dep) {
		target.$dh = dep.$an;
	}

	if (dep.$an) {
		dep.$an.$ap = dep.$ap;
	}
	else if (target.$dt === dep) {
		target.$dt = dep.$ap;
	}

	dep.$target = null;
	dep.$ap = null;
	dep.$an = null;

	// unlink from context
	const context = dep.$context!;
	if (dep.$cp) {
		dep.$cp.$cn = dep.$cn;
	}
	else if (context.$dh === dep) {
		context.$dh = dep.$cn;
	}

	if (dep.$cn) {
		dep.$cn.$cp = dep.$cp;
	}
	else if (context.$dt === dep) {
		context.$dt = dep.$cp;
	}

	dep.$context = null;
	dep.$cp = null;
	dep.$cn = null;
}
