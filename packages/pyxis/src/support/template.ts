import type { ComponentHandler, DataTemplate, JsxObject } from "~/Component";
import { mount, mountJsx, type HNode, type MountingGroup } from "~/Renderer";
import { S_COMPONENT } from "~/symbols";

interface TemplateJsx extends JsxObject {
	[S_COMPONENT]: ComponentHandler;
	t: DataTemplate<any> | null;
	d: any;
}

function Template<TNode>(
	jsx: TemplateJsx,
	hParent: HNode<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	mountJsx(jsx.t?.(jsx.d), hParent, nUsedParent, nRealParent, nBefore, isBatch);
}

const REUSED_JSX = {
	[S_COMPONENT]: Template,
} as TemplateJsx;

export function mountTemplate<TNode, TData>(
	template: DataTemplate<TData>,
	data: TData,
	hGroup: MountingGroup<TNode>,
	nUsedParent: TNode,
	nRealParent: TNode,
	nBefore: TNode | null,
	isBatch: boolean,
) {
	REUSED_JSX.t = template;
	REUSED_JSX.d = data;
	try {
		mount(REUSED_JSX, hGroup, nUsedParent, nRealParent, nBefore, isBatch);
	}
	finally {
		REUSED_JSX.t = null;
		REUSED_JSX.d = null;
	}
}
