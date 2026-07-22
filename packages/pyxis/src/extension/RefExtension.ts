import { isAtom, type Atom } from "~/data/Atom";
import type { ElementsType, NodeType } from "~/support/types";
import type { ExtensionProps } from "~/Adapter";
import type { MountingGroup } from "~/Renderer";
import { getLifecycle, onMounted, onUnmounted } from "~/data/Lifecycle";

export interface RefExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, {
			readonly atom?: Atom<NodeType<TElements[TElementName]> | null>;
			readonly call?: RefFn<NodeType<TElements[TElementName]>>;
		}>;
	};

	set: (node: any, prop: string, value: any, group?: MountingGroup<any>) => void;
}

export interface RefFn<TNode> {
	(node: TNode | null): void;
}

/**
 * Extension adding direct reference access to any element. Recommended prefix:
 * `"ref"`
 *
 * References can be stored into atoms:
 * ```tsx
 * const wrapperRef = atomOf<HTMLDivElement>();
 * <div ref:atom={wrapperRef} />
 * ```
 * or handled with a custom callback:
 * ```tsx
 * const onWrapperRef = (node: HTMLDivElement) => { ... };
 * <div ref:call={onWrapperRef} />
 * ```
 */
export const RefExtension = {
	set: (node: any, kind: string, value: any) => {
		let method;
		switch (kind) {
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
	},
} as RefExtensionType;

function refAtom(atom: Atom<any>, node: any) {
	atom.set(node);
}

function refCall(setter: RefFn<any>, node: any) {
	setter(node);
}
