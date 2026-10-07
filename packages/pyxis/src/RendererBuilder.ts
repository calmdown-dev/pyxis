import type { ElementsType, Flatten, NodeType, PropsType } from "~/support/types";

import type { Adapter, Extension, ExtensionPropMapping, ExtensionsType } from "./Adapter";
import { createRenderer, type Renderer } from "./Renderer";

export interface RendererBuilder<TNode, TElements extends ElementsType, TUsedPrefixes extends string = never> {
	create: () => Renderer<TNode, TElements>;

	extend: <TPrefix extends string, TExtension extends Extension<TNode>>(
		prefix: TPrefix & (TPrefix extends TUsedPrefixes ? never : unknown),
		extension: TExtension,
	) => RendererBuilder<
		TNode,
		ExtendedElements<TNode, TElements, TExtension, TPrefix>,
		TUsedPrefixes | TPrefix
	>;
}

type ExtendedElements<TNode, TElements extends ElementsType, TExtension extends Extension<TNode>, TPrefix extends string> = (
	TExtension extends { readonly $mapping?: infer TMapping extends ExtensionPropMapping<TNode> }
		? {
			[TElementName in keyof TElements]: (
				(TMapping & { node: NodeType<TElements[TElementName]>; name: TElementName; })["extension"] extends (infer TExtensionProps extends PropsType)
					? [ keyof TExtensionProps ] extends [ never ]
						? TElements[TElementName]
						: Flatten<TElements[TElementName] & PrefixedProps<TExtensionProps, TPrefix>>
					: TElements[TElementName]
			);
		}
		: TElements
);

type PrefixedProps<TProps extends PropsType, TPrefix extends string> = {
	readonly [TPrefixed in `${TPrefix}:${keyof TProps & string}`]?: (
		TPrefixed extends `${TPrefix}:${infer TName extends (keyof TProps & string)}`
			? TProps[TName]
			: never
	);
};

export function renderer<TNode, TElements extends ElementsType>(adapter: Adapter<TNode, TElements>) {
	const extensions: ExtensionsType<TNode> = {};
	const builder: RendererBuilder<TNode, TElements> = {
		create: () => createRenderer(adapter, extensions),
		extend: (extensionKey: string, extension: any) => {
			if (__DEV__ && !/^[a-z_$][a-z0-9_$-]*$/i.test(extensionKey)) {
				throw new Error(`invalid extension key: "${extensionKey}"`);
			}

			extensions[extensionKey] = extension;
			return builder as any;
		},
	};

	return builder;
}
