import { rethrow } from "~/support/common";
import type { ComponentBlock } from "~/Component";

declare global {
	// we expect this global to exist in ~all environments
	function queueMicrotask(callback: () => void): void;
}

export interface HotComponentEntry {
	component: ComponentBlock;
	dirty: boolean;
	isDispatching: boolean;
	needsCleanup: boolean;
	lh?: HotComponentListener | null;
	lt?: HotComponentListener | null;
}

export interface HotComponentListener {
	readonly fn: HotComponentListenerFn;
	readonly entry: HotComponentEntry;
	isActive: boolean;
	lp?: HotComponentListener | null;
	ln?: HotComponentListener | null;
}

export interface HotComponentListenerFn {
	(component: ComponentBlock): void;
}

export class ComponentRegistry {
	private readonly components = new Map<string, HotComponentEntry>();
	private isPendingUpdate = false;

	public on(id: string, fn: HotComponentListenerFn): HotComponentListener {
		const entry = this.components.get(id);
		if (!entry) {
			throw new Error(`no component was registered under "${id}"`);
		}

		// initial run - if it throws, subscription won't get registered
		fn(entry.component);

		// register subscription
		const listener: HotComponentListener = {
			fn,
			entry,
			isActive: true,
		};

		if (entry.lt) {
			entry.lt.ln = listener;
			listener.lp = entry.lt;
		}
		else {
			entry.lh = listener;
		}

		entry.lt = listener;

		return listener;
	}

	public off(listener: HotComponentListener) {
		if (!listener.isActive) {
			return;
		}

		listener.isActive = false;
		if (listener.entry.isDispatching) {
			listener.entry.needsCleanup = true;
			return;
		}

		this.unlink(listener);
	}

	private unlink(listener: HotComponentListener) {
		const { entry } = listener;
		if (listener.lp) {
			listener.lp.ln = listener.ln;
		}
		else if (entry.lh === listener) {
			entry.lh = listener.ln;
		}

		if (listener.ln) {
			listener.ln.lp = listener.lp;
		}
		else if (entry.lt === listener) {
			entry.lt = listener.lp;
		}

		listener.lp = null;
		listener.ln = null;
	}

	public subscribe(id: string, fn: HotComponentListenerFn) {
		const listener = this.on(id, fn);
		return () => this.off(listener);
	}

	public upsert(id: string, component: ComponentBlock) {
		const entry = this.components.get(id);
		if (!entry) {
			this.components.set(id, {
				component,
				dirty: false,
				isDispatching: false,
				needsCleanup: false,
			});

			return;
		}

		entry.component = component;
		entry.dirty = true;
		if (!this.isPendingUpdate) {
			queueMicrotask(this.update);
			this.isPendingUpdate = true;
		}
	}

	private readonly update = () => {
		let errors: unknown[] | undefined;

		this.isPendingUpdate = false;
		this.components.forEach(entry => {
			if (!entry.dirty) {
				return;
			}

			entry.dirty = false;
			entry.isDispatching = true;

			const component = entry.component;
			const last = entry.lt;
			let current = entry.lh;
			let next;

			try {
				while (current) {
					if (current.isActive) {
						try {
							current.fn(component);
						}
						catch (ex) {
							(errors ??= []).push(ex);
						}
					}

					// new subscribers already receive their initial call through ::on
					if (current === last) {
						break;
					}

					current = current.ln;
				}
			}
			finally {
				entry.isDispatching = false;
				if (entry.needsCleanup) {
					current = entry.lh;
					while (current) {
						next = current.ln;
						if (!current.isActive) {
							this.unlink(current);
						}

						current = next;
					}

					entry.needsCleanup = false;
				}
			}
		});

		rethrow(errors);
	};
}
