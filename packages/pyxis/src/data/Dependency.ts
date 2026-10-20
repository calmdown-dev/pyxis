import { invoke, rethrow } from "~/support/common";
import type { ArgsMax3, Callback, Nil } from "~/support/types";

import type { Lifecycle } from "./Lifecycle";
import type { UpdateCallback } from "./Scheduler";

/**
 * A dependency callback of an Atom. The callback will be run whenever the relevant Atom changes.
 */
export interface Dependency<TArgs extends ArgsMax3 = ArgsMax3> extends Callback<TArgs> {
	/** @internal */
	$lifecycle?: Nil<Lifecycle>;

	/** @internal */
	$target?: Nil<DependencyList<TArgs>>;

	/**
	 * Previous Dependency within an Atom's dependency list.
	 * @internal
	 */
	$ap?: Nil<Dependency<TArgs>>;

	/**
	 * Next Dependency within an Atom's dependency list.
	 * @internal
	 */
	$an?: Nil<Dependency<TArgs>>;

	/**
	 * Previous Dependency within a Lifecycle's dependency list.
	 * @internal
	 */
	$lp?: Nil<Dependency>;

	/**
	 * Next Dependency within an Lifecycle's dependency list.
	 * @internal
	 */
	$ln?: Nil<Dependency>;
}

export interface DependencyList<TArgs extends ArgsMax3 = ArgsMax3> {
	/**
	 * The head of the dependencies linked list.
	 * @internal
	 */
	$dh?: Nil<Dependency<TArgs>>;

	/**
	 * The tail of the dependencies linked list.
	 * @internal
	 */
	$dt?: Nil<Dependency<TArgs>>;

	/**
	 * Tracks whether notifications are currently being dispatched.
	 * @internal
	 */
	$xa?: boolean;

	/**
	 * During notification dispatch, tracks the next dependency to be notified.
	 * @internal
	 */
	$xn?: Nil<Dependency>;

	/**
	 * The notify callback of this DependencyList.
	 * @internal
	 */
	$notify?: Nil<UpdateCallback>;

	/**
	 * In chained data relations (proxy and context atoms), tracks the upstream atom forwarding
	 * notifications to this atom.
	 */
	$upstream?: Nil<DependencyList>;

	/**
	 * Tracks whether the next notification must be delivered overriding any optimizations that may
	 * otherwise try to skip it.
	 * @internal
	 */
	$force?: boolean;
}

export function bind(lifecycle: Lifecycle, target: DependencyList, block: () => void) {
	link(lifecycle, target, { $fn: block });
	block();
}

/**
 * Links a Dependency to an Atom and Lifecycle.
 * @internal
 */
export function link<TArgs extends ArgsMax3>(lifecycle: Lifecycle, target: DependencyList<TArgs>, dep: Dependency<TArgs>): void;
export function link(lifecycle: Lifecycle, target: DependencyList, dep: Dependency) {
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

	// link to lifecycle
	if (lifecycle.$dt) {
		lifecycle.$dt.$ln = dep;
		dep.$lp = lifecycle.$dt;
	}
	else {
		lifecycle.$dh = dep;
	}

	dep.$lifecycle = lifecycle;
	lifecycle.$dt = dep;

	// advance cursor when dispatch is currently active
	if (target.$xa && !target.$xn) {
		target.$xn = dep;
	}

	// if there is already a pending update notification, ensure it is delivered regardless of any
	// optimizations, since the new observer (dep) may have seen an intermediate state and may need
	// the notification to actually synchronize
	let update;
	do {
		update = target.$notify;
		if (update && update.$se === update.$lifecycle!.$scheduler.$epoch) {
			target.$force = true;
		}

		target = target.$upstream!;
	}
	while (target);
}

/**
 * Unlinks a Dependency from the Atom and Lifecycle it has been linked to.
 * @internal
 */
export function unlink(dep: Dependency) {
	const target = dep.$target;
	if (!target) {
		return; // already unlinked?
	}

	// advance cursor when dispatch is currently active
	if (target.$xa && target.$xn === dep) {
		target.$xn = dep.$an;
	}

	// unlink from target (atom)
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

	// unlink from lifecycle
	const lifecycle = dep.$lifecycle!;
	if (dep.$lp) {
		dep.$lp.$ln = dep.$ln;
	}
	else if (lifecycle.$dh === dep) {
		lifecycle.$dh = dep.$ln;
	}

	if (dep.$ln) {
		dep.$ln.$lp = dep.$lp;
	}
	else if (lifecycle.$dt === dep) {
		lifecycle.$dt = dep.$lp;
	}

	dep.$lifecycle = null;
	dep.$lp = null;
	dep.$ln = null;
}

/**
 * Unlinks all Dependencies managed by the given Lifecycle.
 * @internal
 */
export function teardown(lifecycle: Lifecycle) {
	let dep = lifecycle.$dh;
	let target;
	let next;

	while (dep) {
		target = dep.$target!;

		// advance cursor when dispatch is currently active
		if (target.$xa && target.$xn === dep) {
			target.$xn = dep.$an;
		}

		// unlink from target (atom)
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

		// teardown the dependency - we're removing everything from the Lifecycle, so we don't have
		// to preserve the linked list's consistency during this loop
		next = dep.$ln;
		dep.$lifecycle = null;
		dep.$target = null;
		dep.$ap = null;
		dep.$an = null;
		dep.$lp = null;
		dep.$ln = null;
		dep = next;
	}

	lifecycle.$dh = null;
	lifecycle.$dt = null;

	lifecycle.$life += 1;

	let callbacks;
	if ((callbacks = lifecycle.$onMount)) {
		callbacks.length = 0;
	}

	if ((callbacks = lifecycle.$onUnmount)) {
		callbacks.length = 0;
	}
}

/**
 * Invokes all linked dependency callbacks. Resilient against mutations of the list throughout the
 * dispatch (as long as they only happen via the `link`, `unlink`, or `teardown` functions).
 * @internal
 */
export function notify(list: DependencyList) {
	// init cursor
	list.$xa = true;
	list.$xn = list.$dh;

	// invoke all observer callbacks, catching any errors
	let errors: unknown[] | undefined;
	let current;
	while ((current = list.$xn)) {
		// the callback may run arbitrary user code, which could lead to mutations of the linked
		// list we're iterating -> we advance the cursor first; the link, unlink, unlinkAll
		// functions check and adjust it when necessary; this loop will then advance to the correct
		// next dependency
		list.$xn = current.$an;
		try {
			invoke(current);
		}
		catch (ex) {
			(errors ??= []).push(ex);
		}
	}

	// clear cursor
	list.$xa = false;
	list.$xn = null;

	// fail, if there were any errors
	rethrow(errors);
}
