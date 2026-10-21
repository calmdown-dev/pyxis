import {
	ext,
	getLifecycle,
	Native,
	read,
	S_TAG_NAME,
	type Component,
	type ComponentHandler,
	type ElemName,
	type JsxObject,
	type Lifecycle,
	type NodeType,
	type PropsType,
} from "@calmdown/pyxis";

import { AttributeExtension } from "~/extension/AttributeExtension";

import type { Mutable } from "./types";

export function control<TProps extends PropsType>(
	tagName: ElemName<TProps>,
	deferredPropNames?: readonly string[] | null,
	attributeMapping?: { readonly [_ in string]: string } | null,
	initialize?: (elem: NodeType<TProps>, props: TProps, lifecycle: Lifecycle) => void,
): Component<TProps>;

/*@__NO_SIDE_EFFECTS__*/
export function control<TProps extends PropsType>(
	tagName: ElemName<TProps>,
	deferredPropNames?: readonly string[] | null,
	attributeMapping?: { readonly [_ in string]: string } | null,
	initialize?: (elem: Node, props: JsxObject, lifecycle: Lifecycle) => void,
): ComponentHandler {
	// build map of excluded props
	const excludedPropMap = deferredPropNames?.reduce(assignFlag, {}) ?? {};
	let attributeRouting: { [_ in string]: string } | undefined;

	// resolve fixed attribute routes once, retaining their source prop names as values
	if (attributeMapping) {
		let routing: { [_ in string]: string } | undefined;
		let name;
		for (name in attributeMapping) {
			excludedPropMap[name] = true;
			(routing ??= {})[attributeMapping[name]!] = name;
		}

		if (routing) {
			attributeRouting = ext(AttributeExtension, routing) as { [_ in string]: string };
		}
	}

	return (jsx, hParent, hBefore, nUsedParent, nRealParent, isBatch) => {
		const props = {} as Mutable<JsxObject>;

		// copy props, excluding deferred and attributes
		let name;
		for (name in jsx) {
			if (!excludedPropMap[name]) {
				props[name] = jsx[name];
			}
		}

		// route attributes via extension props
		if (attributeRouting) {
			let route;
			for (route in attributeRouting) {
				name = attributeRouting[route];
				if (Object.hasOwn(jsx, name)) {
					props[route] = jsx[name];
				}
			}
		}

		// run the native handler to render the actual element
		props[S_TAG_NAME] = tagName;
		const node = Native(props, hParent, hBefore, nUsedParent, nRealParent, isBatch) as Element;

		// run custom init logic, if defined
		initialize?.(node, jsx, getLifecycle());
	};
}

export function setControlProps(node: { [_ in string]?: any }, props: PropsType, propNames: readonly string[]) {
	const { length } = propNames;
	let index = 0;
	let prop;
	let value;

	for (; index < length; index += 1) {
		prop = propNames[index];
		value = read(props[prop]);
		if (value !== undefined && node[prop] !== value) {
			node[prop] = value;
		}
	}
}

function assignFlag(flags: { [_ in string]?: true }, flag: string) {
	flags[flag] = true;
	return flags;
}
