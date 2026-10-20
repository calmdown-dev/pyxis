import { isAtom, write, type WriteAtom } from "~/data/Atom";
import { invokeMountedCallback, onMounted, onUnmounted } from "~/data/Lifecycle";
import { extension, type ExtensionPropMapping } from "~/Adapter";

interface RefPropMapping extends ExtensionPropMapping<unknown> {
	extension: RefProps<this["node"]>;
}

interface RefProps<TNode> {
	readonly atom?: WriteAtom<TNode | null>;
	readonly call?: RefFn<TNode>;
}

export interface RefFn<TNode> {
	(node: TNode): (() => void) | void;
}

/**
 * Extension adding direct reference access to any element. Recommended prefix: `"ref"`
 *
 * References can be stored into Atoms:
 *
 * ```tsx
 * const wrapperRef = atomOf<HTMLDivElement | null>(null);
 * <div ref:atom={wrapperRef} />
 * ```
 *
 * The Atom will be set to the referenced node once it mounts. Later, when the node unmounts, the
 * Atom is set back to `null`.
 *
 * References can also be received via callbacks:
 *
 * ```tsx
 * const onWrapperRef = (node: HTMLDivElement) => {
 *   // ...
 * };
 *
 * <div ref:call={onWrapperRef} />
 * ```
 *
 * Ref callbacks are only called when the node mounts, they never receive `null`. Instead,
 * unmounted nodes may be handled by returning a teardown callback.
 */
export const RefExtension = /*@__PURE__*/ extension<any, RefPropMapping>((node, prop, value, group) => {
	switch (prop) {
		case "atom":
			if (isAtom(value)) {
				onMounted(group, {
					$fn: write,
					$a0: value,
					$a1: node,
				});

				onUnmounted(group, {
					$fn: write,
					$a0: value,
					$a1: null,
				});
			}

			break;

		case "call":
			if (typeof value === "function") {
				onMounted(group, {
					$fn: invokeMountedCallback,
					$a0: group,
					$a1: value,
					$a2: node,
				});
			}

			break;
	}
});
