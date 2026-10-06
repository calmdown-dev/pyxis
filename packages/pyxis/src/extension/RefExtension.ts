import { isAtom, type Atom } from "~/data/Atom";
import { getLifecycle, onMounted, onUnmounted } from "~/data/Lifecycle";
import { extension, type ExtensionPropMapping } from "~/Adapter";

interface RefPropMapping extends ExtensionPropMapping<any> {
	extension: RefProps<this["node"]>;
}

interface RefProps<TNode> {
	readonly atom?: Atom<TNode | null>;
	readonly call?: RefFn<TNode>;
}

export interface RefFn<TNode> {
	(node: TNode | null): void;
}

/**
 * Extension adding direct reference access to any element. Recommended prefix: `"ref"`
 *
 * References can be stored into atoms:
 * ```tsx
 * const wrapperRef = atomOf<HTMLDivElement | null>(null);
 * <div ref:atom={wrapperRef} />
 * ```
 * or handled with a custom callback:
 * ```tsx
 * const onWrapperRef = (node: HTMLDivElement | null) => { ... };
 * <div ref:call={onWrapperRef} />
 * ```
 */
export const RefExtension = extension<any, RefPropMapping>((node, prop, value) => {
	let method;
	switch (prop) {
		case "atom":
			if (!isAtom(value)) {
				return;
			}

			method = refAtom;
			break;

		case "call":
			if (typeof value !== "function") {
				return;
			}

			method = refCall;
			break;

		default:
			return;
	}

	const lifecycle = getLifecycle();
	onMounted(lifecycle, {
		$fn: method,
		$a0: value,
		$a1: node,
	});

	onUnmounted(lifecycle, {
		$fn: method,
		$a0: value,
		$a1: null,
	});
});

function refAtom(atom: Atom<any>, node: any) {
	atom.set(node);
}

function refCall(setter: RefFn<any>, node: any) {
	setter(node);
}
