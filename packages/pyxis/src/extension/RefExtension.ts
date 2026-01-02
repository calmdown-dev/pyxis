import type { ExtensionProps } from "~/Adapter";
import { write, type Atom } from "~/data/Atom";
import type { ElementsType, NodeType } from "~/support/types";

export interface RefExtensionType {
	<TExtensionKey extends string, TElements extends ElementsType>(extensionKey: TExtensionKey, elements: TElements): {
		[TElementName in keyof TElements]: TElements[TElementName] & ExtensionProps<TExtensionKey, {
			readonly atom?: Atom<NodeType<TElements[TElementName]>>;
			readonly fn?: (node: NodeType<TElements[TElementName]>) => void;
		}>;
	};

	set: (node: JSX.Node, prop: string, value: any) => void;
}

export const RefExtension = {
	set: (node: JSX.Node, kind: string, value: any) => {
		switch (kind) {
			case "atom":
				write(value, node);
				break;

			case "fn":
				value(node);
				break;
		}
	},
} as RefExtensionType;
