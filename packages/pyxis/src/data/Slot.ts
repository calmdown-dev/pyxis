import type { ArgsMax5 } from "~/support/Callback";
import type { Nil } from "~/support/types";

import { unmounted } from "./Context";

export interface Slot<TArgs extends ArgsMax5 = []> {
	lh?: Nil<Listener<TArgs>>;
	lt?: Nil<Listener<TArgs>>;
}

export interface Listener<TArgs extends ArgsMax5 = []> {
	readonly fn: (...args: TArgs) => void;
	lp?: Nil<Listener<TArgs>>;
	ln?: Nil<Listener<TArgs>>;
}

export function slot<TArgs extends ArgsMax5>(): Slot<TArgs> {
	return {};
}

export function trigger<TArgs extends ArgsMax5>(slot: Slot<TArgs>, ...args: TArgs): void;
export function trigger(slot: Slot<ArgsMax5>, a0: any, a1: any, a2: any, a3: any, a4: any) {
	let current = slot.lh;
	while (current) {
		current.fn(a0, a1, a2, a3, a4);
		current = current.ln;
	}
}

export function on<TArgs extends ArgsMax5>(slot: Slot<TArgs>, listener: (...args: TArgs) => void) {
	const obj: Listener<TArgs> = { fn: listener };
	if (slot.lt) {
		slot.lt.ln = obj;
		obj.lp = slot.lt;
	}
	else {
		slot.lh = obj;
	}

	slot.lt = obj;

	unmounted(() => {
		if (obj.lp) {
			obj.lp.ln = obj.ln;
		}
		else if (slot.lh === obj) {
			slot.lh = obj.ln;
		}

		if (obj.ln) {
			obj.ln.lp = obj.lp;
		}
		else if (slot.lt === obj) {
			slot.lt = obj.lp;
		}

		obj.lp = null;
		obj.ln = null;
	});
}
