import type { ElementsType, Flatten, NodeType, PropsType } from "~/support/types";

import type { Adapter, Extension, ExtensionPropMapping, ExtensionsType } from "./Adapter";
import { createRenderer, type Renderer } from "./Renderer";

export interface PyxisBuilder<TNode, TIntrinsicElements extends ElementsType> {
	build: () => Renderer<TNode, TIntrinsicElements>;

	extend: <TExtensionKey extends string, TExtension extends Extension<TNode>>(
		extensionKey: TExtensionKey,
		extension: TExtension,
	) => PyxisBuilder<TNode, (
		TExtension extends { readonly $mapping?: infer TMapping extends ExtensionPropMapping<TNode> }
			? {
				[TElementName in keyof TIntrinsicElements]: (
					(TMapping & { node: NodeType<TIntrinsicElements[TElementName]>; name: TElementName; })["extension"] extends (infer TExtension extends PropsType)
						? [ keyof TExtension ] extends [ never ]
							? TIntrinsicElements[TElementName]
							: Flatten<TIntrinsicElements[TElementName] & ExtensionProps<TExtensionKey, TExtension>>
						: TIntrinsicElements[TElementName]
				);
			}
			: TIntrinsicElements
	)>;
}

type ExtensionProps<TExtensionKey extends string, TExtensionProps extends PropsType> = {
	readonly [TExtPropKey in `${TExtensionKey}:${keyof TExtensionProps & string}`]?: (
		TExtPropKey extends `${TExtensionKey}:${infer TPropKey extends (keyof TExtensionProps & string)}`
			? TExtensionProps[TPropKey]
			: never
	);
};

export function pyxis<TNode, TIntrinsicElements extends ElementsType>(adapter: Adapter<TNode, TIntrinsicElements>) {
	const extensions: ExtensionsType<TNode> = {};
	const builder = {
		build: () => createRenderer(adapter, extensions),
		extend: (extensionKey: string, extension: any) => {
			if (__DEV__ && !/^[a-z_$][a-z0-9_$-]*$/i.test(extensionKey)) {
				throw new Error(`invalid extension key: "${extensionKey}"`);
			}

			extensions[extensionKey] = extension;
			return builder;
		},
	};

	return builder as PyxisBuilder<TNode, TIntrinsicElements>;
}
