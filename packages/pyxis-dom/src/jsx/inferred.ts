/** @preserve */
import type { JsxChildren, MaybeReadAtom, S_ELEM_NAME, S_NODE_TYPE } from "@calmdown/pyxis/core";

// pyxis imports, not @preserve'd
import type { Nil } from "@calmdown/pyxis/core";

import type { PROP_MAP } from "./mapping";

/** omits any catch-all index signatures from T */
type OmitIndex<T> = {
	[K in keyof T as (
		string extends K
			? never
			: number extends K
				? never
				: symbol extends K
					? never
					: K
	)]: T[K];
};

/** omits any readonly properties from an object type */
type OmitReadonly<T> = Pick<T, { [K in keyof T] -?: Equals<{ -readonly [_ in K]: T[K] }, { [_ in K]: T[K] }, K, never> }[keyof T]>;

/** checks whether types A and B are equal - resolves to type Y if they are, otherwise resolves to N - this is a utility type used by OmitReadonly */
type Equals<A, B, Y, N> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? Y : N;

/** omits any functions from an object type */
type OmitFunctions<T> = Pick<T, { [K in keyof T] -?: T[K] extends Nil<(...args: any) => any> ? never : K }[keyof T]>;

/** applies custom field overrides O over the given type T */
type ApplyOverrides<T, O> = Omit<T, keyof O> & Pick<O, { [K in keyof O]: O[K] extends never ? never : K }[keyof O]>;

/** wraps each property type in MaybeReadAtom to allow the use of atoms on properties of intrinsic elements */
type WrapProps<T> = { [K in keyof T]: MaybeReadAtom<T[K]> };

/** renames props according to the given mapping */
type MapProps<T, M extends { [K in string]: string }> = {
	[K in MappedPropKeys<T, M>]: K extends keyof M
		? M[K] extends keyof T
			? T[M[K]]
			: never
		: K extends keyof T
			? T[K]
			: never;
};

/** infers the new keys of an object afte remapping properties - this is a utility type used by MapProps */
type MappedPropKeys<T, M extends { [K in string]: string }> =
	Exclude<keyof T, M[keyof M]> | { [K in keyof M]: M[K] extends keyof T ? K : never }[keyof M];

/** makes all props optional and readonly */
type Finalize<T> = { readonly [K in keyof T]?: T[K] };


interface NodeTypeProp<T> {
	readonly [S_NODE_TYPE]?: T;
}

interface ElemNameProp<N extends string> {
	readonly [S_ELEM_NAME]?: N;
}

interface ChildrenProp {
	readonly children?: JsxChildren;
}

interface NoChildrenProp {
	readonly children?: never;
}

// #region CSS

/** @bake */
export type CSSStyleDeclarationProps = Finalize<WrapProps<ApplyOverrides<OmitFunctions<OmitReadonly<OmitIndex<CSSStyleDeclaration>>>, CSSPropOverrides>>>;

interface CSSPropOverrides {
	anchorName: string;
	positionAnchor: string;
	positionArea: string;

	clip: never;
	cssFloat: never;
	cssText: never;
	fontStretch: never;
	gridColumnGap: never;
	gridGap: never;
	gridRowGap: never;
	imageOrientation: never;
	pageBreakAfter: never;
	pageBreakBefore: never;
	pageBreakInside: never;
	webkitAlignContent: never;
	webkitAlignItems: never;
	webkitAlignSelf: never;
	webkitAnimation: never;
	webkitAnimationDelay: never;
	webkitAnimationDirection: never;
	webkitAnimationDuration: never;
	webkitAnimationFillMode: never;
	webkitAnimationIterationCount: never;
	webkitAnimationName: never;
	webkitAnimationPlayState: never;
	webkitAnimationTimingFunction: never;
	webkitAppearance: never;
	webkitBackfaceVisibility: never;
	webkitBackgroundClip: never;
	webkitBackgroundOrigin: never;
	webkitBackgroundSize: never;
	webkitBorderBottomLeftRadius: never;
	webkitBorderBottomRightRadius: never;
	webkitBorderRadius: never;
	webkitBorderTopLeftRadius: never;
	webkitBorderTopRightRadius: never;
	webkitBoxAlign: never;
	webkitBoxFlex: never;
	webkitBoxOrdinalGroup: never;
	webkitBoxOrient: never;
	webkitBoxPack: never;
	webkitBoxShadow: never;
	webkitBoxSizing: never;
	webkitFilter: never;
	webkitFlex: never;
	webkitFlexBasis: never;
	webkitFlexDirection: never;
	webkitFlexFlow: never;
	webkitFlexGrow: never;
	webkitFlexShrink: never;
	webkitFlexWrap: never;
	webkitJustifyContent: never;
	webkitMask: never;
	webkitMaskBoxImage: never;
	webkitMaskBoxImageOutset: never;
	webkitMaskBoxImageRepeat: never;
	webkitMaskBoxImageSlice: never;
	webkitMaskBoxImageSource: never;
	webkitMaskBoxImageWidth: never;
	webkitMaskClip: never;
	webkitMaskComposite: never;
	webkitMaskImage: never;
	webkitMaskOrigin: never;
	webkitMaskPosition: never;
	webkitMaskRepeat: never;
	webkitMaskSize: never;
	webkitOrder: never;
	webkitPerspective: never;
	webkitPerspectiveOrigin: never;
	webkitTextSizeAdjust: never;
	webkitTransform: never;
	webkitTransformOrigin: never;
	webkitTransformStyle: never;
	webkitTransition: never;
	webkitTransitionDelay: never;
	webkitTransitionDuration: never;
	webkitTransitionProperty: never;
	webkitTransitionTimingFunction: never;
	webkitUserSelect: never;
	wordWrap: never;
}

// #endregion

// #region ARIA

/** @bake */
export type ARIAProps = Finalize<WrapProps<ARIAMixin>>;

// #endregion

// #region HTML

type HTMLProps<T, N extends string, O = {}> = Finalize<NodeTypeProp<T> & ElemNameProp<N> & ChildrenProp & Omit<HTMLRawProps<T, O>, keyof HTMLCommonProps>>;
type HTMLPropsNoChildren<T, N extends string, O = {}> = Finalize<NodeTypeProp<T> & ElemNameProp<N> & NoChildrenProp & Omit<HTMLRawProps<T, O>, keyof HTMLCommonProps>>;
type HTMLRawProps<T, O> = MapProps<WrapProps<ApplyOverrides<Omit<OmitFunctions<OmitReadonly<OmitIndex<T>>>, keyof ARIAProps>, HTMLPropOverrides & O>>, typeof PROP_MAP>;

interface HTMLPropOverrides {
	part: string;

	classList: never;
	innerHTML: never;
	innerText: never;
	nodeValue: never;
	outerHTML: never;
	outerText: never;
	style: never;
	textContent: never;
}

/** @bake */
export type HTMLCommonProps = Finalize<HTMLRawProps<HTMLElement, {}>>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLAnchorElementProps = HTMLProps<HTMLAnchorElement, "a", {
	relList: string;
}>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLAreaElementProps = HTMLPropsNoChildren<HTMLAreaElement, "area", {
	relList: string;
}>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLAudioElementProps = HTMLProps<HTMLAudioElement, "audio">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLBaseElementProps = HTMLPropsNoChildren<HTMLBaseElement, "base">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLElementProps<N extends "abbr" | "address" | "article" | "aside" | "b" | "bdi" | "bdo" | "cite" | "code" | "dd" | "dfn" | "dt" | "em" | "figcaption" | "figure" | "footer" | "header" | "hgroup" | "i" | "kbd" | "main" | "mark" | "nav" | "noscript" | "rp" | "rt" | "ruby" | "s" | "samp" | "search" | "section" | "small" | "strong" | "sub" | "summary" | "sup" | "u" | "var"> = HTMLProps<HTMLElement, N>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLQuoteElementProps<N extends "blockquote" | "q"> = HTMLProps<HTMLQuoteElement, N>;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLBodyElementProps = HTMLProps<HTMLBodyElement>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLBRElementProps = HTMLPropsNoChildren<HTMLBRElement, "br">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLButtonElementProps = HTMLProps<HTMLButtonElement, "button">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLCanvasElementProps = HTMLProps<HTMLCanvasElement, "canvas">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTableCaptionElementProps = HTMLProps<HTMLTableCaptionElement, "caption">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTableColElementProps<N extends "col" | "colgroup"> = HTMLPropsNoChildren<HTMLTableColElement, N>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLDataElementProps = HTMLProps<HTMLDataElement, "data">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLDataListElementProps = HTMLProps<HTMLDataListElement, "datalist">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLModElementProps<N extends "del" | "ins"> = HTMLProps<HTMLModElement, N>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLDetailsElementProps = HTMLProps<HTMLDetailsElement, "details">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLDialogElementProps = HTMLProps<HTMLDialogElement, "dialog">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLDivElementProps = HTMLProps<HTMLDivElement, "div">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLDListElementProps = HTMLProps<HTMLDListElement, "dl">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLEmbedElementProps = HTMLPropsNoChildren<HTMLEmbedElement, "embed">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLFieldSetElementProps = HTMLProps<HTMLFieldSetElement, "fieldset">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLFormElementProps = HTMLProps<HTMLFormElement, "form", {
	relList: string;
}>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLHeadingElementProps<N extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = HTMLProps<HTMLHeadingElement, N>;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLHeadElementProps = HTMLProps<HTMLHeadElement, "head">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLHRElementProps = HTMLPropsNoChildren<HTMLHRElement, "hr">;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLHtmlElementProps = HTMLProps<HTMLHtmlElement, "html">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLIFrameElementProps = HTMLProps<HTMLIFrameElement, "iframe">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLImageElementProps = HTMLPropsNoChildren<HTMLImageElement, "img">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLInputElementProps = HTMLPropsNoChildren<HTMLInputElement, "input">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLLabelElementProps = HTMLProps<HTMLLabelElement, "label">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLLegendElementProps = HTMLProps<HTMLLegendElement, "legend">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLLIElementProps = HTMLProps<HTMLLIElement, "li">;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLLinkElementProps = HTMLPropsNoChildren<HTMLLinkElement, "link">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLMapElementProps = HTMLProps<HTMLMapElement, "map">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLMenuElementProps = HTMLProps<HTMLMenuElement, "menu">;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLMetaElementProps = HTMLPropsNoChildren<HTMLMetaElement, "meta">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLMeterElementProps = HTMLProps<HTMLMeterElement, "meter">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLObjectElementProps = HTMLProps<HTMLObjectElement, "object">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLOListElementProps = HTMLProps<HTMLOListElement, "ol">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLOptGroupElementProps = HTMLProps<HTMLOptGroupElement, "optgroup">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLOptionElementProps = HTMLProps<HTMLOptionElement, "option">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLOutputElementProps = HTMLProps<HTMLOutputElement, "output">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLParagraphElementProps = HTMLProps<HTMLParagraphElement, "p">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLPictureElementProps = HTMLProps<HTMLPictureElement, "picture">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLPreElementProps = HTMLProps<HTMLPreElement, "pre">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLProgressElementProps = HTMLProps<HTMLProgressElement, "progress">;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLScriptElementProps = HTMLProps<HTMLScriptElement, "script">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLSelectElementProps = HTMLProps<HTMLSelectElement, "select">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLSlotElementProps = HTMLProps<HTMLSlotElement, "slot">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLSourceElementProps = HTMLPropsNoChildren<HTMLSourceElement, "source">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLSpanElementProps = HTMLProps<HTMLSpanElement, "span">;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLStyleElementProps = HTMLProps<HTMLStyleElement, "style">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTableElementProps = HTMLProps<HTMLTableElement, "table">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTableSectionElementProps<N extends "tbody" | "tfoot" | "thead"> = HTMLProps<HTMLTableSectionElement, N>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTableCellElementProps<N extends "td" | "th"> = HTMLProps<HTMLTableCellElement, N>;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTemplateElementProps = HTMLProps<HTMLTemplateElement, "template">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTextAreaElementProps = HTMLProps<HTMLTextAreaElement, "textarea">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTimeElementProps = HTMLProps<HTMLTimeElement, "time">;

// /**
//  * @bake
//  * @extends HTMLCommonProps
//  */
// export type HTMLTitleElementProps = HTMLProps<HTMLTitleElement, "title">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTableRowElementProps = HTMLProps<HTMLTableRowElement, "tr">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLTrackElementProps = HTMLPropsNoChildren<HTMLTrackElement, "track">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLUListElementProps = HTMLProps<HTMLUListElement, "ul">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLVideoElementProps = HTMLProps<HTMLVideoElement, "video">;

/**
 * @bake
 * @extends HTMLCommonProps
 */
export type HTMLWbrElementProps = HTMLPropsNoChildren<HTMLElement, "wbr">;

/** @preserve */
export interface HTMLIntrinsicElements {
	a: HTMLAnchorElementProps;
	abbr: HTMLElementProps<"abbr">;
	address: HTMLElementProps<"address">;
	area: HTMLAreaElementProps;
	article: HTMLElementProps<"article">;
	aside: HTMLElementProps<"aside">;
	audio: HTMLAudioElementProps;
	b: HTMLElementProps<"b">;
	base: HTMLBaseElementProps;
	bdi: HTMLElementProps<"bdi">;
	bdo: HTMLElementProps<"bdo">;
	blockquote: HTMLQuoteElementProps<"blockquote">;
	// body: HTMLBodyElementProps;
	br: HTMLBRElementProps;
	button: HTMLButtonElementProps;
	canvas: HTMLCanvasElementProps;
	caption: HTMLTableCaptionElementProps;
	cite: HTMLElementProps<"cite">;
	code: HTMLElementProps<"code">;
	col: HTMLTableColElementProps<"col">;
	colgroup: HTMLTableColElementProps<"colgroup">;
	data: HTMLDataElementProps;
	datalist: HTMLDataListElementProps;
	dd: HTMLElementProps<"dd">;
	del: HTMLModElementProps<"del">;
	details: HTMLDetailsElementProps;
	dfn: HTMLElementProps<"dfn">;
	dialog: HTMLDialogElementProps;
	div: HTMLDivElementProps;
	dl: HTMLDListElementProps;
	dt: HTMLElementProps<"dt">;
	em: HTMLElementProps<"em">;
	embed: HTMLEmbedElementProps;
	fieldset: HTMLFieldSetElementProps;
	figcaption: HTMLElementProps<"figcaption">;
	figure: HTMLElementProps<"figure">;
	footer: HTMLElementProps<"footer">;
	form: HTMLFormElementProps;
	h1: HTMLHeadingElementProps<"h1">;
	h2: HTMLHeadingElementProps<"h2">;
	h3: HTMLHeadingElementProps<"h3">;
	h4: HTMLHeadingElementProps<"h4">;
	h5: HTMLHeadingElementProps<"h5">;
	h6: HTMLHeadingElementProps<"h6">;
	// head: HTMLHeadElementProps;
	header: HTMLElementProps<"header">;
	hgroup: HTMLElementProps<"hgroup">;
	hr: HTMLHRElementProps;
	// html: HTMLHtmlElementProps;
	i: HTMLElementProps<"i">;
	iframe: HTMLIFrameElementProps;
	img: HTMLImageElementProps;
	input: HTMLInputElementProps;
	ins: HTMLModElementProps<"ins">;
	kbd: HTMLElementProps<"kbd">;
	label: HTMLLabelElementProps;
	legend: HTMLLegendElementProps;
	li: HTMLLIElementProps;
	// link: HTMLLinkElementProps;
	main: HTMLElementProps<"main">;
	map: HTMLMapElementProps;
	mark: HTMLElementProps<"mark">;
	menu: HTMLMenuElementProps;
	// meta: HTMLMetaElementProps;
	meter: HTMLMeterElementProps;
	nav: HTMLElementProps<"nav">;
	noscript: HTMLElementProps<"noscript">;
	object: HTMLObjectElementProps;
	ol: HTMLOListElementProps;
	optgroup: HTMLOptGroupElementProps;
	option: HTMLOptionElementProps;
	output: HTMLOutputElementProps;
	p: HTMLParagraphElementProps;
	picture: HTMLPictureElementProps;
	pre: HTMLPreElementProps;
	progress: HTMLProgressElementProps;
	q: HTMLQuoteElementProps<"q">;
	rp: HTMLElementProps<"rp">;
	rt: HTMLElementProps<"rt">;
	ruby: HTMLElementProps<"ruby">;
	s: HTMLElementProps<"s">;
	samp: HTMLElementProps<"samp">;
	// script: HTMLScriptElementProps;
	search: HTMLElementProps<"search">;
	section: HTMLElementProps<"section">;
	select: HTMLSelectElementProps;
	slot: HTMLSlotElementProps;
	small: HTMLElementProps<"small">;
	source: HTMLSourceElementProps;
	span: HTMLSpanElementProps;
	strong: HTMLElementProps<"strong">;
	// style: HTMLStyleElementProps;
	sub: HTMLElementProps<"sub">;
	summary: HTMLElementProps<"summary">;
	sup: HTMLElementProps<"sup">;
	table: HTMLTableElementProps;
	tbody: HTMLTableSectionElementProps<"tbody">;
	td: HTMLTableCellElementProps<"td">;
	template: HTMLTemplateElementProps;
	textarea: HTMLTextAreaElementProps;
	tfoot: HTMLTableSectionElementProps<"tfoot">;
	th: HTMLTableCellElementProps<"th">;
	thead: HTMLTableSectionElementProps<"thead">;
	time: HTMLTimeElementProps;
	// title: HTMLTitleElementProps;
	tr: HTMLTableRowElementProps;
	track: HTMLTrackElementProps;
	u: HTMLElementProps<"u">;
	ul: HTMLUListElementProps;
	var: HTMLElementProps<"var">;
	video: HTMLVideoElementProps;
	wbr: HTMLWbrElementProps;
}

// #endregion

// #region SVG

// SVG attributes on MDN:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute

/** @bake */
export type SVGCommonProps = Finalize<WrapProps<{
	autofocus: boolean;
	class: string;
	color: string;
	display: string;
	filter: string;
	id: string;
	lang: string;
	style: string;
	tabindex: number | string;
	transform: string;
	"transform-origin": string;
}>>;

type SVGProps<T, N extends string, P = {}> = Finalize<NodeTypeProp<T> & ElemNameProp<N> & ChildrenProp & WrapProps<P>>;
type SVGPropsNoChildren<T, N extends string, P = {}> = Finalize<NodeTypeProp<T> & ElemNameProp<N> & NoChildrenProp & WrapProps<P>>;

/** @preserve */
export type SVGAccumulate = "none" | "sum";

/** @preserve */
export type SVGAdditive = "replace" | "sum";

/** @preserve */
export type SVGAlignmentBaseline = "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "top" | "center" | "bottom";

/** @preserve */
export type SVGCalcMode = "discrete" | "linear" | "paced" | "spline";

/** @preserve */
export type SVGClipRule = "nonzero" | "evenodd" | "inherit";

/** @preserve */
export type SVGColorInterpolationFilters = "auto" | "sRGB" | "linearRGB";

/** @preserve */
export type SVGCrossOrigin = "" | "anonymous" | "use-credentials";

/** @preserve */
export type SVGTextDirection = "rtl" | "ltr";

/** @preserve */
export type SVGDominantBaseline = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top";

/** @preserve */
export type SVGEdgeMode = "duplicate" | "wrap" | "none";

/** @preserve */
export type SVGFillMode = "freeze" | "remove";

/** @preserve */
export type SVGFillRule = "nonzero" | "evenodd";

/** @preserve */
export type SVGFontStyle = "normal" | "italic" | "oblique";

/** @preserve */
export type SVGUnits = "userSpaceOnUse" | "objectBoundingBox";

/** @preserve */
export type SVGLengthAdjust = "spacing" | "spacingAndGlyphs";

/** @preserve */
export type SVGOverflow = "visible" | "hidden" | "scroll" | "auto";

/** @preserve */
export type SVGPointerEvents = "bounding-box" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all" | "none";

/** @preserve */
export type SVGRestart = "always" | "whenNotActive" | "never";

/** @preserve */
export type SVGShapeRendering = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";

/** @preserve */
export type SVGSpreadMethod = "pad" | "reflect" | "repeat";

/** @preserve */
export type SVGStrokeLineCap = "butt" | "round" | "square";

/** @preserve */
export type SVGStrokeLineJoin = "arcs" | "bevel" | "miter" | "miter-clip" | "round";

/** @preserve */
export type SVGTextAnchor = "start" | "middle" | "end";

/** @preserve */
export type SVGUnicodeBidi = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";

/** @preserve */
export type SVGVectorEffect = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";

/** @preserve */
export type SVGVisibility = "visible" | "hidden" | "collapse";

/** @preserve */
export type SVGWhiteSpace = "normal" | "pre" | "nowrap" | "pre-wrap" | "break-space" | "pre-line";

/** @preserve */
export type SVGWritingMode = "horizontal-tb" | "vertical-rl" | "vertical-lr";

/** @preserve */
export type SVGColorChannel = "R" | "G" | "B" | "A";

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGAElementProps = SVGProps<SVGAElement, "a", {
	"clip-path": string;
	cursor: string;
	href: string;
	mask: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	referrerpolicy: ReferrerPolicy;
	rel: string;
	requiredExtensions: string;
	systemLanguage: string;
	target: string;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGAnimateElementProps = SVGProps<SVGAnimateElement, "animate", {
	accumulate: SVGAccumulate;
	additive: SVGAdditive;
	attributeName: string;
	begin: string;
	by: number | string;
	calcMode: SVGCalcMode;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	from: number | string;
	href: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	max: string;
	min: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	systemLanguage: string;
	to: number | string;
	values: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGAnimateMotionElementProps = SVGProps<SVGAnimateMotionElement, "animateMotion", {
	accumulate: SVGAccumulate;
	additive: SVGAdditive;
	begin: string;
	by: number | string;
	calcMode: SVGCalcMode;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	from: number | string;
	href: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	max: string;
	min: string;
	path: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	rotate: number | "auto" | "auto-reverse";
	systemLanguage: string;
	to: number | string;
	values: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGAnimateTransformElementProps = SVGProps<SVGAnimateTransformElement, "animateTransform", {
	accumulate: SVGAccumulate;
	additive: SVGAdditive;
	attributeName: string;
	begin: string;
	by: number | string;
	calcMode: SVGCalcMode;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	from: number | string;
	href: string;
	keyPoints: string;
	keySplines: string;
	keyTimes: string;
	max: string;
	min: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	systemLanguage: string;
	to: number | string;
	type: string;
	values: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGCircleElementProps = SVGPropsNoChildren<SVGCircleElement, "circle", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	cx: number | string;
	cy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	r: number | string;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGClipPathElementProps = SVGProps<SVGClipPathElement, "clipPath", {
	"clip-path": string;
	clipPathUnits: SVGUnits;
	mask: string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGDefsElementProps = SVGProps<SVGDefsElement, "defs", {
	cursor: string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGDescElementProps = SVGProps<SVGDescElement, "desc">;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGEllipseElementProps = SVGPropsNoChildren<SVGEllipseElement, "ellipse", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	cx: number | string;
	cy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	rx: number | string;
	ry: number | string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEBlendElementProps = SVGProps<SVGFEBlendElement, "feBlend", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	in2: string;
	mode: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEColorMatrixElementProps = SVGProps<SVGFEColorMatrixElement, "feColorMatrix", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	result: string;
	type: string;
	values: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEComponentTransferElementProps = SVGProps<SVGFEComponentTransferElement, "feComponentTransfer", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFECompositeElementProps = SVGProps<SVGFECompositeElement, "feComposite", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	in2: string;
	k1: number | string;
	k2: number | string;
	k3: number | string;
	k4: number | string;
	operator: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEConvolveMatrixElementProps = SVGProps<SVGFEConvolveMatrixElement, "feConvolveMatrix", {
	bias: number | string;
	"color-interpolation-filters": SVGColorInterpolationFilters;
	divisor: number | string;
	edgeMode: SVGEdgeMode;
	height: number | string;
	in: string;
	kernelMatrix: string;
	kernelUnitLength: number | string;
	order: number | string;
	preserveAlpha: boolean | string;
	result: string;
	targetX: number | string;
	targetY: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEDiffuseLightingElementProps = SVGProps<SVGFEDiffuseLightingElement, "feDiffuseLighting", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	diffuseConstant: number | string;
	height: number | string;
	in: string;
	kernelUnitLength: number | string;
	"lighting-color": string;
	result: string;
	surfaceScale: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEDisplacementMapElementProps = SVGProps<SVGFEDisplacementMapElement, "feDisplacementMap", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	in2: string;
	result: string;
	scale: number | string;
	width: number | string;
	x: number | string;
	xChannelSelector: SVGColorChannel;
	y: number | string;
	yChannelSelector: SVGColorChannel;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEDistantLightElementProps = SVGProps<SVGFEDistantLightElement, "feDistantLight", {
	azimuth: number | string;
	elevation: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEDropShadowElementProps = SVGProps<SVGFEDropShadowElement, "feDropShadow", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	dx: number | string;
	dy: number | string;
	"flood-color": string;
	"flood-opacity": number | string;
	height: number | string;
	in: string;
	result: string;
	stdDeviation: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEFloodElementProps = SVGProps<SVGFEFloodElement, "feFlood", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	"flood-color": string;
	"flood-opacity": number | string;
	height: number | string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEFuncAElementProps = SVGProps<SVGFEFuncAElement, "feFuncA", {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEFuncBElementProps = SVGProps<SVGFEFuncBElement, "feFuncB", {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEFuncGElementProps = SVGProps<SVGFEFuncGElement, "feFuncG", {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEFuncRElementProps = SVGProps<SVGFEFuncRElement, "feFuncR", {
	amplitude: number | string;
	exponent: number | string;
	intercept: number | string;
	slope: number | string;
	tableValues: string;
	type: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEGaussianBlurElementProps = SVGProps<SVGFEGaussianBlurElement, "feGaussianBlur", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	edgeMode: SVGEdgeMode;
	height: number | string;
	in: string;
	result: string;
	stdDeviation: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEImageElementProps = SVGProps<SVGFEImageElement, "feImage", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	href: string;
	preserveAspectRatio: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEMergeElementProps = SVGProps<SVGFEMergeElement, "feMerge", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEMergeNodeElementProps = SVGProps<SVGFEMergeNodeElement, "feMergeNode", {
	in: string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEMorphologyElementProps = SVGProps<SVGFEMorphologyElement, "feMorphology", {
	height: number | string;
	in: string;
	operator: "erode" | "dilate";
	radius: number | string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEOffsetElementProps = SVGProps<SVGFEOffsetElement, "feOffset", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	dx: number | string;
	dy: number | string;
	height: number | string;
	in: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFEPointLightElementProps = SVGProps<SVGFEPointLightElement, "fePointLight", {
	x: number | string;
	y: number | string;
	z: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFESpecularLightingElementProps = SVGProps<SVGFESpecularLightingElement, "feSpecularLighting", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	kernelUnitLength: number | string;
	"lighting-color": string;
	result: string;
	specularConstant: number | string;
	specularExponent: number | string;
	surfaceScale: number | string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFESpotLightElementProps = SVGProps<SVGFESpotLightElement, "feSpotLight", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	limitingConeAngle: number | string;
	pointsAtX: number | string;
	pointsAtY: number | string;
	pointsAtZ: number | string;
	specularExponent: number | string;
	x: number | string;
	y: number | string;
	z: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFETileElementProps = SVGProps<SVGFETileElement, "feTile", {
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	in: string;
	result: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFETurbulenceElementProps = SVGProps<SVGFETurbulenceElement, "feTurbulence", {
	baseFrequency: number | string;
	"color-interpolation-filters": SVGColorInterpolationFilters;
	height: number | string;
	numOctaves: number | string;
	result: string;
	seed: number | string;
	stitchTiles: "noStitch" | "stitch";
	type: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGFilterElementProps = SVGProps<SVGFilterElement, "filter", {
	filterUnits: SVGUnits;
	height: number | string;
	primitiveUnits: SVGUnits;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGForeignObjectElementProps = SVGProps<SVGForeignObjectElement, "foreignObject", {
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGGElementProps = SVGProps<SVGGElement, "g", {
	"clip-path": string;
	cursor: string;
	mask: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGImageElementProps = SVGPropsNoChildren<SVGImageElement, "image", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	crossorigin: SVGCrossOrigin;
	cursor: string;
	decoding: "auto" | "sync" | "async";
	height: number | string;
	href: string;
	"image-rendering": "auto" | "optimizeSpeed" | "optimizeQuality";
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	requiredExtensions: string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGLineElementProps = SVGPropsNoChildren<SVGLineElement, "line", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	orient: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	x1: number | string;
	x2: number | string;
	y1: number | string;
	y2: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGLinearGradientElementProps = SVGProps<SVGLinearGradientElement, "linearGradient", {
	gradientTransform: string;
	gradientUnits: SVGUnits;
	href: string;
	spreadMethod: SVGSpreadMethod;
	x1: number | string;
	x2: number | string;
	y1: number | string;
	y2: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGMarkerElementProps = SVGProps<SVGMarkerElement, "marker", {
	"clip-path": string;
	cursor: string;
	markerHeight: number | string;
	markerUnits: "userSpaceOnUse" | "strokeWidth";
	markerWidth: number | string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	refX: number | string;
	refY: number | string;
	viewBox: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGMaskElementProps = SVGProps<SVGMaskElement, "mask", {
	"clip-path": string;
	cursor: string;
	height: number | string;
	mask: string;
	"mask-type": "alpha" | "luminance";
	maskContentUnits: SVGUnits;
	maskUnits: SVGUnits;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGMetadataElementProps = SVGProps<SVGMetadataElement, "metadata">;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGMPathElementProps = SVGProps<SVGMPathElement, "mpath", {
	href: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGPathElementProps = SVGPropsNoChildren<SVGPathElement, "path", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	d: string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGPatternElementProps = SVGProps<SVGPatternElement, "pattern", {
	"clip-path": string;
	cursor: string;
	height: number | string;
	href: string;
	mask: string;
	overflow: SVGOverflow;
	patternContentUnits: SVGUnits;
	patternTransform: string;
	patternUnits: SVGUnits;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	requiredExtensions: string;
	systemLanguage: string;
	viewBox: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGPolygonElementProps = SVGPropsNoChildren<SVGPolygonElement, "polygon", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	points: string;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGPolylineElementProps = SVGPropsNoChildren<SVGPolylineElement, "polyline", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	points: string;
	requiredExtensions: string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGRadialGradientElementProps = SVGProps<SVGRadialGradientElement, "radialGradient", {
	cx: number | string;
	cy: number | string;
	fr: number | string;
	fx: number | string;
	fy: number | string;
	gradientTransform: string;
	gradientUnits: SVGUnits;
	href: string;
	r: number | string;
	spreadMethod: SVGSpreadMethod;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGRectElementProps = SVGPropsNoChildren<SVGRectElement, "rect", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	fill: string;
	"fill-opacity": number | string;
	height: number | string;
	"marker-end": string;
	"marker-mid": string;
	"marker-start": string;
	mask: string;
	opacity: number | string;
	"paint-order": string;
	pathLength: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	rx: number | string;
	ry: number | string;
	"shape-rendering": SVGShapeRendering;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

// /**
//  * @bake
//  * @extends SVGGlobalProps
//  */
// export type SVGScriptElementProps = SVGProps<SVGScriptElement, "script", {
// 	crossorigin: SVGCrossOrigin;
// 	href: string;
// 	type: string;
// }>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGSetElementProps = SVGProps<SVGSetElement, "set", {
	attributeName: string;
	begin: string;
	dur: number | string;
	end: string;
	fill: SVGFillMode;
	href: string;
	keyPoints: string;
	max: string;
	min: string;
	repeatCount: number | "indefinite";
	repeatDur: number | string;
	requiredExtensions: string;
	restart: SVGRestart;
	systemLanguage: string;
	to: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGStopElementProps = SVGPropsNoChildren<SVGStopElement, "stop", {
	"stop-color": string;
	"stop-opacity": number | string;
}>;

// /**
//  * @bake
//  * @extends SVGGlobalProps
//  */
// export type SVGStyleElementProps = SVGProps<SVGStyleElement, "style", {
// 	media: string;
// 	type: string;
// }>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGSVGElementProps = SVGProps<SVGSVGElement, "svg", {
	"clip-path": string;
	cursor: string;
	fill: string;
	height: number | string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	requiredExtensions: string;
	stroke: string;
	systemLanguage: string;
	viewBox: string;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGSwitchElementProps = SVGProps<SVGSwitchElement, "switch", {
	cursor: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGSymbolElementProps = SVGProps<SVGSymbolElement, "symbol", {
	"clip-path": string;
	cursor: string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"pointer-events": SVGPointerEvents;
	preserveAspectRatio: string;
	viewBox: string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGTextElementProps = SVGProps<SVGTextElement, "text", {
	"alignment-baseline": SVGAlignmentBaseline;
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	direction: SVGTextDirection;
	"dominant-baseline": SVGDominantBaseline;
	dx: number | string;
	dy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"font-family": string;
	"font-size": number | string;
	"font-size-adjust": string;
	"font-style": SVGFontStyle;
	"font-variant": string;
	"font-weight": number | string;
	lengthAdjust: SVGLengthAdjust;
	"letter-spacing": string;
	mask: string;
	opacity: number | string;
	overflow: SVGOverflow;
	"paint-order": string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"text-anchor": SVGTextAnchor;
	"text-decoration": string;
	"text-overflow": "clip" | "ellipses";
	"text-rendering": "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
	textLength: number | string;
	"unicode-bidi": SVGUnicodeBidi;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	"white-space": SVGWhiteSpace;
	"word-spacing": number | string;
	"writing-mode": SVGWritingMode;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGTextPathElementProps = SVGProps<SVGTextPathElement, "textPath", {
	"alignment-baseline": SVGAlignmentBaseline;
	"baseline-shift": string;
	direction: SVGTextDirection;
	"dominant-baseline": SVGDominantBaseline;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"font-family": string;
	"font-size": number | string;
	"font-size-adjust": string;
	"font-style": SVGFontStyle;
	"font-variant": string;
	"font-weight": number | string;
	href: string;
	lengthAdjust: SVGLengthAdjust;
	"letter-spacing": string;
	method: "align" | "stretch";
	opacity: number | string;
	"paint-order": string;
	path: string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	spacing: "auto" | "exact";
	startOffset: number | string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"text-anchor": SVGTextAnchor;
	"text-decoration": string;
	"text-overflow": "clip" | "ellipses";
	textLength: number | string;
	"unicode-bidi": SVGUnicodeBidi;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	"white-space": SVGWhiteSpace;
	"word-spacing": number | string;
	"writing-mode": SVGWritingMode;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGTitleElementProps = SVGProps<SVGTitleElement, "title">;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGTSpanElementProps = SVGProps<SVGTSpanElement, "tspan", {
	"alignment-baseline": SVGAlignmentBaseline;
	"baseline-shift": string;
	direction: SVGTextDirection;
	"dominant-baseline": SVGDominantBaseline;
	dx: number | string;
	dy: number | string;
	fill: string;
	"fill-opacity": number | string;
	"fill-rule": SVGFillRule;
	"font-family": string;
	"font-size": number | string;
	"font-size-adjust": string;
	"font-style": SVGFontStyle;
	"font-variant": string;
	"font-weight": number | string;
	lengthAdjust: SVGLengthAdjust;
	"letter-spacing": string;
	opacity: number | string;
	"paint-order": string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	stroke: string;
	"stroke-dasharray": string;
	"stroke-dashoffset": number | string;
	"stroke-linecap": SVGStrokeLineCap;
	"stroke-linejoin": SVGStrokeLineJoin;
	"stroke-miterlimit": number | string;
	"stroke-opacity": number | string;
	"stroke-width": number | string;
	systemLanguage: string;
	"text-anchor": SVGTextAnchor;
	"text-decoration": string;
	"text-overflow": "clip" | "ellipses";
	textLength: number | string;
	"unicode-bidi": SVGUnicodeBidi;
	"vector-effect": SVGVectorEffect;
	visibility: SVGVisibility;
	"white-space": SVGWhiteSpace;
	"word-spacing": number | string;
	"writing-mode": SVGWritingMode;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGUseElementProps = SVGPropsNoChildren<SVGUseElement, "use", {
	"clip-path": string;
	"clip-rule": SVGClipRule;
	cursor: string;
	height: number | string;
	href: string;
	mask: string;
	opacity: number | string;
	"pointer-events": SVGPointerEvents;
	requiredExtensions: string;
	systemLanguage: string;
	"vector-effect": SVGVectorEffect;
	width: number | string;
	x: number | string;
	y: number | string;
}>;

/**
 * @bake
 * @extends SVGCommonProps
 */
export type SVGViewElementProps = SVGProps<SVGViewElement, "view", {
	preserveAspectRatio: string;
	viewBox: string;
}>;

/** @preserve */
export interface SVGIntrinsicElements {
	// conflict with HTML <a>
	// a: SVGAElementProps;
	animate: SVGAnimateElementProps;
	animateMotion: SVGAnimateMotionElementProps;
	animateTransform: SVGAnimateTransformElementProps;
	circle: SVGCircleElementProps;
	clipPath: SVGClipPathElementProps;
	defs: SVGDefsElementProps;
	desc: SVGDescElementProps;
	ellipse: SVGEllipseElementProps;
	feBlend: SVGFEBlendElementProps;
	feColorMatrix: SVGFEColorMatrixElementProps;
	feComponentTransfer: SVGFEComponentTransferElementProps;
	feComposite: SVGFECompositeElementProps;
	feConvolveMatrix: SVGFEConvolveMatrixElementProps;
	feDiffuseLighting: SVGFEDiffuseLightingElementProps;
	feDisplacementMap: SVGFEDisplacementMapElementProps;
	feDistantLight: SVGFEDistantLightElementProps;
	feDropShadow: SVGFEDropShadowElementProps;
	feFlood: SVGFEFloodElementProps;
	feFuncA: SVGFEFuncAElementProps;
	feFuncB: SVGFEFuncBElementProps;
	feFuncG: SVGFEFuncGElementProps;
	feFuncR: SVGFEFuncRElementProps;
	feGaussianBlur: SVGFEGaussianBlurElementProps;
	feImage: SVGFEImageElementProps;
	feMerge: SVGFEMergeElementProps;
	feMergeNode: SVGFEMergeNodeElementProps;
	feMorphology: SVGFEMorphologyElementProps;
	feOffset: SVGFEOffsetElementProps;
	fePointLight: SVGFEPointLightElementProps;
	feSpecularLighting: SVGFESpecularLightingElementProps;
	feSpotLight: SVGFESpotLightElementProps;
	feTile: SVGFETileElementProps;
	feTurbulence: SVGFETurbulenceElementProps;
	filter: SVGFilterElementProps;
	foreignObject: SVGForeignObjectElementProps;
	g: SVGGElementProps;
	image: SVGImageElementProps;
	line: SVGLineElementProps;
	linearGradient: SVGLinearGradientElementProps;
	marker: SVGMarkerElementProps;
	mask: SVGMaskElementProps;
	metadata: SVGMetadataElementProps;
	mpath: SVGMPathElementProps;
	path: SVGPathElementProps;
	pattern: SVGPatternElementProps;
	polygon: SVGPolygonElementProps;
	polyline: SVGPolylineElementProps;
	radialGradient: SVGRadialGradientElementProps;
	rect: SVGRectElementProps;
	// script: SVGScriptElementProps;
	set: SVGSetElementProps;
	stop: SVGStopElementProps;
	// style: SVGStyleElementProps;
	switch: SVGSwitchElementProps;
	symbol: SVGSymbolElementProps;
	text: SVGTextElementProps;
	textPath: SVGTextPathElementProps;
	title: SVGTitleElementProps;
	tspan: SVGTSpanElementProps;
	use: SVGUseElementProps;
	view: SVGViewElementProps;

	// intentionally uppercase, handled by the Svg component
	Svg: SVGSVGElementProps;
}

// #endregion

// #region MathML

// MathML attributes on MDN:
// https://developer.mozilla.org/en-US/docs/Web/MathML/Reference/Global_attributes

/** @bake */
export type MathMLCommonProps = Finalize<WrapProps<{
	dir: "ltr" | "rtl";
	displaystyle: boolean;
	mathbackground: string;
	mathcolor: string;
	mathsize: string;
	scriptlevel: string;
}>>;

type MathMLProps<T, N extends string, P = {}> = Finalize<NodeTypeProp<T> & ElemNameProp<N> & ChildrenProp & WrapProps<P>>;
type MathMLPropsNoChildren<T, N extends string, P = {}> = Finalize<NodeTypeProp<T> & ElemNameProp<N> & NoChildrenProp & WrapProps<P>>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MathMLElementProps<N extends "merror" | "mmultiscripts" | "mn" | "mphantom" | "mprescripts" | "mroot" | "ms" | "msqrt" | "mstyle" | "msub" | "msup" | "msubsup" | "mtable" | "mtr"> = MathMLProps<MathMLElement, N>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MathMLMathElementProps = MathMLProps<MathMLElement, "mathml", {
	display: "block" | "inline";
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLFracElementProps = MathMLPropsNoChildren<MathMLElement, "mfrac", {
	linethickness: string;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLIElementProps = MathMLProps<MathMLElement, "mi", {
	mathvariant: "normal";
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLOElementProps = MathMLProps<MathMLElement, "mo", {
	fence: boolean;
	form: "prefix" | "infix" | "postfix";
	largeop: boolean;
	lspace: string;
	maxsize: string;
	minsize: string;
	movablelimits: boolean;
	rspace: string;
	separator: boolean;
	stretchy: boolean;
	symmetric: boolean;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLOverElementProps = MathMLProps<MathMLElement, "mover", {
	accent: boolean;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLPaddedElementProps = MathMLProps<MathMLElement, "mpadded", {
	depth: string;
	height: string;
	lspace: string;
	voffset: string;
	width: string;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLRowElementProps = MathMLPropsNoChildren<MathMLElement, "mrow">;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLSpaceElementProps = MathMLProps<MathMLElement, "mspace", {
	depth: string;
	height: string;
	width: string;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLTDElementProps = MathMLProps<MathMLElement, "mtd", {
	columnspan: number | string;
	rowspan: number | string;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLTextElementProps = MathMLPropsNoChildren<MathMLElement, "mtext">;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLUnderElementProps = MathMLProps<MathMLElement, "munder", {
	accentunder: boolean;
}>;

/**
 * @bake
 * @extends MathMLCommonProps
 */
export type MatMLUnderOverElementProps = MathMLProps<MathMLElement, "munderover", {
	accent: boolean;
	accentunder: boolean;
}>;

/** @preserve */
export interface MathMLIntrinsicElements {
	merror: MathMLElementProps<"merror">;
	mfrac: MatMLFracElementProps;
	mi: MatMLIElementProps;
	mmultiscripts: MathMLElementProps<"mmultiscripts">;
	mn: MathMLElementProps<"mn">;
	mo: MatMLOElementProps;
	mover: MatMLOverElementProps;
	mpadded: MatMLPaddedElementProps;
	mphantom: MathMLElementProps<"mphantom">;
	mprescripts: MathMLElementProps<"mprescripts">;
	mroot: MathMLElementProps<"mroot">;
	mrow: MatMLRowElementProps;
	ms: MathMLElementProps<"ms">;
	mspace: MatMLSpaceElementProps;
	msqrt: MathMLElementProps<"msqrt">;
	mstyle: MathMLElementProps<"mstyle">;
	msub: MathMLElementProps<"msub">;
	msup: MathMLElementProps<"msup">;
	msubsup: MathMLElementProps<"msubsup">;
	mtable: MathMLElementProps<"mtable">;
	mtd: MatMLTDElementProps;
	mtext: MatMLTextElementProps;
	mtr: MathMLElementProps<"mtr">;
	munder: MatMLUnderElementProps;
	munderover: MatMLUnderOverElementProps;

	// intentionally uppercase, handled by the MathML component
	MathML: MathMLMathElementProps;

	// difficult to support due to the inclusion of extra XML namespaces:
	// - semantics
	// - annotation
	// - annotation-xml
}

// #endregion

/**
 * describes the props of all usable DOM elements
 * @preserve
 */
export interface IntrinsicElements extends HTMLIntrinsicElements, SVGIntrinsicElements, MathMLIntrinsicElements {}
