// baked types - do not modify, changes will be lost
// source file: inferred.ts

import type { JsxChildren, MaybeAtom, S_ELEM_NAME, S_NODE_TYPE } from "@calmdown/pyxis/core";

export interface CSSStyleDeclarationProps {
	readonly accentColor?: MaybeAtom<string>;
	readonly alignContent?: MaybeAtom<string>;
	readonly alignItems?: MaybeAtom<string>;
	readonly alignSelf?: MaybeAtom<string>;
	readonly alignmentBaseline?: MaybeAtom<string>;
	readonly all?: MaybeAtom<string>;
	readonly anchorScope?: MaybeAtom<string>;
	readonly animation?: MaybeAtom<string>;
	readonly animationComposition?: MaybeAtom<string>;
	readonly animationDelay?: MaybeAtom<string>;
	readonly animationDirection?: MaybeAtom<string>;
	readonly animationDuration?: MaybeAtom<string>;
	readonly animationFillMode?: MaybeAtom<string>;
	readonly animationIterationCount?: MaybeAtom<string>;
	readonly animationName?: MaybeAtom<string>;
	readonly animationPlayState?: MaybeAtom<string>;
	readonly animationRange?: MaybeAtom<string>;
	readonly animationRangeEnd?: MaybeAtom<string>;
	readonly animationRangeStart?: MaybeAtom<string>;
	readonly animationTimeline?: MaybeAtom<string>;
	readonly animationTimingFunction?: MaybeAtom<string>;
	readonly appearance?: MaybeAtom<string>;
	readonly aspectRatio?: MaybeAtom<string>;
	readonly backdropFilter?: MaybeAtom<string>;
	readonly backfaceVisibility?: MaybeAtom<string>;
	readonly background?: MaybeAtom<string>;
	readonly backgroundAttachment?: MaybeAtom<string>;
	readonly backgroundBlendMode?: MaybeAtom<string>;
	readonly backgroundClip?: MaybeAtom<string>;
	readonly backgroundColor?: MaybeAtom<string>;
	readonly backgroundImage?: MaybeAtom<string>;
	readonly backgroundOrigin?: MaybeAtom<string>;
	readonly backgroundPosition?: MaybeAtom<string>;
	readonly backgroundPositionX?: MaybeAtom<string>;
	readonly backgroundPositionY?: MaybeAtom<string>;
	readonly backgroundRepeat?: MaybeAtom<string>;
	readonly backgroundSize?: MaybeAtom<string>;
	readonly baselineShift?: MaybeAtom<string>;
	readonly baselineSource?: MaybeAtom<string>;
	readonly blockSize?: MaybeAtom<string>;
	readonly border?: MaybeAtom<string>;
	readonly borderBlock?: MaybeAtom<string>;
	readonly borderBlockColor?: MaybeAtom<string>;
	readonly borderBlockEnd?: MaybeAtom<string>;
	readonly borderBlockEndColor?: MaybeAtom<string>;
	readonly borderBlockEndStyle?: MaybeAtom<string>;
	readonly borderBlockEndWidth?: MaybeAtom<string>;
	readonly borderBlockStart?: MaybeAtom<string>;
	readonly borderBlockStartColor?: MaybeAtom<string>;
	readonly borderBlockStartStyle?: MaybeAtom<string>;
	readonly borderBlockStartWidth?: MaybeAtom<string>;
	readonly borderBlockStyle?: MaybeAtom<string>;
	readonly borderBlockWidth?: MaybeAtom<string>;
	readonly borderBottom?: MaybeAtom<string>;
	readonly borderBottomColor?: MaybeAtom<string>;
	readonly borderBottomLeftRadius?: MaybeAtom<string>;
	readonly borderBottomRightRadius?: MaybeAtom<string>;
	readonly borderBottomStyle?: MaybeAtom<string>;
	readonly borderBottomWidth?: MaybeAtom<string>;
	readonly borderCollapse?: MaybeAtom<string>;
	readonly borderColor?: MaybeAtom<string>;
	readonly borderEndEndRadius?: MaybeAtom<string>;
	readonly borderEndStartRadius?: MaybeAtom<string>;
	readonly borderImage?: MaybeAtom<string>;
	readonly borderImageOutset?: MaybeAtom<string>;
	readonly borderImageRepeat?: MaybeAtom<string>;
	readonly borderImageSlice?: MaybeAtom<string>;
	readonly borderImageSource?: MaybeAtom<string>;
	readonly borderImageWidth?: MaybeAtom<string>;
	readonly borderInline?: MaybeAtom<string>;
	readonly borderInlineColor?: MaybeAtom<string>;
	readonly borderInlineEnd?: MaybeAtom<string>;
	readonly borderInlineEndColor?: MaybeAtom<string>;
	readonly borderInlineEndStyle?: MaybeAtom<string>;
	readonly borderInlineEndWidth?: MaybeAtom<string>;
	readonly borderInlineStart?: MaybeAtom<string>;
	readonly borderInlineStartColor?: MaybeAtom<string>;
	readonly borderInlineStartStyle?: MaybeAtom<string>;
	readonly borderInlineStartWidth?: MaybeAtom<string>;
	readonly borderInlineStyle?: MaybeAtom<string>;
	readonly borderInlineWidth?: MaybeAtom<string>;
	readonly borderLeft?: MaybeAtom<string>;
	readonly borderLeftColor?: MaybeAtom<string>;
	readonly borderLeftStyle?: MaybeAtom<string>;
	readonly borderLeftWidth?: MaybeAtom<string>;
	readonly borderRadius?: MaybeAtom<string>;
	readonly borderRight?: MaybeAtom<string>;
	readonly borderRightColor?: MaybeAtom<string>;
	readonly borderRightStyle?: MaybeAtom<string>;
	readonly borderRightWidth?: MaybeAtom<string>;
	readonly borderSpacing?: MaybeAtom<string>;
	readonly borderStartEndRadius?: MaybeAtom<string>;
	readonly borderStartStartRadius?: MaybeAtom<string>;
	readonly borderStyle?: MaybeAtom<string>;
	readonly borderTop?: MaybeAtom<string>;
	readonly borderTopColor?: MaybeAtom<string>;
	readonly borderTopLeftRadius?: MaybeAtom<string>;
	readonly borderTopRightRadius?: MaybeAtom<string>;
	readonly borderTopStyle?: MaybeAtom<string>;
	readonly borderTopWidth?: MaybeAtom<string>;
	readonly borderWidth?: MaybeAtom<string>;
	readonly bottom?: MaybeAtom<string>;
	readonly boxDecorationBreak?: MaybeAtom<string>;
	readonly boxShadow?: MaybeAtom<string>;
	readonly boxSizing?: MaybeAtom<string>;
	readonly breakAfter?: MaybeAtom<string>;
	readonly breakBefore?: MaybeAtom<string>;
	readonly breakInside?: MaybeAtom<string>;
	readonly captionSide?: MaybeAtom<string>;
	readonly caretColor?: MaybeAtom<string>;
	readonly clear?: MaybeAtom<string>;
	readonly clipPath?: MaybeAtom<string>;
	readonly clipRule?: MaybeAtom<string>;
	readonly color?: MaybeAtom<string>;
	readonly colorInterpolation?: MaybeAtom<string>;
	readonly colorInterpolationFilters?: MaybeAtom<string>;
	readonly colorScheme?: MaybeAtom<string>;
	readonly columnCount?: MaybeAtom<string>;
	readonly columnFill?: MaybeAtom<string>;
	readonly columnGap?: MaybeAtom<string>;
	readonly columnRule?: MaybeAtom<string>;
	readonly columnRuleColor?: MaybeAtom<string>;
	readonly columnRuleStyle?: MaybeAtom<string>;
	readonly columnRuleWidth?: MaybeAtom<string>;
	readonly columnSpan?: MaybeAtom<string>;
	readonly columnWidth?: MaybeAtom<string>;
	readonly columns?: MaybeAtom<string>;
	readonly contain?: MaybeAtom<string>;
	readonly containIntrinsicBlockSize?: MaybeAtom<string>;
	readonly containIntrinsicHeight?: MaybeAtom<string>;
	readonly containIntrinsicInlineSize?: MaybeAtom<string>;
	readonly containIntrinsicSize?: MaybeAtom<string>;
	readonly containIntrinsicWidth?: MaybeAtom<string>;
	readonly container?: MaybeAtom<string>;
	readonly containerName?: MaybeAtom<string>;
	readonly containerType?: MaybeAtom<string>;
	readonly content?: MaybeAtom<string>;
	readonly contentVisibility?: MaybeAtom<string>;
	readonly counterIncrement?: MaybeAtom<string>;
	readonly counterReset?: MaybeAtom<string>;
	readonly counterSet?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string>;
	readonly cy?: MaybeAtom<string>;
	readonly d?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<string>;
	readonly display?: MaybeAtom<string>;
	readonly dominantBaseline?: MaybeAtom<string>;
	readonly dynamicRangeLimit?: MaybeAtom<string>;
	readonly emptyCells?: MaybeAtom<string>;
	readonly fieldSizing?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly fillOpacity?: MaybeAtom<string>;
	readonly fillRule?: MaybeAtom<string>;
	readonly filter?: MaybeAtom<string>;
	readonly flex?: MaybeAtom<string>;
	readonly flexBasis?: MaybeAtom<string>;
	readonly flexDirection?: MaybeAtom<string>;
	readonly flexFlow?: MaybeAtom<string>;
	readonly flexGrow?: MaybeAtom<string>;
	readonly flexShrink?: MaybeAtom<string>;
	readonly flexWrap?: MaybeAtom<string>;
	readonly float?: MaybeAtom<string>;
	readonly floodColor?: MaybeAtom<string>;
	readonly floodOpacity?: MaybeAtom<string>;
	readonly font?: MaybeAtom<string>;
	readonly fontFamily?: MaybeAtom<string>;
	readonly fontFeatureSettings?: MaybeAtom<string>;
	readonly fontKerning?: MaybeAtom<string>;
	readonly fontLanguageOverride?: MaybeAtom<string>;
	readonly fontOpticalSizing?: MaybeAtom<string>;
	readonly fontPalette?: MaybeAtom<string>;
	readonly fontSize?: MaybeAtom<string>;
	readonly fontSizeAdjust?: MaybeAtom<string>;
	readonly fontStyle?: MaybeAtom<string>;
	readonly fontSynthesis?: MaybeAtom<string>;
	readonly fontSynthesisSmallCaps?: MaybeAtom<string>;
	readonly fontSynthesisStyle?: MaybeAtom<string>;
	readonly fontSynthesisWeight?: MaybeAtom<string>;
	readonly fontVariant?: MaybeAtom<string>;
	readonly fontVariantAlternates?: MaybeAtom<string>;
	readonly fontVariantCaps?: MaybeAtom<string>;
	readonly fontVariantEastAsian?: MaybeAtom<string>;
	readonly fontVariantEmoji?: MaybeAtom<string>;
	readonly fontVariantLigatures?: MaybeAtom<string>;
	readonly fontVariantNumeric?: MaybeAtom<string>;
	readonly fontVariantPosition?: MaybeAtom<string>;
	readonly fontVariationSettings?: MaybeAtom<string>;
	readonly fontWeight?: MaybeAtom<string>;
	readonly forcedColorAdjust?: MaybeAtom<string>;
	readonly gap?: MaybeAtom<string>;
	readonly grid?: MaybeAtom<string>;
	readonly gridArea?: MaybeAtom<string>;
	readonly gridAutoColumns?: MaybeAtom<string>;
	readonly gridAutoFlow?: MaybeAtom<string>;
	readonly gridAutoRows?: MaybeAtom<string>;
	readonly gridColumn?: MaybeAtom<string>;
	readonly gridColumnEnd?: MaybeAtom<string>;
	readonly gridColumnStart?: MaybeAtom<string>;
	readonly gridRow?: MaybeAtom<string>;
	readonly gridRowEnd?: MaybeAtom<string>;
	readonly gridRowStart?: MaybeAtom<string>;
	readonly gridTemplate?: MaybeAtom<string>;
	readonly gridTemplateAreas?: MaybeAtom<string>;
	readonly gridTemplateColumns?: MaybeAtom<string>;
	readonly gridTemplateRows?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly hyphenateCharacter?: MaybeAtom<string>;
	readonly hyphenateLimitChars?: MaybeAtom<string>;
	readonly hyphens?: MaybeAtom<string>;
	readonly imageRendering?: MaybeAtom<string>;
	readonly inlineSize?: MaybeAtom<string>;
	readonly inset?: MaybeAtom<string>;
	readonly insetBlock?: MaybeAtom<string>;
	readonly insetBlockEnd?: MaybeAtom<string>;
	readonly insetBlockStart?: MaybeAtom<string>;
	readonly insetInline?: MaybeAtom<string>;
	readonly insetInlineEnd?: MaybeAtom<string>;
	readonly insetInlineStart?: MaybeAtom<string>;
	readonly isolation?: MaybeAtom<string>;
	readonly justifyContent?: MaybeAtom<string>;
	readonly justifyItems?: MaybeAtom<string>;
	readonly justifySelf?: MaybeAtom<string>;
	readonly left?: MaybeAtom<string>;
	readonly letterSpacing?: MaybeAtom<string>;
	readonly lightingColor?: MaybeAtom<string>;
	readonly lineBreak?: MaybeAtom<string>;
	readonly lineHeight?: MaybeAtom<string>;
	readonly listStyle?: MaybeAtom<string>;
	readonly listStyleImage?: MaybeAtom<string>;
	readonly listStylePosition?: MaybeAtom<string>;
	readonly listStyleType?: MaybeAtom<string>;
	readonly margin?: MaybeAtom<string>;
	readonly marginBlock?: MaybeAtom<string>;
	readonly marginBlockEnd?: MaybeAtom<string>;
	readonly marginBlockStart?: MaybeAtom<string>;
	readonly marginBottom?: MaybeAtom<string>;
	readonly marginInline?: MaybeAtom<string>;
	readonly marginInlineEnd?: MaybeAtom<string>;
	readonly marginInlineStart?: MaybeAtom<string>;
	readonly marginLeft?: MaybeAtom<string>;
	readonly marginRight?: MaybeAtom<string>;
	readonly marginTop?: MaybeAtom<string>;
	readonly marker?: MaybeAtom<string>;
	readonly markerEnd?: MaybeAtom<string>;
	readonly markerMid?: MaybeAtom<string>;
	readonly markerStart?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly maskClip?: MaybeAtom<string>;
	readonly maskComposite?: MaybeAtom<string>;
	readonly maskImage?: MaybeAtom<string>;
	readonly maskMode?: MaybeAtom<string>;
	readonly maskOrigin?: MaybeAtom<string>;
	readonly maskPosition?: MaybeAtom<string>;
	readonly maskRepeat?: MaybeAtom<string>;
	readonly maskSize?: MaybeAtom<string>;
	readonly maskType?: MaybeAtom<string>;
	readonly mathDepth?: MaybeAtom<string>;
	readonly mathShift?: MaybeAtom<string>;
	readonly mathStyle?: MaybeAtom<string>;
	readonly maxBlockSize?: MaybeAtom<string>;
	readonly maxHeight?: MaybeAtom<string>;
	readonly maxInlineSize?: MaybeAtom<string>;
	readonly maxWidth?: MaybeAtom<string>;
	readonly minBlockSize?: MaybeAtom<string>;
	readonly minHeight?: MaybeAtom<string>;
	readonly minInlineSize?: MaybeAtom<string>;
	readonly minWidth?: MaybeAtom<string>;
	readonly mixBlendMode?: MaybeAtom<string>;
	readonly objectFit?: MaybeAtom<string>;
	readonly objectPosition?: MaybeAtom<string>;
	readonly offset?: MaybeAtom<string>;
	readonly offsetAnchor?: MaybeAtom<string>;
	readonly offsetDistance?: MaybeAtom<string>;
	readonly offsetPath?: MaybeAtom<string>;
	readonly offsetPosition?: MaybeAtom<string>;
	readonly offsetRotate?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string>;
	readonly order?: MaybeAtom<string>;
	readonly orphans?: MaybeAtom<string>;
	readonly outline?: MaybeAtom<string>;
	readonly outlineColor?: MaybeAtom<string>;
	readonly outlineOffset?: MaybeAtom<string>;
	readonly outlineStyle?: MaybeAtom<string>;
	readonly outlineWidth?: MaybeAtom<string>;
	readonly overflow?: MaybeAtom<string>;
	readonly overflowAnchor?: MaybeAtom<string>;
	readonly overflowBlock?: MaybeAtom<string>;
	readonly overflowClipMargin?: MaybeAtom<string>;
	readonly overflowInline?: MaybeAtom<string>;
	readonly overflowWrap?: MaybeAtom<string>;
	readonly overflowX?: MaybeAtom<string>;
	readonly overflowY?: MaybeAtom<string>;
	readonly overscrollBehavior?: MaybeAtom<string>;
	readonly overscrollBehaviorBlock?: MaybeAtom<string>;
	readonly overscrollBehaviorInline?: MaybeAtom<string>;
	readonly overscrollBehaviorX?: MaybeAtom<string>;
	readonly overscrollBehaviorY?: MaybeAtom<string>;
	readonly padding?: MaybeAtom<string>;
	readonly paddingBlock?: MaybeAtom<string>;
	readonly paddingBlockEnd?: MaybeAtom<string>;
	readonly paddingBlockStart?: MaybeAtom<string>;
	readonly paddingBottom?: MaybeAtom<string>;
	readonly paddingInline?: MaybeAtom<string>;
	readonly paddingInlineEnd?: MaybeAtom<string>;
	readonly paddingInlineStart?: MaybeAtom<string>;
	readonly paddingLeft?: MaybeAtom<string>;
	readonly paddingRight?: MaybeAtom<string>;
	readonly paddingTop?: MaybeAtom<string>;
	readonly page?: MaybeAtom<string>;
	readonly paintOrder?: MaybeAtom<string>;
	readonly perspective?: MaybeAtom<string>;
	readonly perspectiveOrigin?: MaybeAtom<string>;
	readonly placeContent?: MaybeAtom<string>;
	readonly placeItems?: MaybeAtom<string>;
	readonly placeSelf?: MaybeAtom<string>;
	readonly pointerEvents?: MaybeAtom<string>;
	readonly position?: MaybeAtom<string>;
	readonly positionTry?: MaybeAtom<string>;
	readonly positionTryFallbacks?: MaybeAtom<string>;
	readonly positionTryOrder?: MaybeAtom<string>;
	readonly positionVisibility?: MaybeAtom<string>;
	readonly printColorAdjust?: MaybeAtom<string>;
	readonly quotes?: MaybeAtom<string>;
	readonly r?: MaybeAtom<string>;
	readonly resize?: MaybeAtom<string>;
	readonly right?: MaybeAtom<string>;
	readonly rotate?: MaybeAtom<string>;
	readonly rowGap?: MaybeAtom<string>;
	readonly rubyAlign?: MaybeAtom<string>;
	readonly rubyPosition?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string>;
	readonly ry?: MaybeAtom<string>;
	readonly scale?: MaybeAtom<string>;
	readonly scrollBehavior?: MaybeAtom<string>;
	readonly scrollMargin?: MaybeAtom<string>;
	readonly scrollMarginBlock?: MaybeAtom<string>;
	readonly scrollMarginBlockEnd?: MaybeAtom<string>;
	readonly scrollMarginBlockStart?: MaybeAtom<string>;
	readonly scrollMarginBottom?: MaybeAtom<string>;
	readonly scrollMarginInline?: MaybeAtom<string>;
	readonly scrollMarginInlineEnd?: MaybeAtom<string>;
	readonly scrollMarginInlineStart?: MaybeAtom<string>;
	readonly scrollMarginLeft?: MaybeAtom<string>;
	readonly scrollMarginRight?: MaybeAtom<string>;
	readonly scrollMarginTop?: MaybeAtom<string>;
	readonly scrollPadding?: MaybeAtom<string>;
	readonly scrollPaddingBlock?: MaybeAtom<string>;
	readonly scrollPaddingBlockEnd?: MaybeAtom<string>;
	readonly scrollPaddingBlockStart?: MaybeAtom<string>;
	readonly scrollPaddingBottom?: MaybeAtom<string>;
	readonly scrollPaddingInline?: MaybeAtom<string>;
	readonly scrollPaddingInlineEnd?: MaybeAtom<string>;
	readonly scrollPaddingInlineStart?: MaybeAtom<string>;
	readonly scrollPaddingLeft?: MaybeAtom<string>;
	readonly scrollPaddingRight?: MaybeAtom<string>;
	readonly scrollPaddingTop?: MaybeAtom<string>;
	readonly scrollSnapAlign?: MaybeAtom<string>;
	readonly scrollSnapStop?: MaybeAtom<string>;
	readonly scrollSnapType?: MaybeAtom<string>;
	readonly scrollTimeline?: MaybeAtom<string>;
	readonly scrollTimelineAxis?: MaybeAtom<string>;
	readonly scrollTimelineName?: MaybeAtom<string>;
	readonly scrollbarColor?: MaybeAtom<string>;
	readonly scrollbarGutter?: MaybeAtom<string>;
	readonly scrollbarWidth?: MaybeAtom<string>;
	readonly shapeImageThreshold?: MaybeAtom<string>;
	readonly shapeMargin?: MaybeAtom<string>;
	readonly shapeOutside?: MaybeAtom<string>;
	readonly shapeRendering?: MaybeAtom<string>;
	readonly stopColor?: MaybeAtom<string>;
	readonly stopOpacity?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly strokeDasharray?: MaybeAtom<string>;
	readonly strokeDashoffset?: MaybeAtom<string>;
	readonly strokeLinecap?: MaybeAtom<string>;
	readonly strokeLinejoin?: MaybeAtom<string>;
	readonly strokeMiterlimit?: MaybeAtom<string>;
	readonly strokeOpacity?: MaybeAtom<string>;
	readonly strokeWidth?: MaybeAtom<string>;
	readonly tabSize?: MaybeAtom<string>;
	readonly tableLayout?: MaybeAtom<string>;
	readonly textAlign?: MaybeAtom<string>;
	readonly textAlignLast?: MaybeAtom<string>;
	readonly textAnchor?: MaybeAtom<string>;
	readonly textAutospace?: MaybeAtom<string>;
	readonly textBox?: MaybeAtom<string>;
	readonly textBoxEdge?: MaybeAtom<string>;
	readonly textBoxTrim?: MaybeAtom<string>;
	readonly textCombineUpright?: MaybeAtom<string>;
	readonly textDecoration?: MaybeAtom<string>;
	readonly textDecorationColor?: MaybeAtom<string>;
	readonly textDecorationLine?: MaybeAtom<string>;
	readonly textDecorationSkipInk?: MaybeAtom<string>;
	readonly textDecorationStyle?: MaybeAtom<string>;
	readonly textDecorationThickness?: MaybeAtom<string>;
	readonly textEmphasis?: MaybeAtom<string>;
	readonly textEmphasisColor?: MaybeAtom<string>;
	readonly textEmphasisPosition?: MaybeAtom<string>;
	readonly textEmphasisStyle?: MaybeAtom<string>;
	readonly textIndent?: MaybeAtom<string>;
	readonly textJustify?: MaybeAtom<string>;
	readonly textOrientation?: MaybeAtom<string>;
	readonly textOverflow?: MaybeAtom<string>;
	readonly textRendering?: MaybeAtom<string>;
	readonly textShadow?: MaybeAtom<string>;
	readonly textTransform?: MaybeAtom<string>;
	readonly textUnderlineOffset?: MaybeAtom<string>;
	readonly textUnderlinePosition?: MaybeAtom<string>;
	readonly textWrap?: MaybeAtom<string>;
	readonly textWrapMode?: MaybeAtom<string>;
	readonly textWrapStyle?: MaybeAtom<string>;
	readonly timelineScope?: MaybeAtom<string>;
	readonly top?: MaybeAtom<string>;
	readonly touchAction?: MaybeAtom<string>;
	readonly transform?: MaybeAtom<string>;
	readonly transformBox?: MaybeAtom<string>;
	readonly transformOrigin?: MaybeAtom<string>;
	readonly transformStyle?: MaybeAtom<string>;
	readonly transition?: MaybeAtom<string>;
	readonly transitionBehavior?: MaybeAtom<string>;
	readonly transitionDelay?: MaybeAtom<string>;
	readonly transitionDuration?: MaybeAtom<string>;
	readonly transitionProperty?: MaybeAtom<string>;
	readonly transitionTimingFunction?: MaybeAtom<string>;
	readonly translate?: MaybeAtom<string>;
	readonly unicodeBidi?: MaybeAtom<string>;
	readonly userSelect?: MaybeAtom<string>;
	readonly vectorEffect?: MaybeAtom<string>;
	readonly verticalAlign?: MaybeAtom<string>;
	readonly viewTimeline?: MaybeAtom<string>;
	readonly viewTimelineAxis?: MaybeAtom<string>;
	readonly viewTimelineInset?: MaybeAtom<string>;
	readonly viewTimelineName?: MaybeAtom<string>;
	readonly viewTransitionClass?: MaybeAtom<string>;
	readonly viewTransitionName?: MaybeAtom<string>;
	readonly visibility?: MaybeAtom<string>;
	readonly webkitLineClamp?: MaybeAtom<string>;
	readonly webkitTextFillColor?: MaybeAtom<string>;
	readonly webkitTextStroke?: MaybeAtom<string>;
	readonly webkitTextStrokeColor?: MaybeAtom<string>;
	readonly webkitTextStrokeWidth?: MaybeAtom<string>;
	readonly whiteSpace?: MaybeAtom<string>;
	readonly whiteSpaceCollapse?: MaybeAtom<string>;
	readonly widows?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly willChange?: MaybeAtom<string>;
	readonly wordBreak?: MaybeAtom<string>;
	readonly wordSpacing?: MaybeAtom<string>;
	readonly writingMode?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string>;
	readonly y?: MaybeAtom<string>;
	readonly zIndex?: MaybeAtom<string>;
	readonly zoom?: MaybeAtom<string>;
	readonly anchorName?: MaybeAtom<string>;
	readonly positionAnchor?: MaybeAtom<string>;
	readonly positionArea?: MaybeAtom<string>;
}

export interface ARIAProps {
	readonly ariaActiveDescendantElement?: MaybeAtom<Element | null>;
	readonly ariaAtomic?: MaybeAtom<string | null>;
	readonly ariaAutoComplete?: MaybeAtom<string | null>;
	readonly ariaBrailleLabel?: MaybeAtom<string | null>;
	readonly ariaBrailleRoleDescription?: MaybeAtom<string | null>;
	readonly ariaBusy?: MaybeAtom<string | null>;
	readonly ariaChecked?: MaybeAtom<string | null>;
	readonly ariaColCount?: MaybeAtom<string | null>;
	readonly ariaColIndex?: MaybeAtom<string | null>;
	readonly ariaColIndexText?: MaybeAtom<string | null>;
	readonly ariaColSpan?: MaybeAtom<string | null>;
	readonly ariaControlsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaCurrent?: MaybeAtom<string | null>;
	readonly ariaDescribedByElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaDescription?: MaybeAtom<string | null>;
	readonly ariaDetailsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaDisabled?: MaybeAtom<string | null>;
	readonly ariaErrorMessageElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaExpanded?: MaybeAtom<string | null>;
	readonly ariaFlowToElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaHasPopup?: MaybeAtom<string | null>;
	readonly ariaHidden?: MaybeAtom<string | null>;
	readonly ariaInvalid?: MaybeAtom<string | null>;
	readonly ariaKeyShortcuts?: MaybeAtom<string | null>;
	readonly ariaLabel?: MaybeAtom<string | null>;
	readonly ariaLabelledByElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaLevel?: MaybeAtom<string | null>;
	readonly ariaLive?: MaybeAtom<string | null>;
	readonly ariaModal?: MaybeAtom<string | null>;
	readonly ariaMultiLine?: MaybeAtom<string | null>;
	readonly ariaMultiSelectable?: MaybeAtom<string | null>;
	readonly ariaOrientation?: MaybeAtom<string | null>;
	readonly ariaOwnsElements?: MaybeAtom<readonly Element[] | null>;
	readonly ariaPlaceholder?: MaybeAtom<string | null>;
	readonly ariaPosInSet?: MaybeAtom<string | null>;
	readonly ariaPressed?: MaybeAtom<string | null>;
	readonly ariaReadOnly?: MaybeAtom<string | null>;
	readonly ariaRelevant?: MaybeAtom<string | null>;
	readonly ariaRequired?: MaybeAtom<string | null>;
	readonly ariaRoleDescription?: MaybeAtom<string | null>;
	readonly ariaRowCount?: MaybeAtom<string | null>;
	readonly ariaRowIndex?: MaybeAtom<string | null>;
	readonly ariaRowIndexText?: MaybeAtom<string | null>;
	readonly ariaRowSpan?: MaybeAtom<string | null>;
	readonly ariaSelected?: MaybeAtom<string | null>;
	readonly ariaSetSize?: MaybeAtom<string | null>;
	readonly ariaSort?: MaybeAtom<string | null>;
	readonly ariaValueMax?: MaybeAtom<string | null>;
	readonly ariaValueMin?: MaybeAtom<string | null>;
	readonly ariaValueNow?: MaybeAtom<string | null>;
	readonly ariaValueText?: MaybeAtom<string | null>;
	readonly role?: MaybeAtom<string | null>;
}

export interface HTMLCommonProps {
	readonly translate?: MaybeAtom<boolean>;
	readonly part?: MaybeAtom<string>;
	readonly class?: MaybeAtom<string>;
	readonly accessKey?: MaybeAtom<string>;
	readonly autocapitalize?: MaybeAtom<string>;
	readonly autocorrect?: MaybeAtom<boolean>;
	readonly dir?: MaybeAtom<string>;
	readonly draggable?: MaybeAtom<boolean>;
	readonly hidden?: MaybeAtom<boolean | "until-found">;
	readonly inert?: MaybeAtom<boolean>;
	readonly lang?: MaybeAtom<string>;
	readonly popover?: MaybeAtom<string | null>;
	readonly spellcheck?: MaybeAtom<boolean>;
	readonly title?: MaybeAtom<string>;
	readonly writingSuggestions?: MaybeAtom<string>;
	readonly id?: MaybeAtom<string>;
	readonly scrollLeft?: MaybeAtom<number>;
	readonly scrollTop?: MaybeAtom<number>;
	readonly slot?: MaybeAtom<string>;
	readonly contentEditable?: MaybeAtom<string>;
	readonly enterKeyHint?: MaybeAtom<string>;
	readonly inputMode?: MaybeAtom<string>;
	readonly autofocus?: MaybeAtom<boolean>;
	readonly nonce?: MaybeAtom<string>;
	readonly tabIndex?: MaybeAtom<number>;
}

export interface HTMLAnchorElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLAnchorElement;
	readonly [S_ELEM_NAME]?: "a";
	readonly children?: JsxChildren;
	readonly charset?: MaybeAtom<string>;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly hreflang?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly rev?: MaybeAtom<string>;
	readonly shape?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly text?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly hash?: MaybeAtom<string>;
	readonly host?: MaybeAtom<string>;
	readonly hostname?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly password?: MaybeAtom<string>;
	readonly pathname?: MaybeAtom<string>;
	readonly port?: MaybeAtom<string>;
	readonly protocol?: MaybeAtom<string>;
	readonly search?: MaybeAtom<string>;
	readonly username?: MaybeAtom<string>;
}

export interface HTMLAreaElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLAreaElement;
	readonly [S_ELEM_NAME]?: "area";
	readonly children?: never;
	readonly coords?: MaybeAtom<string>;
	readonly download?: MaybeAtom<string>;
	readonly ping?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly shape?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly hash?: MaybeAtom<string>;
	readonly host?: MaybeAtom<string>;
	readonly hostname?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly password?: MaybeAtom<string>;
	readonly pathname?: MaybeAtom<string>;
	readonly port?: MaybeAtom<string>;
	readonly protocol?: MaybeAtom<string>;
	readonly search?: MaybeAtom<string>;
	readonly username?: MaybeAtom<string>;
	readonly alt?: MaybeAtom<string>;
	readonly noHref?: MaybeAtom<boolean>;
}

export interface HTMLAudioElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLAudioElement;
	readonly [S_ELEM_NAME]?: "audio";
	readonly children?: JsxChildren;
	readonly autoplay?: MaybeAtom<boolean>;
	readonly controls?: MaybeAtom<boolean>;
	readonly crossOrigin?: MaybeAtom<string | null>;
	readonly currentTime?: MaybeAtom<number>;
	readonly defaultMuted?: MaybeAtom<boolean>;
	readonly defaultPlaybackRate?: MaybeAtom<number>;
	readonly disableRemotePlayback?: MaybeAtom<boolean>;
	readonly loop?: MaybeAtom<boolean>;
	readonly muted?: MaybeAtom<boolean>;
	readonly playbackRate?: MaybeAtom<number>;
	readonly preload?: MaybeAtom<"" | "none" | "metadata" | "auto">;
	readonly preservesPitch?: MaybeAtom<boolean>;
	readonly src?: MaybeAtom<string>;
	readonly srcObject?: MaybeAtom<MediaProvider | null>;
	readonly volume?: MaybeAtom<number>;
}

export interface HTMLBaseElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLBaseElement;
	readonly [S_ELEM_NAME]?: "base";
	readonly children?: never;
	readonly target?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
}

export interface HTMLElementProps<N extends "abbr" | "address" | "article" | "aside" | "b" | "bdi" | "bdo" | "cite" | "code" | "dd" | "dfn" | "dt" | "em" | "figcaption" | "figure" | "footer" | "header" | "hgroup" | "i" | "kbd" | "main" | "mark" | "nav" | "noscript" | "rp" | "rt" | "ruby" | "s" | "samp" | "search" | "section" | "small" | "strong" | "sub" | "summary" | "sup" | "u" | "var"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
}

export interface HTMLQuoteElementProps<N extends "blockquote" | "q"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLQuoteElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
	readonly cite?: MaybeAtom<string>;
}

export interface HTMLBRElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLBRElement;
	readonly [S_ELEM_NAME]?: "br";
	readonly children?: never;
	readonly clear?: MaybeAtom<string>;
}

export interface HTMLButtonElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLButtonElement;
	readonly [S_ELEM_NAME]?: "button";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<"button" | "submit" | "reset">;
	readonly command?: MaybeAtom<string>;
	readonly commandForElement?: MaybeAtom<Element | null>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly formAction?: MaybeAtom<string>;
	readonly formEnctype?: MaybeAtom<string>;
	readonly formMethod?: MaybeAtom<string>;
	readonly formNoValidate?: MaybeAtom<boolean>;
	readonly formTarget?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly popoverTargetAction?: MaybeAtom<string>;
	readonly popoverTargetElement?: MaybeAtom<Element | null>;
}

export interface HTMLCanvasElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLCanvasElement;
	readonly [S_ELEM_NAME]?: "canvas";
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
}

export interface HTMLTableCaptionElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTableCaptionElement;
	readonly [S_ELEM_NAME]?: "caption";
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLTableColElementProps<N extends "col" | "colgroup"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTableColElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: never;
	readonly width?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly span?: MaybeAtom<number>;
	readonly vAlign?: MaybeAtom<string>;
}

export interface HTMLDataElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLDataElement;
	readonly [S_ELEM_NAME]?: "data";
	readonly children?: JsxChildren;
	readonly value?: MaybeAtom<string>;
}

export interface HTMLDataListElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLDataListElement;
	readonly [S_ELEM_NAME]?: "datalist";
	readonly children?: JsxChildren;
}

export interface HTMLModElementProps<N extends "del" | "ins"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLModElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
	readonly cite?: MaybeAtom<string>;
	readonly dateTime?: MaybeAtom<string>;
}

export interface HTMLDetailsElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLDetailsElement;
	readonly [S_ELEM_NAME]?: "details";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly open?: MaybeAtom<boolean>;
}

export interface HTMLDialogElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLDialogElement;
	readonly [S_ELEM_NAME]?: "dialog";
	readonly children?: JsxChildren;
	readonly open?: MaybeAtom<boolean>;
	readonly closedBy?: MaybeAtom<string>;
	readonly returnValue?: MaybeAtom<string>;
}

export interface HTMLDivElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLDivElement;
	readonly [S_ELEM_NAME]?: "div";
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLDListElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLDListElement;
	readonly [S_ELEM_NAME]?: "dl";
	readonly children?: JsxChildren;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLEmbedElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLEmbedElement;
	readonly [S_ELEM_NAME]?: "embed";
	readonly children?: never;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLFieldSetElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLFieldSetElement;
	readonly [S_ELEM_NAME]?: "fieldset";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
}

export interface HTMLFormElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLFormElement;
	readonly [S_ELEM_NAME]?: "form";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly rel?: MaybeAtom<string>;
	readonly relList?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly acceptCharset?: MaybeAtom<string>;
	readonly action?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFillBase>;
	readonly encoding?: MaybeAtom<string>;
	readonly enctype?: MaybeAtom<string>;
	readonly method?: MaybeAtom<string>;
	readonly noValidate?: MaybeAtom<boolean>;
}

export interface HTMLHeadingElementProps<N extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLHeadingElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLHRElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLHRElement;
	readonly [S_ELEM_NAME]?: "hr";
	readonly children?: never;
	readonly color?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly noShade?: MaybeAtom<boolean>;
	readonly size?: MaybeAtom<string>;
}

export interface HTMLIFrameElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLIFrameElement;
	readonly [S_ELEM_NAME]?: "iframe";
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<ReferrerPolicy>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly allow?: MaybeAtom<string>;
	readonly allowFullscreen?: MaybeAtom<boolean>;
	readonly frameBorder?: MaybeAtom<string>;
	readonly loading?: MaybeAtom<"eager" | "lazy">;
	readonly longDesc?: MaybeAtom<string>;
	readonly marginHeight?: MaybeAtom<string>;
	readonly marginWidth?: MaybeAtom<string>;
	readonly sandbox?: MaybeAtom<DOMTokenList>;
	readonly scrolling?: MaybeAtom<string>;
	readonly srcdoc?: MaybeAtom<string>;
}

export interface HTMLImageElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLImageElement;
	readonly [S_ELEM_NAME]?: "img";
	readonly children?: never;
	readonly border?: MaybeAtom<string>;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly name?: MaybeAtom<string>;
	readonly referrerPolicy?: MaybeAtom<string>;
	readonly alt?: MaybeAtom<string>;
	readonly crossOrigin?: MaybeAtom<string | null>;
	readonly src?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly loading?: MaybeAtom<"eager" | "lazy">;
	readonly longDesc?: MaybeAtom<string>;
	readonly decoding?: MaybeAtom<"auto" | "async" | "sync">;
	readonly fetchPriority?: MaybeAtom<"auto" | "high" | "low">;
	readonly hspace?: MaybeAtom<number>;
	readonly isMap?: MaybeAtom<boolean>;
	readonly lowsrc?: MaybeAtom<string>;
	readonly sizes?: MaybeAtom<string>;
	readonly srcset?: MaybeAtom<string>;
	readonly useMap?: MaybeAtom<string>;
	readonly vspace?: MaybeAtom<number>;
}

export interface HTMLInputElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLInputElement;
	readonly [S_ELEM_NAME]?: "input";
	readonly children?: never;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly alt?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly formAction?: MaybeAtom<string>;
	readonly formEnctype?: MaybeAtom<string>;
	readonly formMethod?: MaybeAtom<string>;
	readonly formNoValidate?: MaybeAtom<boolean>;
	readonly formTarget?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly popoverTargetAction?: MaybeAtom<string>;
	readonly popoverTargetElement?: MaybeAtom<Element | null>;
	readonly align?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly size?: MaybeAtom<number>;
	readonly useMap?: MaybeAtom<string>;
	readonly accept?: MaybeAtom<string>;
	readonly capture?: MaybeAtom<string>;
	readonly checked?: MaybeAtom<boolean>;
	readonly defaultChecked?: MaybeAtom<boolean>;
	readonly defaultValue?: MaybeAtom<string>;
	readonly dirName?: MaybeAtom<string>;
	readonly files?: MaybeAtom<FileList | null>;
	readonly indeterminate?: MaybeAtom<boolean>;
	readonly max?: MaybeAtom<string>;
	readonly maxLength?: MaybeAtom<number>;
	readonly min?: MaybeAtom<string>;
	readonly minLength?: MaybeAtom<number>;
	readonly multiple?: MaybeAtom<boolean>;
	readonly pattern?: MaybeAtom<string>;
	readonly placeholder?: MaybeAtom<string>;
	readonly readOnly?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectionDirection?: MaybeAtom<SelectionDirection | null>;
	readonly selectionEnd?: MaybeAtom<number | null>;
	readonly selectionStart?: MaybeAtom<number | null>;
	readonly step?: MaybeAtom<string>;
	readonly valueAsDate?: MaybeAtom<Date | null>;
	readonly valueAsNumber?: MaybeAtom<number>;
	readonly webkitdirectory?: MaybeAtom<boolean>;
}

export interface HTMLLabelElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLLabelElement;
	readonly [S_ELEM_NAME]?: "label";
	readonly children?: JsxChildren;
	readonly for?: MaybeAtom<string>;
}

export interface HTMLLegendElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLLegendElement;
	readonly [S_ELEM_NAME]?: "legend";
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLLIElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLLIElement;
	readonly [S_ELEM_NAME]?: "li";
	readonly children?: JsxChildren;
	readonly type?: MaybeAtom<string>;
	readonly value?: MaybeAtom<number>;
}

export interface HTMLMapElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLMapElement;
	readonly [S_ELEM_NAME]?: "map";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
}

export interface HTMLMenuElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLMenuElement;
	readonly [S_ELEM_NAME]?: "menu";
	readonly children?: JsxChildren;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLMeterElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLMeterElement;
	readonly [S_ELEM_NAME]?: "meter";
	readonly children?: JsxChildren;
	readonly value?: MaybeAtom<number>;
	readonly high?: MaybeAtom<number>;
	readonly low?: MaybeAtom<number>;
	readonly max?: MaybeAtom<number>;
	readonly min?: MaybeAtom<number>;
	readonly optimum?: MaybeAtom<number>;
}

export interface HTMLObjectElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLObjectElement;
	readonly [S_ELEM_NAME]?: "object";
	readonly children?: JsxChildren;
	readonly border?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly name?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly code?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly data?: MaybeAtom<string>;
	readonly hspace?: MaybeAtom<number>;
	readonly useMap?: MaybeAtom<string>;
	readonly vspace?: MaybeAtom<number>;
	readonly archive?: MaybeAtom<string>;
	readonly codeBase?: MaybeAtom<string>;
	readonly codeType?: MaybeAtom<string>;
	readonly declare?: MaybeAtom<boolean>;
	readonly standby?: MaybeAtom<string>;
}

export interface HTMLOListElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLOListElement;
	readonly [S_ELEM_NAME]?: "ol";
	readonly children?: JsxChildren;
	readonly type?: MaybeAtom<string>;
	readonly compact?: MaybeAtom<boolean>;
	readonly reversed?: MaybeAtom<boolean>;
	readonly start?: MaybeAtom<number>;
}

export interface HTMLOptGroupElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLOptGroupElement;
	readonly [S_ELEM_NAME]?: "optgroup";
	readonly children?: JsxChildren;
	readonly disabled?: MaybeAtom<boolean>;
	readonly label?: MaybeAtom<string>;
}

export interface HTMLOptionElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLOptionElement;
	readonly [S_ELEM_NAME]?: "option";
	readonly children?: JsxChildren;
	readonly text?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly label?: MaybeAtom<string>;
	readonly defaultSelected?: MaybeAtom<boolean>;
	readonly selected?: MaybeAtom<boolean>;
}

export interface HTMLOutputElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLOutputElement;
	readonly [S_ELEM_NAME]?: "output";
	readonly children?: JsxChildren;
	readonly for?: MaybeAtom<DOMTokenList>;
	readonly name?: MaybeAtom<string>;
	readonly value?: MaybeAtom<string>;
	readonly defaultValue?: MaybeAtom<string>;
}

export interface HTMLParagraphElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLParagraphElement;
	readonly [S_ELEM_NAME]?: "p";
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
}

export interface HTMLPictureElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLPictureElement;
	readonly [S_ELEM_NAME]?: "picture";
	readonly children?: JsxChildren;
}

export interface HTMLPreElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLPreElement;
	readonly [S_ELEM_NAME]?: "pre";
	readonly children?: JsxChildren;
	readonly width?: MaybeAtom<number>;
}

export interface HTMLProgressElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLProgressElement;
	readonly [S_ELEM_NAME]?: "progress";
	readonly children?: JsxChildren;
	readonly value?: MaybeAtom<number>;
	readonly max?: MaybeAtom<number>;
}

export interface HTMLSelectElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLSelectElement;
	readonly [S_ELEM_NAME]?: "select";
	readonly children?: JsxChildren;
	readonly length?: MaybeAtom<number>;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly size?: MaybeAtom<number>;
	readonly multiple?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectedIndex?: MaybeAtom<number>;
}

export interface HTMLSlotElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLSlotElement;
	readonly [S_ELEM_NAME]?: "slot";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
}

export interface HTMLSourceElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLSourceElement;
	readonly [S_ELEM_NAME]?: "source";
	readonly children?: never;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly type?: MaybeAtom<string>;
	readonly src?: MaybeAtom<string>;
	readonly sizes?: MaybeAtom<string>;
	readonly srcset?: MaybeAtom<string>;
	readonly media?: MaybeAtom<string>;
}

export interface HTMLSpanElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLSpanElement;
	readonly [S_ELEM_NAME]?: "span";
	readonly children?: JsxChildren;
}

export interface HTMLTableElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTableElement;
	readonly [S_ELEM_NAME]?: "table";
	readonly children?: JsxChildren;
	readonly border?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly summary?: MaybeAtom<string>;
	readonly caption?: MaybeAtom<HTMLTableCaptionElement | null>;
	readonly align?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
	readonly cellPadding?: MaybeAtom<string>;
	readonly cellSpacing?: MaybeAtom<string>;
	readonly frame?: MaybeAtom<string>;
	readonly rules?: MaybeAtom<string>;
	readonly tFoot?: MaybeAtom<HTMLTableSectionElement | null>;
	readonly tHead?: MaybeAtom<HTMLTableSectionElement | null>;
}

export interface HTMLTableSectionElementProps<N extends "tbody" | "tfoot" | "thead"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTableSectionElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
}

export interface HTMLTableCellElementProps<N extends "td" | "th"> extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTableCellElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
	readonly abbr?: MaybeAtom<string>;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
	readonly axis?: MaybeAtom<string>;
	readonly colSpan?: MaybeAtom<number>;
	readonly headers?: MaybeAtom<string>;
	readonly noWrap?: MaybeAtom<boolean>;
	readonly rowSpan?: MaybeAtom<number>;
	readonly scope?: MaybeAtom<string>;
}

export interface HTMLTemplateElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTemplateElement;
	readonly [S_ELEM_NAME]?: "template";
	readonly children?: JsxChildren;
	readonly shadowRootClonable?: MaybeAtom<boolean>;
	readonly shadowRootCustomElementRegistry?: MaybeAtom<string>;
	readonly shadowRootDelegatesFocus?: MaybeAtom<boolean>;
	readonly shadowRootMode?: MaybeAtom<string>;
	readonly shadowRootSerializable?: MaybeAtom<boolean>;
}

export interface HTMLTextAreaElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTextAreaElement;
	readonly [S_ELEM_NAME]?: "textarea";
	readonly children?: JsxChildren;
	readonly name?: MaybeAtom<string>;
	readonly disabled?: MaybeAtom<boolean>;
	readonly value?: MaybeAtom<string>;
	readonly autocomplete?: MaybeAtom<AutoFill>;
	readonly defaultValue?: MaybeAtom<string>;
	readonly dirName?: MaybeAtom<string>;
	readonly maxLength?: MaybeAtom<number>;
	readonly minLength?: MaybeAtom<number>;
	readonly placeholder?: MaybeAtom<string>;
	readonly readOnly?: MaybeAtom<boolean>;
	readonly required?: MaybeAtom<boolean>;
	readonly selectionDirection?: MaybeAtom<SelectionDirection>;
	readonly selectionEnd?: MaybeAtom<number>;
	readonly selectionStart?: MaybeAtom<number>;
	readonly rows?: MaybeAtom<number>;
	readonly cols?: MaybeAtom<number>;
	readonly wrap?: MaybeAtom<string>;
}

export interface HTMLTimeElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTimeElement;
	readonly [S_ELEM_NAME]?: "time";
	readonly children?: JsxChildren;
	readonly dateTime?: MaybeAtom<string>;
}

export interface HTMLTableRowElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTableRowElement;
	readonly [S_ELEM_NAME]?: "tr";
	readonly children?: JsxChildren;
	readonly align?: MaybeAtom<string>;
	readonly ch?: MaybeAtom<string>;
	readonly chOff?: MaybeAtom<string>;
	readonly vAlign?: MaybeAtom<string>;
	readonly bgColor?: MaybeAtom<string>;
}

export interface HTMLTrackElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLTrackElement;
	readonly [S_ELEM_NAME]?: "track";
	readonly children?: never;
	readonly src?: MaybeAtom<string>;
	readonly label?: MaybeAtom<string>;
	readonly default?: MaybeAtom<boolean>;
	readonly kind?: MaybeAtom<string>;
	readonly srclang?: MaybeAtom<string>;
}

export interface HTMLUListElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLUListElement;
	readonly [S_ELEM_NAME]?: "ul";
	readonly children?: JsxChildren;
	readonly type?: MaybeAtom<string>;
	readonly compact?: MaybeAtom<boolean>;
}

export interface HTMLVideoElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLVideoElement;
	readonly [S_ELEM_NAME]?: "video";
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<number>;
	readonly width?: MaybeAtom<number>;
	readonly autoplay?: MaybeAtom<boolean>;
	readonly controls?: MaybeAtom<boolean>;
	readonly crossOrigin?: MaybeAtom<string | null>;
	readonly currentTime?: MaybeAtom<number>;
	readonly defaultMuted?: MaybeAtom<boolean>;
	readonly defaultPlaybackRate?: MaybeAtom<number>;
	readonly disableRemotePlayback?: MaybeAtom<boolean>;
	readonly loop?: MaybeAtom<boolean>;
	readonly muted?: MaybeAtom<boolean>;
	readonly playbackRate?: MaybeAtom<number>;
	readonly preload?: MaybeAtom<"" | "none" | "metadata" | "auto">;
	readonly preservesPitch?: MaybeAtom<boolean>;
	readonly src?: MaybeAtom<string>;
	readonly srcObject?: MaybeAtom<MediaProvider | null>;
	readonly volume?: MaybeAtom<number>;
	readonly disablePictureInPicture?: MaybeAtom<boolean>;
	readonly playsInline?: MaybeAtom<boolean>;
	readonly poster?: MaybeAtom<string>;
}

export interface HTMLWbrElementProps extends HTMLCommonProps {
	readonly [S_NODE_TYPE]?: HTMLElement;
	readonly [S_ELEM_NAME]?: "wbr";
	readonly children?: never;
}

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

export interface SVGCommonProps {
	readonly autofocus?: MaybeAtom<boolean>;
	readonly class?: MaybeAtom<string>;
	readonly color?: MaybeAtom<string>;
	readonly display?: MaybeAtom<string>;
	readonly filter?: MaybeAtom<string>;
	readonly id?: MaybeAtom<string>;
	readonly lang?: MaybeAtom<string>;
	readonly style?: MaybeAtom<string>;
	readonly tabindex?: MaybeAtom<string | number>;
	readonly transform?: MaybeAtom<string>;
	readonly "transform-origin"?: MaybeAtom<string>;
}

export type SVGAccumulate = "none" | "sum";

export type SVGAdditive = "replace" | "sum";

export type SVGAlignmentBaseline = "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "top" | "center" | "bottom";

export type SVGCalcMode = "discrete" | "linear" | "paced" | "spline";

export type SVGClipRule = "nonzero" | "evenodd" | "inherit";

export type SVGColorInterpolationFilters = "auto" | "sRGB" | "linearRGB";

export type SVGCrossOrigin = "" | "anonymous" | "use-credentials";

export type SVGTextDirection = "rtl" | "ltr";

export type SVGDominantBaseline = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top";

export type SVGEdgeMode = "duplicate" | "wrap" | "none";

export type SVGFillMode = "freeze" | "remove";

export type SVGFillRule = "nonzero" | "evenodd";

export type SVGFontStyle = "normal" | "italic" | "oblique";

export type SVGUnits = "userSpaceOnUse" | "objectBoundingBox";

export type SVGLengthAdjust = "spacing" | "spacingAndGlyphs";

export type SVGOverflow = "visible" | "hidden" | "scroll" | "auto";

export type SVGPointerEvents = "bounding-box" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all" | "none";

export type SVGRestart = "always" | "whenNotActive" | "never";

export type SVGShapeRendering = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";

export type SVGSpreadMethod = "pad" | "reflect" | "repeat";

export type SVGStrokeLineCap = "butt" | "round" | "square";

export type SVGStrokeLineJoin = "arcs" | "bevel" | "miter" | "miter-clip" | "round";

export type SVGTextAnchor = "start" | "middle" | "end";

export type SVGUnicodeBidi = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";

export type SVGVectorEffect = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";

export type SVGVisibility = "visible" | "hidden" | "collapse";

export type SVGWhiteSpace = "normal" | "pre" | "nowrap" | "pre-wrap" | "break-space" | "pre-line";

export type SVGWritingMode = "horizontal-tb" | "vertical-rl" | "vertical-lr";

export type SVGColorChannel = "R" | "G" | "B" | "A";

export interface SVGAElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGAElement;
	readonly [S_ELEM_NAME]?: "a";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly href?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly referrerpolicy?: MaybeAtom<ReferrerPolicy>;
	readonly rel?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly target?: MaybeAtom<string>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGAnimateElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGAnimateElement;
	readonly [S_ELEM_NAME]?: "animate";
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeAtom<SVGAccumulate>;
	readonly additive?: MaybeAtom<SVGAdditive>;
	readonly attributeName?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string | number>;
	readonly calcMode?: MaybeAtom<SVGCalcMode>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly from?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
	readonly values?: MaybeAtom<string>;
}

export interface SVGAnimateMotionElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGAnimateMotionElement;
	readonly [S_ELEM_NAME]?: "animateMotion";
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeAtom<SVGAccumulate>;
	readonly additive?: MaybeAtom<SVGAdditive>;
	readonly begin?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string | number>;
	readonly calcMode?: MaybeAtom<SVGCalcMode>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly from?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly path?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly rotate?: MaybeAtom<number | "auto" | "auto-reverse">;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
	readonly values?: MaybeAtom<string>;
}

export interface SVGAnimateTransformElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGAnimateTransformElement;
	readonly [S_ELEM_NAME]?: "animateTransform";
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeAtom<SVGAccumulate>;
	readonly additive?: MaybeAtom<SVGAdditive>;
	readonly attributeName?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly by?: MaybeAtom<string | number>;
	readonly calcMode?: MaybeAtom<SVGCalcMode>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly from?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly keySplines?: MaybeAtom<string>;
	readonly keyTimes?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
	readonly type?: MaybeAtom<string>;
	readonly values?: MaybeAtom<string>;
}

export interface SVGCircleElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGCircleElement;
	readonly [S_ELEM_NAME]?: "circle";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string | number>;
	readonly cy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly r?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGClipPathElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGClipPathElement;
	readonly [S_ELEM_NAME]?: "clipPath";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly clipPathUnits?: MaybeAtom<SVGUnits>;
	readonly mask?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGDefsElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGDefsElement;
	readonly [S_ELEM_NAME]?: "defs";
	readonly children?: JsxChildren;
	readonly cursor?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGDescElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGDescElement;
	readonly [S_ELEM_NAME]?: "desc";
	readonly children?: JsxChildren;
}

export interface SVGEllipseElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGEllipseElement;
	readonly [S_ELEM_NAME]?: "ellipse";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly cx?: MaybeAtom<string | number>;
	readonly cy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string | number>;
	readonly ry?: MaybeAtom<string | number>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGFEBlendElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEBlendElement;
	readonly [S_ELEM_NAME]?: "feBlend";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly mode?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEColorMatrixElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEColorMatrixElement;
	readonly [S_ELEM_NAME]?: "feColorMatrix";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly values?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEComponentTransferElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEComponentTransferElement;
	readonly [S_ELEM_NAME]?: "feComponentTransfer";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFECompositeElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFECompositeElement;
	readonly [S_ELEM_NAME]?: "feComposite";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly k1?: MaybeAtom<string | number>;
	readonly k2?: MaybeAtom<string | number>;
	readonly k3?: MaybeAtom<string | number>;
	readonly k4?: MaybeAtom<string | number>;
	readonly operator?: MaybeAtom<"in" | "over" | "out" | "atop" | "xor" | "lighter" | "arithmetic">;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEConvolveMatrixElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEConvolveMatrixElement;
	readonly [S_ELEM_NAME]?: "feConvolveMatrix";
	readonly children?: JsxChildren;
	readonly bias?: MaybeAtom<string | number>;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly divisor?: MaybeAtom<string | number>;
	readonly edgeMode?: MaybeAtom<SVGEdgeMode>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly kernelMatrix?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string | number>;
	readonly order?: MaybeAtom<string | number>;
	readonly preserveAlpha?: MaybeAtom<string | boolean>;
	readonly result?: MaybeAtom<string>;
	readonly targetX?: MaybeAtom<string | number>;
	readonly targetY?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEDiffuseLightingElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEDiffuseLightingElement;
	readonly [S_ELEM_NAME]?: "feDiffuseLighting";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly diffuseConstant?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string | number>;
	readonly "lighting-color"?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly surfaceScale?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEDisplacementMapElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEDisplacementMapElement;
	readonly [S_ELEM_NAME]?: "feDisplacementMap";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly in2?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly scale?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly xChannelSelector?: MaybeAtom<SVGColorChannel>;
	readonly y?: MaybeAtom<string | number>;
	readonly yChannelSelector?: MaybeAtom<SVGColorChannel>;
}

export interface SVGFEDistantLightElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEDistantLightElement;
	readonly [S_ELEM_NAME]?: "feDistantLight";
	readonly children?: JsxChildren;
	readonly azimuth?: MaybeAtom<string | number>;
	readonly elevation?: MaybeAtom<string | number>;
}

export interface SVGFEDropShadowElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEDropShadowElement;
	readonly [S_ELEM_NAME]?: "feDropShadow";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly "flood-color"?: MaybeAtom<string>;
	readonly "flood-opacity"?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly stdDeviation?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFloodElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEFloodElement;
	readonly [S_ELEM_NAME]?: "feFlood";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly "flood-color"?: MaybeAtom<string>;
	readonly "flood-opacity"?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncAElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncAElement;
	readonly [S_ELEM_NAME]?: "feFuncA";
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncBElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncBElement;
	readonly [S_ELEM_NAME]?: "feFuncB";
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncGElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncGElement;
	readonly [S_ELEM_NAME]?: "feFuncG";
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEFuncRElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncRElement;
	readonly [S_ELEM_NAME]?: "feFuncR";
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeAtom<string | number>;
	readonly exponent?: MaybeAtom<string | number>;
	readonly intercept?: MaybeAtom<string | number>;
	readonly slope?: MaybeAtom<string | number>;
	readonly tableValues?: MaybeAtom<string>;
	readonly type?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEGaussianBlurElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEGaussianBlurElement;
	readonly [S_ELEM_NAME]?: "feGaussianBlur";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly edgeMode?: MaybeAtom<SVGEdgeMode>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly stdDeviation?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEImageElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEImageElement;
	readonly [S_ELEM_NAME]?: "feImage";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEMergeElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeElement;
	readonly [S_ELEM_NAME]?: "feMerge";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEMergeNodeElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeNodeElement;
	readonly [S_ELEM_NAME]?: "feMergeNode";
	readonly children?: JsxChildren;
	readonly in?: MaybeAtom<string>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEMorphologyElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEMorphologyElement;
	readonly [S_ELEM_NAME]?: "feMorphology";
	readonly children?: JsxChildren;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly operator?: MaybeAtom<"erode" | "dilate">;
	readonly radius?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEOffsetElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEOffsetElement;
	readonly [S_ELEM_NAME]?: "feOffset";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFEPointLightElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFEPointLightElement;
	readonly [S_ELEM_NAME]?: "fePointLight";
	readonly children?: JsxChildren;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
	readonly z?: MaybeAtom<string | number>;
}

export interface SVGFESpecularLightingElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFESpecularLightingElement;
	readonly [S_ELEM_NAME]?: "feSpecularLighting";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly kernelUnitLength?: MaybeAtom<string | number>;
	readonly "lighting-color"?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly specularConstant?: MaybeAtom<string | number>;
	readonly specularExponent?: MaybeAtom<string | number>;
	readonly surfaceScale?: MaybeAtom<string | number>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFESpotLightElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFESpotLightElement;
	readonly [S_ELEM_NAME]?: "feSpotLight";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly limitingConeAngle?: MaybeAtom<string | number>;
	readonly pointsAtX?: MaybeAtom<string | number>;
	readonly pointsAtY?: MaybeAtom<string | number>;
	readonly pointsAtZ?: MaybeAtom<string | number>;
	readonly specularExponent?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
	readonly z?: MaybeAtom<string | number>;
}

export interface SVGFETileElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFETileElement;
	readonly [S_ELEM_NAME]?: "feTile";
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly in?: MaybeAtom<string>;
	readonly result?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFETurbulenceElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFETurbulenceElement;
	readonly [S_ELEM_NAME]?: "feTurbulence";
	readonly children?: JsxChildren;
	readonly baseFrequency?: MaybeAtom<string | number>;
	readonly "color-interpolation-filters"?: MaybeAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeAtom<string | number>;
	readonly numOctaves?: MaybeAtom<string | number>;
	readonly result?: MaybeAtom<string>;
	readonly seed?: MaybeAtom<string | number>;
	readonly stitchTiles?: MaybeAtom<"noStitch" | "stitch">;
	readonly type?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGFilterElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGFilterElement;
	readonly [S_ELEM_NAME]?: "filter";
	readonly children?: JsxChildren;
	readonly filterUnits?: MaybeAtom<SVGUnits>;
	readonly height?: MaybeAtom<string | number>;
	readonly primitiveUnits?: MaybeAtom<SVGUnits>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGGElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGGElement;
	readonly [S_ELEM_NAME]?: "g";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGImageElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGImageElement;
	readonly [S_ELEM_NAME]?: "image";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly crossorigin?: MaybeAtom<SVGCrossOrigin>;
	readonly cursor?: MaybeAtom<string>;
	readonly decoding?: MaybeAtom<"auto" | "async" | "sync">;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly "image-rendering"?: MaybeAtom<"auto" | "optimizeSpeed" | "optimizeQuality">;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGLineElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGLineElement;
	readonly [S_ELEM_NAME]?: "line";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly orient?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly x1?: MaybeAtom<string | number>;
	readonly x2?: MaybeAtom<string | number>;
	readonly y1?: MaybeAtom<string | number>;
	readonly y2?: MaybeAtom<string | number>;
}

export interface SVGLinearGradientElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGLinearGradientElement;
	readonly [S_ELEM_NAME]?: "linearGradient";
	readonly children?: JsxChildren;
	readonly gradientTransform?: MaybeAtom<string>;
	readonly gradientUnits?: MaybeAtom<SVGUnits>;
	readonly href?: MaybeAtom<string>;
	readonly spreadMethod?: MaybeAtom<SVGSpreadMethod>;
	readonly x1?: MaybeAtom<string | number>;
	readonly x2?: MaybeAtom<string | number>;
	readonly y1?: MaybeAtom<string | number>;
	readonly y2?: MaybeAtom<string | number>;
}

export interface SVGMarkerElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGMarkerElement;
	readonly [S_ELEM_NAME]?: "marker";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly markerHeight?: MaybeAtom<string | number>;
	readonly markerUnits?: MaybeAtom<"strokeWidth" | "userSpaceOnUse">;
	readonly markerWidth?: MaybeAtom<string | number>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly refX?: MaybeAtom<string | number>;
	readonly refY?: MaybeAtom<string | number>;
	readonly viewBox?: MaybeAtom<string>;
}

export interface SVGMaskElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGMaskElement;
	readonly [S_ELEM_NAME]?: "mask";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly mask?: MaybeAtom<string>;
	readonly "mask-type"?: MaybeAtom<"alpha" | "luminance">;
	readonly maskContentUnits?: MaybeAtom<SVGUnits>;
	readonly maskUnits?: MaybeAtom<SVGUnits>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGMetadataElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGMetadataElement;
	readonly [S_ELEM_NAME]?: "metadata";
	readonly children?: JsxChildren;
}

export interface SVGMPathElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGMPathElement;
	readonly [S_ELEM_NAME]?: "mpath";
	readonly children?: JsxChildren;
	readonly href?: MaybeAtom<string>;
}

export interface SVGPathElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGPathElement;
	readonly [S_ELEM_NAME]?: "path";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly d?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGPatternElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGPatternElement;
	readonly [S_ELEM_NAME]?: "pattern";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly patternContentUnits?: MaybeAtom<SVGUnits>;
	readonly patternTransform?: MaybeAtom<string>;
	readonly patternUnits?: MaybeAtom<SVGUnits>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGPolygonElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGPolygonElement;
	readonly [S_ELEM_NAME]?: "polygon";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly points?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGPolylineElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGPolylineElement;
	readonly [S_ELEM_NAME]?: "polyline";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly points?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
}

export interface SVGRadialGradientElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGRadialGradientElement;
	readonly [S_ELEM_NAME]?: "radialGradient";
	readonly children?: JsxChildren;
	readonly cx?: MaybeAtom<string | number>;
	readonly cy?: MaybeAtom<string | number>;
	readonly fr?: MaybeAtom<string | number>;
	readonly fx?: MaybeAtom<string | number>;
	readonly fy?: MaybeAtom<string | number>;
	readonly gradientTransform?: MaybeAtom<string>;
	readonly gradientUnits?: MaybeAtom<SVGUnits>;
	readonly href?: MaybeAtom<string>;
	readonly r?: MaybeAtom<string | number>;
	readonly spreadMethod?: MaybeAtom<SVGSpreadMethod>;
}

export interface SVGRectElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGRectElement;
	readonly [S_ELEM_NAME]?: "rect";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly height?: MaybeAtom<string | number>;
	readonly "marker-end"?: MaybeAtom<string>;
	readonly "marker-mid"?: MaybeAtom<string>;
	readonly "marker-start"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly pathLength?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly rx?: MaybeAtom<string | number>;
	readonly ry?: MaybeAtom<string | number>;
	readonly "shape-rendering"?: MaybeAtom<SVGShapeRendering>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGSetElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGSetElement;
	readonly [S_ELEM_NAME]?: "set";
	readonly children?: JsxChildren;
	readonly attributeName?: MaybeAtom<string>;
	readonly begin?: MaybeAtom<string>;
	readonly dur?: MaybeAtom<string | number>;
	readonly end?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<SVGFillMode>;
	readonly href?: MaybeAtom<string>;
	readonly keyPoints?: MaybeAtom<string>;
	readonly max?: MaybeAtom<string>;
	readonly min?: MaybeAtom<string>;
	readonly repeatCount?: MaybeAtom<number | "indefinite">;
	readonly repeatDur?: MaybeAtom<string | number>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly restart?: MaybeAtom<SVGRestart>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly to?: MaybeAtom<string | number>;
}

export interface SVGStopElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGStopElement;
	readonly [S_ELEM_NAME]?: "stop";
	readonly children?: never;
	readonly "stop-color"?: MaybeAtom<string>;
	readonly "stop-opacity"?: MaybeAtom<string | number>;
}

export interface SVGSVGElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGSVGElement;
	readonly [S_ELEM_NAME]?: "svg";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly fill?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGSwitchElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGSwitchElement;
	readonly [S_ELEM_NAME]?: "switch";
	readonly children?: JsxChildren;
	readonly cursor?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
}

export interface SVGSymbolElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGSymbolElement;
	readonly [S_ELEM_NAME]?: "symbol";
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly cursor?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
}

export interface SVGTextElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGTextElement;
	readonly [S_ELEM_NAME]?: "text";
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeAtom<SVGAlignmentBaseline>;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeAtom<SVGDominantBaseline>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string | number>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string | number>;
	readonly lengthAdjust?: MaybeAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly overflow?: MaybeAtom<SVGOverflow>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<"clip" | "ellipses">;
	readonly "text-rendering"?: MaybeAtom<"auto" | "optimizeSpeed" | "geometricPrecision" | "optimizeLegibility">;
	readonly textLength?: MaybeAtom<string | number>;
	readonly "unicode-bidi"?: MaybeAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly "white-space"?: MaybeAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeAtom<string | number>;
	readonly "writing-mode"?: MaybeAtom<SVGWritingMode>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGTextPathElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGTextPathElement;
	readonly [S_ELEM_NAME]?: "textPath";
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeAtom<SVGAlignmentBaseline>;
	readonly "baseline-shift"?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeAtom<SVGDominantBaseline>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string | number>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly lengthAdjust?: MaybeAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly method?: MaybeAtom<"align" | "stretch">;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly path?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly spacing?: MaybeAtom<"auto" | "exact">;
	readonly startOffset?: MaybeAtom<string | number>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<"clip" | "ellipses">;
	readonly textLength?: MaybeAtom<string | number>;
	readonly "unicode-bidi"?: MaybeAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly "white-space"?: MaybeAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeAtom<string | number>;
	readonly "writing-mode"?: MaybeAtom<SVGWritingMode>;
}

export interface SVGTitleElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGTitleElement;
	readonly [S_ELEM_NAME]?: "title";
	readonly children?: JsxChildren;
}

export interface SVGTSpanElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGTSpanElement;
	readonly [S_ELEM_NAME]?: "tspan";
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeAtom<SVGAlignmentBaseline>;
	readonly "baseline-shift"?: MaybeAtom<string>;
	readonly direction?: MaybeAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeAtom<SVGDominantBaseline>;
	readonly dx?: MaybeAtom<string | number>;
	readonly dy?: MaybeAtom<string | number>;
	readonly fill?: MaybeAtom<string>;
	readonly "fill-opacity"?: MaybeAtom<string | number>;
	readonly "fill-rule"?: MaybeAtom<SVGFillRule>;
	readonly "font-family"?: MaybeAtom<string>;
	readonly "font-size"?: MaybeAtom<string | number>;
	readonly "font-size-adjust"?: MaybeAtom<string>;
	readonly "font-style"?: MaybeAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeAtom<string>;
	readonly "font-weight"?: MaybeAtom<string | number>;
	readonly lengthAdjust?: MaybeAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "paint-order"?: MaybeAtom<string>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly stroke?: MaybeAtom<string>;
	readonly "stroke-dasharray"?: MaybeAtom<string>;
	readonly "stroke-dashoffset"?: MaybeAtom<string | number>;
	readonly "stroke-linecap"?: MaybeAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeAtom<string | number>;
	readonly "stroke-opacity"?: MaybeAtom<string | number>;
	readonly "stroke-width"?: MaybeAtom<string | number>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "text-anchor"?: MaybeAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeAtom<string>;
	readonly "text-overflow"?: MaybeAtom<"clip" | "ellipses">;
	readonly textLength?: MaybeAtom<string | number>;
	readonly "unicode-bidi"?: MaybeAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly visibility?: MaybeAtom<SVGVisibility>;
	readonly "white-space"?: MaybeAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeAtom<string | number>;
	readonly "writing-mode"?: MaybeAtom<SVGWritingMode>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGUseElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGUseElement;
	readonly [S_ELEM_NAME]?: "use";
	readonly children?: never;
	readonly "clip-path"?: MaybeAtom<string>;
	readonly "clip-rule"?: MaybeAtom<SVGClipRule>;
	readonly cursor?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string | number>;
	readonly href?: MaybeAtom<string>;
	readonly mask?: MaybeAtom<string>;
	readonly opacity?: MaybeAtom<string | number>;
	readonly "pointer-events"?: MaybeAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeAtom<string>;
	readonly systemLanguage?: MaybeAtom<string>;
	readonly "vector-effect"?: MaybeAtom<SVGVectorEffect>;
	readonly width?: MaybeAtom<string | number>;
	readonly x?: MaybeAtom<string | number>;
	readonly y?: MaybeAtom<string | number>;
}

export interface SVGViewElementProps extends SVGCommonProps {
	readonly [S_NODE_TYPE]?: SVGViewElement;
	readonly [S_ELEM_NAME]?: "view";
	readonly children?: JsxChildren;
	readonly preserveAspectRatio?: MaybeAtom<string>;
	readonly viewBox?: MaybeAtom<string>;
}

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
	// foreignObject: SVGForeignObjectElementProps;
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

export interface MathMLCommonProps {
	readonly dir?: MaybeAtom<"rtl" | "ltr">;
	readonly displaystyle?: MaybeAtom<boolean>;
	readonly mathbackground?: MaybeAtom<string>;
	readonly mathcolor?: MaybeAtom<string>;
	readonly mathsize?: MaybeAtom<string>;
	readonly scriptlevel?: MaybeAtom<string>;
}

export interface MathMLElementProps<N extends "merror" | "mmultiscripts" | "mn" | "mphantom" | "mprescripts" | "mroot" | "ms" | "msqrt" | "mstyle" | "msub" | "msup" | "msubsup" | "mtable" | "mtr"> extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: N;
	readonly children?: JsxChildren;
}

export interface MathMLMathElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mathml";
	readonly children?: JsxChildren;
	readonly display?: MaybeAtom<"block" | "inline">;
}

export interface MatMLFracElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mfrac";
	readonly children?: JsxChildren;
	readonly linethickness?: MaybeAtom<string>;
}

export interface MatMLIElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mi";
	readonly children?: JsxChildren;
	readonly mathvariant?: MaybeAtom<"normal">;
}

export interface MatMLOElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mo";
	readonly children?: JsxChildren;
	readonly fence?: MaybeAtom<boolean>;
	readonly form?: MaybeAtom<"prefix" | "infix" | "postfix">;
	readonly largeop?: MaybeAtom<boolean>;
	readonly lspace?: MaybeAtom<string>;
	readonly maxsize?: MaybeAtom<string>;
	readonly minsize?: MaybeAtom<string>;
	readonly movablelimits?: MaybeAtom<boolean>;
	readonly rspace?: MaybeAtom<string>;
	readonly separator?: MaybeAtom<boolean>;
	readonly stretchy?: MaybeAtom<boolean>;
	readonly symmetric?: MaybeAtom<boolean>;
}

export interface MatMLOverElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mover";
	readonly children?: JsxChildren;
	readonly accent?: MaybeAtom<boolean>;
}

export interface MatMLPaddedElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mpadded";
	readonly children?: JsxChildren;
	readonly depth?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly lspace?: MaybeAtom<string>;
	readonly voffset?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
}

export interface MatMLRowElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mrow";
	readonly children?: JsxChildren;
}

export interface MatMLSpaceElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mspace";
	readonly children?: JsxChildren;
	readonly depth?: MaybeAtom<string>;
	readonly height?: MaybeAtom<string>;
	readonly width?: MaybeAtom<string>;
}

export interface MatMLTDElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mtd";
	readonly children?: JsxChildren;
	readonly columnspan?: MaybeAtom<string | number>;
	readonly rowspan?: MaybeAtom<string | number>;
}

export interface MatMLTextElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "mtext";
	readonly children?: JsxChildren;
}

export interface MatMLUnderElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "munder";
	readonly children?: JsxChildren;
	readonly accentunder?: MaybeAtom<boolean>;
}

export interface MatMLUnderOverElementProps extends MathMLCommonProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly [S_ELEM_NAME]?: "munderover";
	readonly children?: JsxChildren;
	readonly accent?: MaybeAtom<boolean>;
	readonly accentunder?: MaybeAtom<boolean>;
}

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

export interface IntrinsicElements extends HTMLIntrinsicElements, SVGIntrinsicElements, MathMLIntrinsicElements {}

