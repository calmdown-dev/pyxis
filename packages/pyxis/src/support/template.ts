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
	hBefore: HNode<TNode> | null,
	nUsedParent: TNode,
	nRealParent: TNode,
	isBatch: boolean,
) {
	mountJsx(jsx.t?.(jsx.d), hParent, hBefore, nUsedParent, nRealParent, isBatch);
}

const REUSED_JSX = {
	[S_COMPONENT]: Template,
} as TemplateJsx;

export function mountTemplate<TNode, TData>(
	template: DataTemplate<TData>,
	data: TData,
	hParent: MountingGroup<TNode>,
	hBefore: HNode<TNode> | null,
	nUsedParent: TNode,
	nRealParent: TNode,
	isBatch: boolean,
) {
	REUSED_JSX.t = template;
	REUSED_JSX.d = data;
	try {
		mount(REUSED_JSX, hParent, hBefore, nUsedParent, nRealParent, isBatch);
	}
	finally {
		REUSED_JSX.t = null;
		REUSED_JSX.d = null;
	}
}
