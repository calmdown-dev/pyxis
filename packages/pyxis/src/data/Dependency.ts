import { invoke } from "~/support/common";
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
	 * The tail of the NotifyCursor stack.
	 * @internal
	 */
	$ct?: Nil<NotifyCursor>;

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

/** @internal */
interface NotifyCursor {
	/**
	 * Previous in-progress NotifyCursor in the stack.
	 */
	$cp?: Nil<NotifyCursor>;

	/**
	 * The next Dependency the notification dispatch using this NotifyCursor should proceed to.
	 */
	$dn?: Nil<Dependency>;
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

	// advance notify cursors, if active
	advanceCursorOnAppend(target, dep);

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

	// advance notify cursors, if active
	advanceCursorOnRemoval(target, dep);

	// unlink from target
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
	let atom;
	let next;

	while (dep) {
		atom = dep.$target!;

		// advance notify cursors, if active
		advanceCursorOnRemoval(atom, dep);

		if (dep.$ap) {
			dep.$ap.$an = dep.$an;
		}
		else if (atom.$dh === dep) {
			atom.$dh = dep.$an;
		}

		if (dep.$an) {
			dep.$an.$ap = dep.$ap;
		}
		else if (atom.$dt === dep) {
			atom.$dt = dep.$ap;
		}

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
}

/**
 * Invokes all linked dependency callbacks. Resilient against mutations of the list throughout the
 * dispatch (as long as they only happen via the `link`, `unlink`, or `teardown` functions).
 * @internal
 */
export function notify(list: DependencyList) {
	const cursor: NotifyCursor = {
		$cp: list.$ct,
		$dn: list.$dh,
	};

	// push cursor stack
	list.$ct = cursor;

	try {
		let current;
		while ((current = cursor.$dn)) {
			// the callback may run arbitrary user code, which could lead to mutations of the linked
			// list we're iterating -> we advance the cursor first; the link, unlink, unlinkAll
			// functions check and adjust it when necessary; this loop will then advance to the
			// correct next dependency
			cursor.$dn = current.$an;
			invoke(current);
		}
	}
	finally {
		// pop cursor stack
		list.$ct = cursor.$cp;
	}
}

function advanceCursorOnAppend(list: DependencyList, dep: Dependency) {
	let cursor = list.$ct;
	while (cursor) {
		if (!cursor.$dn) {
			cursor.$dn = dep;
		}

		cursor = cursor.$cp;
	}
}

function advanceCursorOnRemoval(list: DependencyList, dep: Dependency) {
	let cursor = list.$ct;
	while (cursor) {
		if (cursor.$dn === dep) {
			cursor.$dn = dep.$an;
		}

		cursor = cursor.$cp;
	}
}
