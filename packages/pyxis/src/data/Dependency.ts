import type { ArgsMax5, Callback } from "~/support/Callback";
import type { Nil } from "~/support/types";

import type { Atom } from "./Atom";
import type { Context } from "./Context";

/**
 * A dependency callback of an Atom. The callback will be run whenever the relevant Atom changes.
 */
export interface Dependency<TArgs extends ArgsMax5 = ArgsMax5> extends Callback<TArgs> {
	atom?: Nil<Atom>;
	context?: Nil<Context>;

	/** Previous Dependency within an Atom's dependency list. */
	ap?: Nil<Dependency>;

	/** Next Dependency within an Atom's dependency list. */
	an?: Nil<Dependency>;

	/** Previous Dependency within a Context's dependency list. */
	cp?: Nil<Dependency>;

	/** Next Dependency within an Context's dependency list. */
	cn?: Nil<Dependency>;
}

/**
 * Links a Dependency to an Atom.
 */
export function link(context: Context, atom: Atom<any>, dep: Dependency) {
	// link to Atom
	if (atom.dt) {
		atom.dt.an = dep;
		dep.ap = atom.dt;
	}
	else {
		atom.dh = dep;
	}

	dep.atom = atom;
	atom.dt = dep;

	// link to Context
	if (context.dt) {
		context.dt.cn = dep;
		dep.cp = context.dt;
	}
	else {
		context.dh = dep;
	}

	dep.context = context;
	context.dt = dep;
}

/**
 * Unlinks a Dependency from the Atom and Context it has been linked to.
 */
export function unlink(dep: Dependency) {
	// unlink from Atom
	const atom = dep.atom!;
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

	// unlink from Context
	const context = dep.context!;
	if (dep.cp) {
		dep.cp.cn = dep.cn;
	}
	else if (context.dh === dep) {
		context.dh = dep.cn;
	}

	if (dep.cn) {
		dep.cn.cp = dep.cp;
	}
	else if (context.dt === dep) {
		context.dt = dep.cp;
	}

	dep.context = null;
	dep.cp = null;
	dep.cn = null;
}
