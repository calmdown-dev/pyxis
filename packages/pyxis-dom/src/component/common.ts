import {
	ext,
	extension,
	getLifecycle,
	Native,
	read,
	S_TAG_NAME,
	type Component,
	type ComponentHandler,
	type ElemName,
	type ExtensionPropMapping,
	type JsxObject,
	type Lifecycle,
	type NodeType,
	type PropsType,
} from "@calmdown/pyxis/core";

import { AttributeExtension } from "~/extension/AttributeExtension";

import type { Mutable } from "./types";

interface CapturedNode {
	node: Node | null;
}

interface CapturePropMapping extends ExtensionPropMapping<Node> {
	extension: {
		capture: CapturedNode;
	};
}

const CaptureExtension = /*@__PURE__*/ extension<Node, CapturePropMapping>((node, _prop, value: CapturedNode) => {
	value.node = node;
});

export function control<TProps extends PropsType>(
	tagName: ElemName<TProps>,
	deferredPropNames: readonly string[],
	attributeMapping?: { readonly [_ in string]?: string },
	initialize?: (elem: NodeType<TProps>, props: TProps, lifecycle: Lifecycle) => void,
): Component<TProps>;

/*@__NO_SIDE_EFFECTS__*/
export function control<TProps extends PropsType>(
	tagName: ElemName<TProps>,
	deferredPropNames: readonly string[],
	attributeMapping?: { readonly [_ in string]?: string },
	initialize?: (elem: Node, props: JsxObject, lifecycle: Lifecycle) => void,
): ComponentHandler {
	// build map of excluded props
	const excludedPropMap = deferredPropNames.reduce(assignFlag, {});

	// also exclude attributes, if defined
	if (attributeMapping) {
		let name;
		for (name in attributeMapping) {
			excludedPropMap[name] = true;
		}
	}

	return (jsx, hParent, nUsedParent, nRealParent, nBefore, isBatch) => {
		const props = {} as Mutable<JsxObject>;

		// copy props, excluding deferred and attributes
		let name;
		for (name in jsx) {
			if (!excludedPropMap[name]) {
				props[name] = jsx[name];
			}
		}

		// copy attributes via extension props
		if (attributeMapping) {
			let values: { [_ in string]?: any } | undefined;
			for (name in attributeMapping) {
				if (Object.hasOwn(jsx, name)) {
					(values ??= {})[attributeMapping[name]!] = jsx[name];
				}
			}

			if (values) {
				ext(AttributeExtension, values, props);
			}
		}

		// apply capture extension
		const capture: CapturedNode = { node: null };
		ext(CaptureExtension, { capture }, props);

		// run the native handler to render the actual element
		props[S_TAG_NAME] = tagName;
		Native(props, hParent, nUsedParent, nRealParent, nBefore, isBatch);

		// run custom init logic, if defined
		initialize?.(capture.node!, jsx, getLifecycle());
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
