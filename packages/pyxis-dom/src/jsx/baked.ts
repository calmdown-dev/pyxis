// baked types, do not modify as changes will be lost
// source file: inferred.ts

import type { JsxChildren, MaybeReadonlyAtom, Nil, S_NODE_TYPE } from "@calmdown/pyxis/core";

export interface CSSStyleDeclarationProps {
	readonly accentColor?: MaybeReadonlyAtom<string>;
	readonly alignContent?: MaybeReadonlyAtom<string>;
	readonly alignItems?: MaybeReadonlyAtom<string>;
	readonly alignSelf?: MaybeReadonlyAtom<string>;
	readonly alignmentBaseline?: MaybeReadonlyAtom<string>;
	readonly all?: MaybeReadonlyAtom<string>;
	readonly anchorScope?: MaybeReadonlyAtom<string>;
	readonly animation?: MaybeReadonlyAtom<string>;
	readonly animationComposition?: MaybeReadonlyAtom<string>;
	readonly animationDelay?: MaybeReadonlyAtom<string>;
	readonly animationDirection?: MaybeReadonlyAtom<string>;
	readonly animationDuration?: MaybeReadonlyAtom<string>;
	readonly animationFillMode?: MaybeReadonlyAtom<string>;
	readonly animationIterationCount?: MaybeReadonlyAtom<string>;
	readonly animationName?: MaybeReadonlyAtom<string>;
	readonly animationPlayState?: MaybeReadonlyAtom<string>;
	readonly animationRange?: MaybeReadonlyAtom<string>;
	readonly animationRangeEnd?: MaybeReadonlyAtom<string>;
	readonly animationRangeStart?: MaybeReadonlyAtom<string>;
	readonly animationTimeline?: MaybeReadonlyAtom<string>;
	readonly animationTimingFunction?: MaybeReadonlyAtom<string>;
	readonly appearance?: MaybeReadonlyAtom<string>;
	readonly aspectRatio?: MaybeReadonlyAtom<string>;
	readonly backdropFilter?: MaybeReadonlyAtom<string>;
	readonly backfaceVisibility?: MaybeReadonlyAtom<string>;
	readonly background?: MaybeReadonlyAtom<string>;
	readonly backgroundAttachment?: MaybeReadonlyAtom<string>;
	readonly backgroundBlendMode?: MaybeReadonlyAtom<string>;
	readonly backgroundClip?: MaybeReadonlyAtom<string>;
	readonly backgroundColor?: MaybeReadonlyAtom<string>;
	readonly backgroundImage?: MaybeReadonlyAtom<string>;
	readonly backgroundOrigin?: MaybeReadonlyAtom<string>;
	readonly backgroundPosition?: MaybeReadonlyAtom<string>;
	readonly backgroundPositionX?: MaybeReadonlyAtom<string>;
	readonly backgroundPositionY?: MaybeReadonlyAtom<string>;
	readonly backgroundRepeat?: MaybeReadonlyAtom<string>;
	readonly backgroundSize?: MaybeReadonlyAtom<string>;
	readonly baselineShift?: MaybeReadonlyAtom<string>;
	readonly baselineSource?: MaybeReadonlyAtom<string>;
	readonly blockSize?: MaybeReadonlyAtom<string>;
	readonly border?: MaybeReadonlyAtom<string>;
	readonly borderBlock?: MaybeReadonlyAtom<string>;
	readonly borderBlockColor?: MaybeReadonlyAtom<string>;
	readonly borderBlockEnd?: MaybeReadonlyAtom<string>;
	readonly borderBlockEndColor?: MaybeReadonlyAtom<string>;
	readonly borderBlockEndStyle?: MaybeReadonlyAtom<string>;
	readonly borderBlockEndWidth?: MaybeReadonlyAtom<string>;
	readonly borderBlockStart?: MaybeReadonlyAtom<string>;
	readonly borderBlockStartColor?: MaybeReadonlyAtom<string>;
	readonly borderBlockStartStyle?: MaybeReadonlyAtom<string>;
	readonly borderBlockStartWidth?: MaybeReadonlyAtom<string>;
	readonly borderBlockStyle?: MaybeReadonlyAtom<string>;
	readonly borderBlockWidth?: MaybeReadonlyAtom<string>;
	readonly borderBottom?: MaybeReadonlyAtom<string>;
	readonly borderBottomColor?: MaybeReadonlyAtom<string>;
	readonly borderBottomLeftRadius?: MaybeReadonlyAtom<string>;
	readonly borderBottomRightRadius?: MaybeReadonlyAtom<string>;
	readonly borderBottomStyle?: MaybeReadonlyAtom<string>;
	readonly borderBottomWidth?: MaybeReadonlyAtom<string>;
	readonly borderCollapse?: MaybeReadonlyAtom<string>;
	readonly borderColor?: MaybeReadonlyAtom<string>;
	readonly borderEndEndRadius?: MaybeReadonlyAtom<string>;
	readonly borderEndStartRadius?: MaybeReadonlyAtom<string>;
	readonly borderImage?: MaybeReadonlyAtom<string>;
	readonly borderImageOutset?: MaybeReadonlyAtom<string>;
	readonly borderImageRepeat?: MaybeReadonlyAtom<string>;
	readonly borderImageSlice?: MaybeReadonlyAtom<string>;
	readonly borderImageSource?: MaybeReadonlyAtom<string>;
	readonly borderImageWidth?: MaybeReadonlyAtom<string>;
	readonly borderInline?: MaybeReadonlyAtom<string>;
	readonly borderInlineColor?: MaybeReadonlyAtom<string>;
	readonly borderInlineEnd?: MaybeReadonlyAtom<string>;
	readonly borderInlineEndColor?: MaybeReadonlyAtom<string>;
	readonly borderInlineEndStyle?: MaybeReadonlyAtom<string>;
	readonly borderInlineEndWidth?: MaybeReadonlyAtom<string>;
	readonly borderInlineStart?: MaybeReadonlyAtom<string>;
	readonly borderInlineStartColor?: MaybeReadonlyAtom<string>;
	readonly borderInlineStartStyle?: MaybeReadonlyAtom<string>;
	readonly borderInlineStartWidth?: MaybeReadonlyAtom<string>;
	readonly borderInlineStyle?: MaybeReadonlyAtom<string>;
	readonly borderInlineWidth?: MaybeReadonlyAtom<string>;
	readonly borderLeft?: MaybeReadonlyAtom<string>;
	readonly borderLeftColor?: MaybeReadonlyAtom<string>;
	readonly borderLeftStyle?: MaybeReadonlyAtom<string>;
	readonly borderLeftWidth?: MaybeReadonlyAtom<string>;
	readonly borderRadius?: MaybeReadonlyAtom<string>;
	readonly borderRight?: MaybeReadonlyAtom<string>;
	readonly borderRightColor?: MaybeReadonlyAtom<string>;
	readonly borderRightStyle?: MaybeReadonlyAtom<string>;
	readonly borderRightWidth?: MaybeReadonlyAtom<string>;
	readonly borderSpacing?: MaybeReadonlyAtom<string>;
	readonly borderStartEndRadius?: MaybeReadonlyAtom<string>;
	readonly borderStartStartRadius?: MaybeReadonlyAtom<string>;
	readonly borderStyle?: MaybeReadonlyAtom<string>;
	readonly borderTop?: MaybeReadonlyAtom<string>;
	readonly borderTopColor?: MaybeReadonlyAtom<string>;
	readonly borderTopLeftRadius?: MaybeReadonlyAtom<string>;
	readonly borderTopRightRadius?: MaybeReadonlyAtom<string>;
	readonly borderTopStyle?: MaybeReadonlyAtom<string>;
	readonly borderTopWidth?: MaybeReadonlyAtom<string>;
	readonly borderWidth?: MaybeReadonlyAtom<string>;
	readonly bottom?: MaybeReadonlyAtom<string>;
	readonly boxDecorationBreak?: MaybeReadonlyAtom<string>;
	readonly boxShadow?: MaybeReadonlyAtom<string>;
	readonly boxSizing?: MaybeReadonlyAtom<string>;
	readonly breakAfter?: MaybeReadonlyAtom<string>;
	readonly breakBefore?: MaybeReadonlyAtom<string>;
	readonly breakInside?: MaybeReadonlyAtom<string>;
	readonly captionSide?: MaybeReadonlyAtom<string>;
	readonly caretColor?: MaybeReadonlyAtom<string>;
	readonly clear?: MaybeReadonlyAtom<string>;
	readonly clipPath?: MaybeReadonlyAtom<string>;
	readonly clipRule?: MaybeReadonlyAtom<string>;
	readonly color?: MaybeReadonlyAtom<string>;
	readonly colorInterpolation?: MaybeReadonlyAtom<string>;
	readonly colorInterpolationFilters?: MaybeReadonlyAtom<string>;
	readonly colorScheme?: MaybeReadonlyAtom<string>;
	readonly columnCount?: MaybeReadonlyAtom<string>;
	readonly columnFill?: MaybeReadonlyAtom<string>;
	readonly columnGap?: MaybeReadonlyAtom<string>;
	readonly columnRule?: MaybeReadonlyAtom<string>;
	readonly columnRuleColor?: MaybeReadonlyAtom<string>;
	readonly columnRuleStyle?: MaybeReadonlyAtom<string>;
	readonly columnRuleWidth?: MaybeReadonlyAtom<string>;
	readonly columnSpan?: MaybeReadonlyAtom<string>;
	readonly columnWidth?: MaybeReadonlyAtom<string>;
	readonly columns?: MaybeReadonlyAtom<string>;
	readonly contain?: MaybeReadonlyAtom<string>;
	readonly containIntrinsicBlockSize?: MaybeReadonlyAtom<string>;
	readonly containIntrinsicHeight?: MaybeReadonlyAtom<string>;
	readonly containIntrinsicInlineSize?: MaybeReadonlyAtom<string>;
	readonly containIntrinsicSize?: MaybeReadonlyAtom<string>;
	readonly containIntrinsicWidth?: MaybeReadonlyAtom<string>;
	readonly container?: MaybeReadonlyAtom<string>;
	readonly containerName?: MaybeReadonlyAtom<string>;
	readonly containerType?: MaybeReadonlyAtom<string>;
	readonly content?: MaybeReadonlyAtom<string>;
	readonly contentVisibility?: MaybeReadonlyAtom<string>;
	readonly counterIncrement?: MaybeReadonlyAtom<string>;
	readonly counterReset?: MaybeReadonlyAtom<string>;
	readonly counterSet?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly cx?: MaybeReadonlyAtom<string>;
	readonly cy?: MaybeReadonlyAtom<string>;
	readonly d?: MaybeReadonlyAtom<string>;
	readonly direction?: MaybeReadonlyAtom<string>;
	readonly display?: MaybeReadonlyAtom<string>;
	readonly dominantBaseline?: MaybeReadonlyAtom<string>;
	readonly dynamicRangeLimit?: MaybeReadonlyAtom<string>;
	readonly emptyCells?: MaybeReadonlyAtom<string>;
	readonly fieldSizing?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly fillOpacity?: MaybeReadonlyAtom<string>;
	readonly fillRule?: MaybeReadonlyAtom<string>;
	readonly filter?: MaybeReadonlyAtom<string>;
	readonly flex?: MaybeReadonlyAtom<string>;
	readonly flexBasis?: MaybeReadonlyAtom<string>;
	readonly flexDirection?: MaybeReadonlyAtom<string>;
	readonly flexFlow?: MaybeReadonlyAtom<string>;
	readonly flexGrow?: MaybeReadonlyAtom<string>;
	readonly flexShrink?: MaybeReadonlyAtom<string>;
	readonly flexWrap?: MaybeReadonlyAtom<string>;
	readonly float?: MaybeReadonlyAtom<string>;
	readonly floodColor?: MaybeReadonlyAtom<string>;
	readonly floodOpacity?: MaybeReadonlyAtom<string>;
	readonly font?: MaybeReadonlyAtom<string>;
	readonly fontFamily?: MaybeReadonlyAtom<string>;
	readonly fontFeatureSettings?: MaybeReadonlyAtom<string>;
	readonly fontKerning?: MaybeReadonlyAtom<string>;
	readonly fontLanguageOverride?: MaybeReadonlyAtom<string>;
	readonly fontOpticalSizing?: MaybeReadonlyAtom<string>;
	readonly fontPalette?: MaybeReadonlyAtom<string>;
	readonly fontSize?: MaybeReadonlyAtom<string>;
	readonly fontSizeAdjust?: MaybeReadonlyAtom<string>;
	readonly fontStyle?: MaybeReadonlyAtom<string>;
	readonly fontSynthesis?: MaybeReadonlyAtom<string>;
	readonly fontSynthesisSmallCaps?: MaybeReadonlyAtom<string>;
	readonly fontSynthesisStyle?: MaybeReadonlyAtom<string>;
	readonly fontSynthesisWeight?: MaybeReadonlyAtom<string>;
	readonly fontVariant?: MaybeReadonlyAtom<string>;
	readonly fontVariantAlternates?: MaybeReadonlyAtom<string>;
	readonly fontVariantCaps?: MaybeReadonlyAtom<string>;
	readonly fontVariantEastAsian?: MaybeReadonlyAtom<string>;
	readonly fontVariantEmoji?: MaybeReadonlyAtom<string>;
	readonly fontVariantLigatures?: MaybeReadonlyAtom<string>;
	readonly fontVariantNumeric?: MaybeReadonlyAtom<string>;
	readonly fontVariantPosition?: MaybeReadonlyAtom<string>;
	readonly fontVariationSettings?: MaybeReadonlyAtom<string>;
	readonly fontWeight?: MaybeReadonlyAtom<string>;
	readonly forcedColorAdjust?: MaybeReadonlyAtom<string>;
	readonly gap?: MaybeReadonlyAtom<string>;
	readonly grid?: MaybeReadonlyAtom<string>;
	readonly gridArea?: MaybeReadonlyAtom<string>;
	readonly gridAutoColumns?: MaybeReadonlyAtom<string>;
	readonly gridAutoFlow?: MaybeReadonlyAtom<string>;
	readonly gridAutoRows?: MaybeReadonlyAtom<string>;
	readonly gridColumn?: MaybeReadonlyAtom<string>;
	readonly gridColumnEnd?: MaybeReadonlyAtom<string>;
	readonly gridColumnStart?: MaybeReadonlyAtom<string>;
	readonly gridRow?: MaybeReadonlyAtom<string>;
	readonly gridRowEnd?: MaybeReadonlyAtom<string>;
	readonly gridRowStart?: MaybeReadonlyAtom<string>;
	readonly gridTemplate?: MaybeReadonlyAtom<string>;
	readonly gridTemplateAreas?: MaybeReadonlyAtom<string>;
	readonly gridTemplateColumns?: MaybeReadonlyAtom<string>;
	readonly gridTemplateRows?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly hyphenateCharacter?: MaybeReadonlyAtom<string>;
	readonly hyphenateLimitChars?: MaybeReadonlyAtom<string>;
	readonly hyphens?: MaybeReadonlyAtom<string>;
	readonly imageRendering?: MaybeReadonlyAtom<string>;
	readonly inlineSize?: MaybeReadonlyAtom<string>;
	readonly inset?: MaybeReadonlyAtom<string>;
	readonly insetBlock?: MaybeReadonlyAtom<string>;
	readonly insetBlockEnd?: MaybeReadonlyAtom<string>;
	readonly insetBlockStart?: MaybeReadonlyAtom<string>;
	readonly insetInline?: MaybeReadonlyAtom<string>;
	readonly insetInlineEnd?: MaybeReadonlyAtom<string>;
	readonly insetInlineStart?: MaybeReadonlyAtom<string>;
	readonly isolation?: MaybeReadonlyAtom<string>;
	readonly justifyContent?: MaybeReadonlyAtom<string>;
	readonly justifyItems?: MaybeReadonlyAtom<string>;
	readonly justifySelf?: MaybeReadonlyAtom<string>;
	readonly left?: MaybeReadonlyAtom<string>;
	readonly letterSpacing?: MaybeReadonlyAtom<string>;
	readonly lightingColor?: MaybeReadonlyAtom<string>;
	readonly lineBreak?: MaybeReadonlyAtom<string>;
	readonly lineHeight?: MaybeReadonlyAtom<string>;
	readonly listStyle?: MaybeReadonlyAtom<string>;
	readonly listStyleImage?: MaybeReadonlyAtom<string>;
	readonly listStylePosition?: MaybeReadonlyAtom<string>;
	readonly listStyleType?: MaybeReadonlyAtom<string>;
	readonly margin?: MaybeReadonlyAtom<string>;
	readonly marginBlock?: MaybeReadonlyAtom<string>;
	readonly marginBlockEnd?: MaybeReadonlyAtom<string>;
	readonly marginBlockStart?: MaybeReadonlyAtom<string>;
	readonly marginBottom?: MaybeReadonlyAtom<string>;
	readonly marginInline?: MaybeReadonlyAtom<string>;
	readonly marginInlineEnd?: MaybeReadonlyAtom<string>;
	readonly marginInlineStart?: MaybeReadonlyAtom<string>;
	readonly marginLeft?: MaybeReadonlyAtom<string>;
	readonly marginRight?: MaybeReadonlyAtom<string>;
	readonly marginTop?: MaybeReadonlyAtom<string>;
	readonly marker?: MaybeReadonlyAtom<string>;
	readonly markerEnd?: MaybeReadonlyAtom<string>;
	readonly markerMid?: MaybeReadonlyAtom<string>;
	readonly markerStart?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly maskClip?: MaybeReadonlyAtom<string>;
	readonly maskComposite?: MaybeReadonlyAtom<string>;
	readonly maskImage?: MaybeReadonlyAtom<string>;
	readonly maskMode?: MaybeReadonlyAtom<string>;
	readonly maskOrigin?: MaybeReadonlyAtom<string>;
	readonly maskPosition?: MaybeReadonlyAtom<string>;
	readonly maskRepeat?: MaybeReadonlyAtom<string>;
	readonly maskSize?: MaybeReadonlyAtom<string>;
	readonly maskType?: MaybeReadonlyAtom<string>;
	readonly mathDepth?: MaybeReadonlyAtom<string>;
	readonly mathShift?: MaybeReadonlyAtom<string>;
	readonly mathStyle?: MaybeReadonlyAtom<string>;
	readonly maxBlockSize?: MaybeReadonlyAtom<string>;
	readonly maxHeight?: MaybeReadonlyAtom<string>;
	readonly maxInlineSize?: MaybeReadonlyAtom<string>;
	readonly maxWidth?: MaybeReadonlyAtom<string>;
	readonly minBlockSize?: MaybeReadonlyAtom<string>;
	readonly minHeight?: MaybeReadonlyAtom<string>;
	readonly minInlineSize?: MaybeReadonlyAtom<string>;
	readonly minWidth?: MaybeReadonlyAtom<string>;
	readonly mixBlendMode?: MaybeReadonlyAtom<string>;
	readonly objectFit?: MaybeReadonlyAtom<string>;
	readonly objectPosition?: MaybeReadonlyAtom<string>;
	readonly offset?: MaybeReadonlyAtom<string>;
	readonly offsetAnchor?: MaybeReadonlyAtom<string>;
	readonly offsetDistance?: MaybeReadonlyAtom<string>;
	readonly offsetPath?: MaybeReadonlyAtom<string>;
	readonly offsetPosition?: MaybeReadonlyAtom<string>;
	readonly offsetRotate?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string>;
	readonly order?: MaybeReadonlyAtom<string>;
	readonly orphans?: MaybeReadonlyAtom<string>;
	readonly outline?: MaybeReadonlyAtom<string>;
	readonly outlineColor?: MaybeReadonlyAtom<string>;
	readonly outlineOffset?: MaybeReadonlyAtom<string>;
	readonly outlineStyle?: MaybeReadonlyAtom<string>;
	readonly outlineWidth?: MaybeReadonlyAtom<string>;
	readonly overflow?: MaybeReadonlyAtom<string>;
	readonly overflowAnchor?: MaybeReadonlyAtom<string>;
	readonly overflowBlock?: MaybeReadonlyAtom<string>;
	readonly overflowClipMargin?: MaybeReadonlyAtom<string>;
	readonly overflowInline?: MaybeReadonlyAtom<string>;
	readonly overflowWrap?: MaybeReadonlyAtom<string>;
	readonly overflowX?: MaybeReadonlyAtom<string>;
	readonly overflowY?: MaybeReadonlyAtom<string>;
	readonly overscrollBehavior?: MaybeReadonlyAtom<string>;
	readonly overscrollBehaviorBlock?: MaybeReadonlyAtom<string>;
	readonly overscrollBehaviorInline?: MaybeReadonlyAtom<string>;
	readonly overscrollBehaviorX?: MaybeReadonlyAtom<string>;
	readonly overscrollBehaviorY?: MaybeReadonlyAtom<string>;
	readonly padding?: MaybeReadonlyAtom<string>;
	readonly paddingBlock?: MaybeReadonlyAtom<string>;
	readonly paddingBlockEnd?: MaybeReadonlyAtom<string>;
	readonly paddingBlockStart?: MaybeReadonlyAtom<string>;
	readonly paddingBottom?: MaybeReadonlyAtom<string>;
	readonly paddingInline?: MaybeReadonlyAtom<string>;
	readonly paddingInlineEnd?: MaybeReadonlyAtom<string>;
	readonly paddingInlineStart?: MaybeReadonlyAtom<string>;
	readonly paddingLeft?: MaybeReadonlyAtom<string>;
	readonly paddingRight?: MaybeReadonlyAtom<string>;
	readonly paddingTop?: MaybeReadonlyAtom<string>;
	readonly page?: MaybeReadonlyAtom<string>;
	readonly paintOrder?: MaybeReadonlyAtom<string>;
	readonly perspective?: MaybeReadonlyAtom<string>;
	readonly perspectiveOrigin?: MaybeReadonlyAtom<string>;
	readonly placeContent?: MaybeReadonlyAtom<string>;
	readonly placeItems?: MaybeReadonlyAtom<string>;
	readonly placeSelf?: MaybeReadonlyAtom<string>;
	readonly pointerEvents?: MaybeReadonlyAtom<string>;
	readonly position?: MaybeReadonlyAtom<string>;
	readonly positionTry?: MaybeReadonlyAtom<string>;
	readonly positionTryFallbacks?: MaybeReadonlyAtom<string>;
	readonly positionTryOrder?: MaybeReadonlyAtom<string>;
	readonly positionVisibility?: MaybeReadonlyAtom<string>;
	readonly printColorAdjust?: MaybeReadonlyAtom<string>;
	readonly quotes?: MaybeReadonlyAtom<string>;
	readonly r?: MaybeReadonlyAtom<string>;
	readonly resize?: MaybeReadonlyAtom<string>;
	readonly right?: MaybeReadonlyAtom<string>;
	readonly rotate?: MaybeReadonlyAtom<string>;
	readonly rowGap?: MaybeReadonlyAtom<string>;
	readonly rubyAlign?: MaybeReadonlyAtom<string>;
	readonly rubyPosition?: MaybeReadonlyAtom<string>;
	readonly rx?: MaybeReadonlyAtom<string>;
	readonly ry?: MaybeReadonlyAtom<string>;
	readonly scale?: MaybeReadonlyAtom<string>;
	readonly scrollBehavior?: MaybeReadonlyAtom<string>;
	readonly scrollMargin?: MaybeReadonlyAtom<string>;
	readonly scrollMarginBlock?: MaybeReadonlyAtom<string>;
	readonly scrollMarginBlockEnd?: MaybeReadonlyAtom<string>;
	readonly scrollMarginBlockStart?: MaybeReadonlyAtom<string>;
	readonly scrollMarginBottom?: MaybeReadonlyAtom<string>;
	readonly scrollMarginInline?: MaybeReadonlyAtom<string>;
	readonly scrollMarginInlineEnd?: MaybeReadonlyAtom<string>;
	readonly scrollMarginInlineStart?: MaybeReadonlyAtom<string>;
	readonly scrollMarginLeft?: MaybeReadonlyAtom<string>;
	readonly scrollMarginRight?: MaybeReadonlyAtom<string>;
	readonly scrollMarginTop?: MaybeReadonlyAtom<string>;
	readonly scrollPadding?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingBlock?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingBlockEnd?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingBlockStart?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingBottom?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingInline?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingInlineEnd?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingInlineStart?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingLeft?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingRight?: MaybeReadonlyAtom<string>;
	readonly scrollPaddingTop?: MaybeReadonlyAtom<string>;
	readonly scrollSnapAlign?: MaybeReadonlyAtom<string>;
	readonly scrollSnapStop?: MaybeReadonlyAtom<string>;
	readonly scrollSnapType?: MaybeReadonlyAtom<string>;
	readonly scrollTimeline?: MaybeReadonlyAtom<string>;
	readonly scrollTimelineAxis?: MaybeReadonlyAtom<string>;
	readonly scrollTimelineName?: MaybeReadonlyAtom<string>;
	readonly scrollbarColor?: MaybeReadonlyAtom<string>;
	readonly scrollbarGutter?: MaybeReadonlyAtom<string>;
	readonly scrollbarWidth?: MaybeReadonlyAtom<string>;
	readonly shapeImageThreshold?: MaybeReadonlyAtom<string>;
	readonly shapeMargin?: MaybeReadonlyAtom<string>;
	readonly shapeOutside?: MaybeReadonlyAtom<string>;
	readonly shapeRendering?: MaybeReadonlyAtom<string>;
	readonly stopColor?: MaybeReadonlyAtom<string>;
	readonly stopOpacity?: MaybeReadonlyAtom<string>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly strokeDasharray?: MaybeReadonlyAtom<string>;
	readonly strokeDashoffset?: MaybeReadonlyAtom<string>;
	readonly strokeLinecap?: MaybeReadonlyAtom<string>;
	readonly strokeLinejoin?: MaybeReadonlyAtom<string>;
	readonly strokeMiterlimit?: MaybeReadonlyAtom<string>;
	readonly strokeOpacity?: MaybeReadonlyAtom<string>;
	readonly strokeWidth?: MaybeReadonlyAtom<string>;
	readonly tabSize?: MaybeReadonlyAtom<string>;
	readonly tableLayout?: MaybeReadonlyAtom<string>;
	readonly textAlign?: MaybeReadonlyAtom<string>;
	readonly textAlignLast?: MaybeReadonlyAtom<string>;
	readonly textAnchor?: MaybeReadonlyAtom<string>;
	readonly textAutospace?: MaybeReadonlyAtom<string>;
	readonly textBox?: MaybeReadonlyAtom<string>;
	readonly textBoxEdge?: MaybeReadonlyAtom<string>;
	readonly textBoxTrim?: MaybeReadonlyAtom<string>;
	readonly textCombineUpright?: MaybeReadonlyAtom<string>;
	readonly textDecoration?: MaybeReadonlyAtom<string>;
	readonly textDecorationColor?: MaybeReadonlyAtom<string>;
	readonly textDecorationLine?: MaybeReadonlyAtom<string>;
	readonly textDecorationSkipInk?: MaybeReadonlyAtom<string>;
	readonly textDecorationStyle?: MaybeReadonlyAtom<string>;
	readonly textDecorationThickness?: MaybeReadonlyAtom<string>;
	readonly textEmphasis?: MaybeReadonlyAtom<string>;
	readonly textEmphasisColor?: MaybeReadonlyAtom<string>;
	readonly textEmphasisPosition?: MaybeReadonlyAtom<string>;
	readonly textEmphasisStyle?: MaybeReadonlyAtom<string>;
	readonly textIndent?: MaybeReadonlyAtom<string>;
	readonly textJustify?: MaybeReadonlyAtom<string>;
	readonly textOrientation?: MaybeReadonlyAtom<string>;
	readonly textOverflow?: MaybeReadonlyAtom<string>;
	readonly textRendering?: MaybeReadonlyAtom<string>;
	readonly textShadow?: MaybeReadonlyAtom<string>;
	readonly textTransform?: MaybeReadonlyAtom<string>;
	readonly textUnderlineOffset?: MaybeReadonlyAtom<string>;
	readonly textUnderlinePosition?: MaybeReadonlyAtom<string>;
	readonly textWrap?: MaybeReadonlyAtom<string>;
	readonly textWrapMode?: MaybeReadonlyAtom<string>;
	readonly textWrapStyle?: MaybeReadonlyAtom<string>;
	readonly timelineScope?: MaybeReadonlyAtom<string>;
	readonly top?: MaybeReadonlyAtom<string>;
	readonly touchAction?: MaybeReadonlyAtom<string>;
	readonly transform?: MaybeReadonlyAtom<string>;
	readonly transformBox?: MaybeReadonlyAtom<string>;
	readonly transformOrigin?: MaybeReadonlyAtom<string>;
	readonly transformStyle?: MaybeReadonlyAtom<string>;
	readonly transition?: MaybeReadonlyAtom<string>;
	readonly transitionBehavior?: MaybeReadonlyAtom<string>;
	readonly transitionDelay?: MaybeReadonlyAtom<string>;
	readonly transitionDuration?: MaybeReadonlyAtom<string>;
	readonly transitionProperty?: MaybeReadonlyAtom<string>;
	readonly transitionTimingFunction?: MaybeReadonlyAtom<string>;
	readonly translate?: MaybeReadonlyAtom<string>;
	readonly unicodeBidi?: MaybeReadonlyAtom<string>;
	readonly userSelect?: MaybeReadonlyAtom<string>;
	readonly vectorEffect?: MaybeReadonlyAtom<string>;
	readonly verticalAlign?: MaybeReadonlyAtom<string>;
	readonly viewTimeline?: MaybeReadonlyAtom<string>;
	readonly viewTimelineAxis?: MaybeReadonlyAtom<string>;
	readonly viewTimelineInset?: MaybeReadonlyAtom<string>;
	readonly viewTimelineName?: MaybeReadonlyAtom<string>;
	readonly viewTransitionClass?: MaybeReadonlyAtom<string>;
	readonly viewTransitionName?: MaybeReadonlyAtom<string>;
	readonly visibility?: MaybeReadonlyAtom<string>;
	readonly webkitLineClamp?: MaybeReadonlyAtom<string>;
	readonly webkitTextFillColor?: MaybeReadonlyAtom<string>;
	readonly webkitTextStroke?: MaybeReadonlyAtom<string>;
	readonly webkitTextStrokeColor?: MaybeReadonlyAtom<string>;
	readonly webkitTextStrokeWidth?: MaybeReadonlyAtom<string>;
	readonly whiteSpace?: MaybeReadonlyAtom<string>;
	readonly whiteSpaceCollapse?: MaybeReadonlyAtom<string>;
	readonly widows?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly willChange?: MaybeReadonlyAtom<string>;
	readonly wordBreak?: MaybeReadonlyAtom<string>;
	readonly wordSpacing?: MaybeReadonlyAtom<string>;
	readonly writingMode?: MaybeReadonlyAtom<string>;
	readonly x?: MaybeReadonlyAtom<string>;
	readonly y?: MaybeReadonlyAtom<string>;
	readonly zIndex?: MaybeReadonlyAtom<string>;
	readonly zoom?: MaybeReadonlyAtom<string>;
	readonly anchorName?: MaybeReadonlyAtom<string>;
	readonly positionAnchor?: MaybeReadonlyAtom<string>;
	readonly positionArea?: MaybeReadonlyAtom<string>;
}

export interface ARIAProps {
	readonly ariaActiveDescendantElement?: MaybeReadonlyAtom<Element | null>;
	readonly ariaAtomic?: MaybeReadonlyAtom<string | null>;
	readonly ariaAutoComplete?: MaybeReadonlyAtom<string | null>;
	readonly ariaBrailleLabel?: MaybeReadonlyAtom<string | null>;
	readonly ariaBrailleRoleDescription?: MaybeReadonlyAtom<string | null>;
	readonly ariaBusy?: MaybeReadonlyAtom<string | null>;
	readonly ariaChecked?: MaybeReadonlyAtom<string | null>;
	readonly ariaColCount?: MaybeReadonlyAtom<string | null>;
	readonly ariaColIndex?: MaybeReadonlyAtom<string | null>;
	readonly ariaColIndexText?: MaybeReadonlyAtom<string | null>;
	readonly ariaColSpan?: MaybeReadonlyAtom<string | null>;
	readonly ariaControlsElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaCurrent?: MaybeReadonlyAtom<string | null>;
	readonly ariaDescribedByElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaDescription?: MaybeReadonlyAtom<string | null>;
	readonly ariaDetailsElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaDisabled?: MaybeReadonlyAtom<string | null>;
	readonly ariaErrorMessageElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaExpanded?: MaybeReadonlyAtom<string | null>;
	readonly ariaFlowToElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaHasPopup?: MaybeReadonlyAtom<string | null>;
	readonly ariaHidden?: MaybeReadonlyAtom<string | null>;
	readonly ariaInvalid?: MaybeReadonlyAtom<string | null>;
	readonly ariaKeyShortcuts?: MaybeReadonlyAtom<string | null>;
	readonly ariaLabel?: MaybeReadonlyAtom<string | null>;
	readonly ariaLabelledByElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaLevel?: MaybeReadonlyAtom<string | null>;
	readonly ariaLive?: MaybeReadonlyAtom<string | null>;
	readonly ariaModal?: MaybeReadonlyAtom<string | null>;
	readonly ariaMultiLine?: MaybeReadonlyAtom<string | null>;
	readonly ariaMultiSelectable?: MaybeReadonlyAtom<string | null>;
	readonly ariaOrientation?: MaybeReadonlyAtom<string | null>;
	readonly ariaOwnsElements?: MaybeReadonlyAtom<readonly Element[] | null>;
	readonly ariaPlaceholder?: MaybeReadonlyAtom<string | null>;
	readonly ariaPosInSet?: MaybeReadonlyAtom<string | null>;
	readonly ariaPressed?: MaybeReadonlyAtom<string | null>;
	readonly ariaReadOnly?: MaybeReadonlyAtom<string | null>;
	readonly ariaRelevant?: MaybeReadonlyAtom<string | null>;
	readonly ariaRequired?: MaybeReadonlyAtom<string | null>;
	readonly ariaRoleDescription?: MaybeReadonlyAtom<string | null>;
	readonly ariaRowCount?: MaybeReadonlyAtom<string | null>;
	readonly ariaRowIndex?: MaybeReadonlyAtom<string | null>;
	readonly ariaRowIndexText?: MaybeReadonlyAtom<string | null>;
	readonly ariaRowSpan?: MaybeReadonlyAtom<string | null>;
	readonly ariaSelected?: MaybeReadonlyAtom<string | null>;
	readonly ariaSetSize?: MaybeReadonlyAtom<string | null>;
	readonly ariaSort?: MaybeReadonlyAtom<string | null>;
	readonly ariaValueMax?: MaybeReadonlyAtom<string | null>;
	readonly ariaValueMin?: MaybeReadonlyAtom<string | null>;
	readonly ariaValueNow?: MaybeReadonlyAtom<string | null>;
	readonly ariaValueText?: MaybeReadonlyAtom<string | null>;
	readonly role?: MaybeReadonlyAtom<string | null>;
}

export interface HTMLGlobalProps {
	readonly translate?: MaybeReadonlyAtom<boolean>;
	readonly part?: MaybeReadonlyAtom<string>;
	readonly class?: MaybeReadonlyAtom<string>;
	readonly accessKey?: MaybeReadonlyAtom<string>;
	readonly autocapitalize?: MaybeReadonlyAtom<string>;
	readonly autocorrect?: MaybeReadonlyAtom<boolean>;
	readonly dir?: MaybeReadonlyAtom<string>;
	readonly draggable?: MaybeReadonlyAtom<boolean>;
	readonly hidden?: MaybeReadonlyAtom<boolean | "until-found">;
	readonly inert?: MaybeReadonlyAtom<boolean>;
	readonly lang?: MaybeReadonlyAtom<string>;
	readonly popover?: MaybeReadonlyAtom<string | null>;
	readonly spellcheck?: MaybeReadonlyAtom<boolean>;
	readonly title?: MaybeReadonlyAtom<string>;
	readonly writingSuggestions?: MaybeReadonlyAtom<string>;
	readonly id?: MaybeReadonlyAtom<string>;
	readonly scrollLeft?: MaybeReadonlyAtom<number>;
	readonly scrollTop?: MaybeReadonlyAtom<number>;
	readonly slot?: MaybeReadonlyAtom<string>;
	readonly contentEditable?: MaybeReadonlyAtom<string>;
	readonly enterKeyHint?: MaybeReadonlyAtom<string>;
	readonly inputMode?: MaybeReadonlyAtom<string>;
	readonly autofocus?: MaybeReadonlyAtom<boolean>;
	readonly nonce?: MaybeReadonlyAtom<string>;
	readonly tabIndex?: MaybeReadonlyAtom<number>;
}

export interface HTMLAnchorElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLAnchorElement;
	readonly children?: JsxChildren;
	readonly charset?: MaybeReadonlyAtom<string>;
	readonly coords?: MaybeReadonlyAtom<string>;
	readonly download?: MaybeReadonlyAtom<string>;
	readonly hreflang?: MaybeReadonlyAtom<string>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly ping?: MaybeReadonlyAtom<string>;
	readonly referrerPolicy?: MaybeReadonlyAtom<string>;
	readonly rel?: MaybeReadonlyAtom<string>;
	readonly relList?: MaybeReadonlyAtom<string>;
	readonly rev?: MaybeReadonlyAtom<string>;
	readonly shape?: MaybeReadonlyAtom<string>;
	readonly target?: MaybeReadonlyAtom<string>;
	readonly text?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly hash?: MaybeReadonlyAtom<string>;
	readonly host?: MaybeReadonlyAtom<string>;
	readonly hostname?: MaybeReadonlyAtom<string>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly password?: MaybeReadonlyAtom<string>;
	readonly pathname?: MaybeReadonlyAtom<string>;
	readonly port?: MaybeReadonlyAtom<string>;
	readonly protocol?: MaybeReadonlyAtom<string>;
	readonly search?: MaybeReadonlyAtom<string>;
	readonly username?: MaybeReadonlyAtom<string>;
}

export interface HTMLAreaElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLAreaElement;
	readonly children?: never;
	readonly coords?: MaybeReadonlyAtom<string>;
	readonly download?: MaybeReadonlyAtom<string>;
	readonly ping?: MaybeReadonlyAtom<string>;
	readonly referrerPolicy?: MaybeReadonlyAtom<string>;
	readonly rel?: MaybeReadonlyAtom<string>;
	readonly relList?: MaybeReadonlyAtom<string>;
	readonly shape?: MaybeReadonlyAtom<string>;
	readonly target?: MaybeReadonlyAtom<string>;
	readonly hash?: MaybeReadonlyAtom<string>;
	readonly host?: MaybeReadonlyAtom<string>;
	readonly hostname?: MaybeReadonlyAtom<string>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly password?: MaybeReadonlyAtom<string>;
	readonly pathname?: MaybeReadonlyAtom<string>;
	readonly port?: MaybeReadonlyAtom<string>;
	readonly protocol?: MaybeReadonlyAtom<string>;
	readonly search?: MaybeReadonlyAtom<string>;
	readonly username?: MaybeReadonlyAtom<string>;
	readonly alt?: MaybeReadonlyAtom<string>;
	readonly noHref?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLAudioElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLAudioElement;
	readonly children?: JsxChildren;
	readonly autoplay?: MaybeReadonlyAtom<boolean>;
	readonly controls?: MaybeReadonlyAtom<boolean>;
	readonly crossOrigin?: MaybeReadonlyAtom<string | null>;
	readonly currentTime?: MaybeReadonlyAtom<number>;
	readonly defaultMuted?: MaybeReadonlyAtom<boolean>;
	readonly defaultPlaybackRate?: MaybeReadonlyAtom<number>;
	readonly disableRemotePlayback?: MaybeReadonlyAtom<boolean>;
	readonly loop?: MaybeReadonlyAtom<boolean>;
	readonly muted?: MaybeReadonlyAtom<boolean>;
	readonly playbackRate?: MaybeReadonlyAtom<number>;
	readonly preload?: MaybeReadonlyAtom<"" | "none" | "metadata" | "auto">;
	readonly preservesPitch?: MaybeReadonlyAtom<boolean>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly srcObject?: MaybeReadonlyAtom<MediaProvider | null>;
	readonly volume?: MaybeReadonlyAtom<number>;
}

export interface HTMLBaseElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLBaseElement;
	readonly children?: never;
	readonly target?: MaybeReadonlyAtom<string>;
	readonly href?: MaybeReadonlyAtom<string>;
}

export interface HTMLElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLElement;
	readonly children?: JsxChildren;
}

export interface HTMLQuoteElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLQuoteElement;
	readonly children?: JsxChildren;
	readonly cite?: MaybeReadonlyAtom<string>;
}

export interface HTMLBRElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLBRElement;
	readonly children?: never;
	readonly clear?: MaybeReadonlyAtom<string>;
}

export interface HTMLButtonElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLButtonElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<"submit" | "reset" | "button">;
	readonly command?: MaybeReadonlyAtom<string>;
	readonly commandForElement?: MaybeReadonlyAtom<Element | null>;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
	readonly formAction?: MaybeReadonlyAtom<string>;
	readonly formEnctype?: MaybeReadonlyAtom<string>;
	readonly formMethod?: MaybeReadonlyAtom<string>;
	readonly formNoValidate?: MaybeReadonlyAtom<boolean>;
	readonly formTarget?: MaybeReadonlyAtom<string>;
	readonly value?: MaybeReadonlyAtom<string>;
	readonly popoverTargetAction?: MaybeReadonlyAtom<string>;
	readonly popoverTargetElement?: MaybeReadonlyAtom<Element | null>;
}

export interface HTMLCanvasElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLCanvasElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeReadonlyAtom<number>;
	readonly width?: MaybeReadonlyAtom<number>;
}

export interface HTMLTableCaptionElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableCaptionElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
}

export interface HTMLTableColElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableColElement;
	readonly children?: never;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly ch?: MaybeReadonlyAtom<string>;
	readonly chOff?: MaybeReadonlyAtom<string>;
	readonly span?: MaybeReadonlyAtom<number>;
	readonly vAlign?: MaybeReadonlyAtom<string>;
}

export interface HTMLDataElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDataElement;
	readonly children?: JsxChildren;
	readonly value?: MaybeReadonlyAtom<string>;
}

export interface HTMLDataListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDataListElement;
	readonly children?: JsxChildren;
}

export interface HTMLModElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLModElement;
	readonly children?: JsxChildren;
	readonly cite?: MaybeReadonlyAtom<string>;
	readonly dateTime?: MaybeReadonlyAtom<string>;
}

export interface HTMLDetailsElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDetailsElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly open?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLDialogElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDialogElement;
	readonly children?: JsxChildren;
	readonly open?: MaybeReadonlyAtom<boolean>;
	readonly closedBy?: MaybeReadonlyAtom<string>;
	readonly returnValue?: MaybeReadonlyAtom<string>;
}

export interface HTMLDivElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDivElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
}

export interface HTMLDListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLDListElement;
	readonly children?: JsxChildren;
	readonly compact?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLEmbedElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLEmbedElement;
	readonly children?: never;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
}

export interface HTMLFieldSetElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLFieldSetElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLFormElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLFormElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly rel?: MaybeReadonlyAtom<string>;
	readonly relList?: MaybeReadonlyAtom<string>;
	readonly target?: MaybeReadonlyAtom<string>;
	readonly acceptCharset?: MaybeReadonlyAtom<string>;
	readonly action?: MaybeReadonlyAtom<string>;
	readonly autocomplete?: MaybeReadonlyAtom<AutoFillBase>;
	readonly encoding?: MaybeReadonlyAtom<string>;
	readonly enctype?: MaybeReadonlyAtom<string>;
	readonly method?: MaybeReadonlyAtom<string>;
	readonly noValidate?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLHeadingElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLHeadingElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
}

export interface HTMLHRElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLHRElement;
	readonly children?: never;
	readonly color?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly noShade?: MaybeReadonlyAtom<boolean>;
	readonly size?: MaybeReadonlyAtom<string>;
}

export interface HTMLIFrameElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLIFrameElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly referrerPolicy?: MaybeReadonlyAtom<ReferrerPolicy>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly allow?: MaybeReadonlyAtom<string>;
	readonly allowFullscreen?: MaybeReadonlyAtom<boolean>;
	readonly frameBorder?: MaybeReadonlyAtom<string>;
	readonly loading?: MaybeReadonlyAtom<"eager" | "lazy">;
	readonly longDesc?: MaybeReadonlyAtom<string>;
	readonly marginHeight?: MaybeReadonlyAtom<string>;
	readonly marginWidth?: MaybeReadonlyAtom<string>;
	readonly sandbox?: MaybeReadonlyAtom<DOMTokenList>;
	readonly scrolling?: MaybeReadonlyAtom<string>;
	readonly srcdoc?: MaybeReadonlyAtom<string>;
}

export interface HTMLImageElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLImageElement;
	readonly children?: never;
	readonly border?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<number>;
	readonly width?: MaybeReadonlyAtom<number>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly referrerPolicy?: MaybeReadonlyAtom<string>;
	readonly alt?: MaybeReadonlyAtom<string>;
	readonly crossOrigin?: MaybeReadonlyAtom<string | null>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly loading?: MaybeReadonlyAtom<"eager" | "lazy">;
	readonly longDesc?: MaybeReadonlyAtom<string>;
	readonly decoding?: MaybeReadonlyAtom<"auto" | "async" | "sync">;
	readonly fetchPriority?: MaybeReadonlyAtom<"auto" | "high" | "low">;
	readonly hspace?: MaybeReadonlyAtom<number>;
	readonly isMap?: MaybeReadonlyAtom<boolean>;
	readonly lowsrc?: MaybeReadonlyAtom<string>;
	readonly sizes?: MaybeReadonlyAtom<string>;
	readonly srcset?: MaybeReadonlyAtom<string>;
	readonly useMap?: MaybeReadonlyAtom<string>;
	readonly vspace?: MaybeReadonlyAtom<number>;
}

export interface HTMLInputElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLInputElement;
	readonly children?: never;
	readonly height?: MaybeReadonlyAtom<number>;
	readonly width?: MaybeReadonlyAtom<number>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly alt?: MaybeReadonlyAtom<string>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
	readonly formAction?: MaybeReadonlyAtom<string>;
	readonly formEnctype?: MaybeReadonlyAtom<string>;
	readonly formMethod?: MaybeReadonlyAtom<string>;
	readonly formNoValidate?: MaybeReadonlyAtom<boolean>;
	readonly formTarget?: MaybeReadonlyAtom<string>;
	readonly value?: MaybeReadonlyAtom<string>;
	readonly popoverTargetAction?: MaybeReadonlyAtom<string>;
	readonly popoverTargetElement?: MaybeReadonlyAtom<Element | null>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly autocomplete?: MaybeReadonlyAtom<AutoFill>;
	readonly size?: MaybeReadonlyAtom<number>;
	readonly useMap?: MaybeReadonlyAtom<string>;
	readonly accept?: MaybeReadonlyAtom<string>;
	readonly capture?: MaybeReadonlyAtom<string>;
	readonly checked?: MaybeReadonlyAtom<boolean>;
	readonly defaultChecked?: MaybeReadonlyAtom<boolean>;
	readonly defaultValue?: MaybeReadonlyAtom<string>;
	readonly dirName?: MaybeReadonlyAtom<string>;
	readonly files?: MaybeReadonlyAtom<FileList | null>;
	readonly indeterminate?: MaybeReadonlyAtom<boolean>;
	readonly max?: MaybeReadonlyAtom<string>;
	readonly maxLength?: MaybeReadonlyAtom<number>;
	readonly min?: MaybeReadonlyAtom<string>;
	readonly minLength?: MaybeReadonlyAtom<number>;
	readonly multiple?: MaybeReadonlyAtom<boolean>;
	readonly pattern?: MaybeReadonlyAtom<string>;
	readonly placeholder?: MaybeReadonlyAtom<string>;
	readonly readOnly?: MaybeReadonlyAtom<boolean>;
	readonly required?: MaybeReadonlyAtom<boolean>;
	readonly selectionDirection?: MaybeReadonlyAtom<SelectionDirection | null>;
	readonly selectionEnd?: MaybeReadonlyAtom<number | null>;
	readonly selectionStart?: MaybeReadonlyAtom<number | null>;
	readonly step?: MaybeReadonlyAtom<string>;
	readonly valueAsDate?: MaybeReadonlyAtom<Date | null>;
	readonly valueAsNumber?: MaybeReadonlyAtom<number>;
	readonly webkitdirectory?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLLabelElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLLabelElement;
	readonly children?: JsxChildren;
	readonly for?: MaybeReadonlyAtom<string>;
}

export interface HTMLLegendElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLLegendElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
}

export interface HTMLLIElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLLIElement;
	readonly children?: JsxChildren;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly value?: MaybeReadonlyAtom<number>;
}

export interface HTMLMapElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLMapElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
}

export interface HTMLMenuElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLMenuElement;
	readonly children?: JsxChildren;
	readonly compact?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLMeterElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLMeterElement;
	readonly children?: JsxChildren;
	readonly value?: MaybeReadonlyAtom<number>;
	readonly high?: MaybeReadonlyAtom<number>;
	readonly low?: MaybeReadonlyAtom<number>;
	readonly max?: MaybeReadonlyAtom<number>;
	readonly min?: MaybeReadonlyAtom<number>;
	readonly optimum?: MaybeReadonlyAtom<number>;
}

export interface HTMLObjectElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLObjectElement;
	readonly children?: JsxChildren;
	readonly border?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly hspace?: MaybeReadonlyAtom<number>;
	readonly useMap?: MaybeReadonlyAtom<string>;
	readonly vspace?: MaybeReadonlyAtom<number>;
	readonly archive?: MaybeReadonlyAtom<string>;
	readonly code?: MaybeReadonlyAtom<string>;
	readonly codeBase?: MaybeReadonlyAtom<string>;
	readonly codeType?: MaybeReadonlyAtom<string>;
	readonly data?: MaybeReadonlyAtom<string>;
	readonly declare?: MaybeReadonlyAtom<boolean>;
	readonly standby?: MaybeReadonlyAtom<string>;
}

export interface HTMLOListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOListElement;
	readonly children?: JsxChildren;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly compact?: MaybeReadonlyAtom<boolean>;
	readonly reversed?: MaybeReadonlyAtom<boolean>;
	readonly start?: MaybeReadonlyAtom<number>;
}

export interface HTMLOptGroupElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOptGroupElement;
	readonly children?: JsxChildren;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
	readonly label?: MaybeReadonlyAtom<string>;
}

export interface HTMLOptionElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOptionElement;
	readonly children?: JsxChildren;
	readonly text?: MaybeReadonlyAtom<string>;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
	readonly value?: MaybeReadonlyAtom<string>;
	readonly label?: MaybeReadonlyAtom<string>;
	readonly defaultSelected?: MaybeReadonlyAtom<boolean>;
	readonly selected?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLOutputElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLOutputElement;
	readonly children?: JsxChildren;
	readonly for?: MaybeReadonlyAtom<DOMTokenList>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly value?: MaybeReadonlyAtom<string>;
	readonly defaultValue?: MaybeReadonlyAtom<string>;
}

export interface HTMLParagraphElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLParagraphElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
}

export interface HTMLPictureElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLPictureElement;
	readonly children?: JsxChildren;
}

export interface HTMLPreElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLPreElement;
	readonly children?: JsxChildren;
	readonly width?: MaybeReadonlyAtom<number>;
}

export interface HTMLProgressElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLProgressElement;
	readonly children?: JsxChildren;
	readonly value?: MaybeReadonlyAtom<number>;
	readonly max?: MaybeReadonlyAtom<number>;
}

export interface HTMLSelectElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSelectElement;
	readonly children?: JsxChildren;
	readonly length?: MaybeReadonlyAtom<number>;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
	readonly value?: MaybeReadonlyAtom<string>;
	readonly autocomplete?: MaybeReadonlyAtom<AutoFill>;
	readonly size?: MaybeReadonlyAtom<number>;
	readonly multiple?: MaybeReadonlyAtom<boolean>;
	readonly required?: MaybeReadonlyAtom<boolean>;
	readonly selectedIndex?: MaybeReadonlyAtom<number>;
}

export interface HTMLSlotElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSlotElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
}

export interface HTMLSourceElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSourceElement;
	readonly children?: never;
	readonly height?: MaybeReadonlyAtom<number>;
	readonly width?: MaybeReadonlyAtom<number>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly sizes?: MaybeReadonlyAtom<string>;
	readonly srcset?: MaybeReadonlyAtom<string>;
	readonly media?: MaybeReadonlyAtom<string>;
}

export interface HTMLSpanElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLSpanElement;
	readonly children?: JsxChildren;
}

export interface HTMLTableElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableElement;
	readonly children?: JsxChildren;
	readonly border?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly bgColor?: MaybeReadonlyAtom<string>;
	readonly caption?: MaybeReadonlyAtom<HTMLTableCaptionElement | null>;
	readonly cellPadding?: MaybeReadonlyAtom<string>;
	readonly cellSpacing?: MaybeReadonlyAtom<string>;
	readonly frame?: MaybeReadonlyAtom<string>;
	readonly rules?: MaybeReadonlyAtom<string>;
	readonly summary?: MaybeReadonlyAtom<string>;
	readonly tFoot?: MaybeReadonlyAtom<HTMLTableSectionElement | null>;
	readonly tHead?: MaybeReadonlyAtom<HTMLTableSectionElement | null>;
}

export interface HTMLTableSectionElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableSectionElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly ch?: MaybeReadonlyAtom<string>;
	readonly chOff?: MaybeReadonlyAtom<string>;
	readonly vAlign?: MaybeReadonlyAtom<string>;
}

export interface HTMLTableCellElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableCellElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly ch?: MaybeReadonlyAtom<string>;
	readonly chOff?: MaybeReadonlyAtom<string>;
	readonly vAlign?: MaybeReadonlyAtom<string>;
	readonly bgColor?: MaybeReadonlyAtom<string>;
	readonly abbr?: MaybeReadonlyAtom<string>;
	readonly axis?: MaybeReadonlyAtom<string>;
	readonly colSpan?: MaybeReadonlyAtom<number>;
	readonly headers?: MaybeReadonlyAtom<string>;
	readonly noWrap?: MaybeReadonlyAtom<boolean>;
	readonly rowSpan?: MaybeReadonlyAtom<number>;
	readonly scope?: MaybeReadonlyAtom<string>;
}

export interface HTMLTemplateElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTemplateElement;
	readonly children?: JsxChildren;
	readonly shadowRootClonable?: MaybeReadonlyAtom<boolean>;
	readonly shadowRootCustomElementRegistry?: MaybeReadonlyAtom<string>;
	readonly shadowRootDelegatesFocus?: MaybeReadonlyAtom<boolean>;
	readonly shadowRootMode?: MaybeReadonlyAtom<string>;
	readonly shadowRootSerializable?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLTextAreaElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTextAreaElement;
	readonly children?: JsxChildren;
	readonly name?: MaybeReadonlyAtom<string>;
	readonly disabled?: MaybeReadonlyAtom<boolean>;
	readonly value?: MaybeReadonlyAtom<string>;
	readonly autocomplete?: MaybeReadonlyAtom<AutoFill>;
	readonly defaultValue?: MaybeReadonlyAtom<string>;
	readonly dirName?: MaybeReadonlyAtom<string>;
	readonly maxLength?: MaybeReadonlyAtom<number>;
	readonly minLength?: MaybeReadonlyAtom<number>;
	readonly placeholder?: MaybeReadonlyAtom<string>;
	readonly readOnly?: MaybeReadonlyAtom<boolean>;
	readonly required?: MaybeReadonlyAtom<boolean>;
	readonly selectionDirection?: MaybeReadonlyAtom<SelectionDirection>;
	readonly selectionEnd?: MaybeReadonlyAtom<number>;
	readonly selectionStart?: MaybeReadonlyAtom<number>;
	readonly rows?: MaybeReadonlyAtom<number>;
	readonly cols?: MaybeReadonlyAtom<number>;
	readonly wrap?: MaybeReadonlyAtom<string>;
}

export interface HTMLTimeElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTimeElement;
	readonly children?: JsxChildren;
	readonly dateTime?: MaybeReadonlyAtom<string>;
}

export interface HTMLTableRowElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTableRowElement;
	readonly children?: JsxChildren;
	readonly align?: MaybeReadonlyAtom<string>;
	readonly ch?: MaybeReadonlyAtom<string>;
	readonly chOff?: MaybeReadonlyAtom<string>;
	readonly vAlign?: MaybeReadonlyAtom<string>;
	readonly bgColor?: MaybeReadonlyAtom<string>;
}

export interface HTMLTrackElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLTrackElement;
	readonly children?: never;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly label?: MaybeReadonlyAtom<string>;
	readonly default?: MaybeReadonlyAtom<boolean>;
	readonly kind?: MaybeReadonlyAtom<string>;
	readonly srclang?: MaybeReadonlyAtom<string>;
}

export interface HTMLUListElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLUListElement;
	readonly children?: JsxChildren;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly compact?: MaybeReadonlyAtom<boolean>;
}

export interface HTMLVideoElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLVideoElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeReadonlyAtom<number>;
	readonly width?: MaybeReadonlyAtom<number>;
	readonly autoplay?: MaybeReadonlyAtom<boolean>;
	readonly controls?: MaybeReadonlyAtom<boolean>;
	readonly crossOrigin?: MaybeReadonlyAtom<string | null>;
	readonly currentTime?: MaybeReadonlyAtom<number>;
	readonly defaultMuted?: MaybeReadonlyAtom<boolean>;
	readonly defaultPlaybackRate?: MaybeReadonlyAtom<number>;
	readonly disableRemotePlayback?: MaybeReadonlyAtom<boolean>;
	readonly loop?: MaybeReadonlyAtom<boolean>;
	readonly muted?: MaybeReadonlyAtom<boolean>;
	readonly playbackRate?: MaybeReadonlyAtom<number>;
	readonly preload?: MaybeReadonlyAtom<"" | "none" | "metadata" | "auto">;
	readonly preservesPitch?: MaybeReadonlyAtom<boolean>;
	readonly src?: MaybeReadonlyAtom<string>;
	readonly srcObject?: MaybeReadonlyAtom<MediaProvider | null>;
	readonly volume?: MaybeReadonlyAtom<number>;
	readonly disablePictureInPicture?: MaybeReadonlyAtom<boolean>;
	readonly playsInline?: MaybeReadonlyAtom<boolean>;
	readonly poster?: MaybeReadonlyAtom<string>;
}

export interface HTMLWbrElementProps extends HTMLGlobalProps {
	readonly [S_NODE_TYPE]?: HTMLElement;
	readonly children?: never;
}

export interface HTMLIntrinsicElements {
	abbr: HTMLElementProps;
	address: HTMLElementProps;
	area: HTMLAreaElementProps;
	article: HTMLElementProps;
	aside: HTMLElementProps;
	audio: HTMLAudioElementProps;
	b: HTMLElementProps;
	base: HTMLBaseElementProps;
	bdi: HTMLElementProps;
	bdo: HTMLElementProps;
	blockquote: HTMLQuoteElementProps;
	// body: HTMLBodyElementProps;
	br: HTMLBRElementProps;
	button: HTMLButtonElementProps;
	canvas: HTMLCanvasElementProps;
	caption: HTMLTableCaptionElementProps;
	cite: HTMLElementProps;
	code: HTMLElementProps;
	col: HTMLTableColElementProps;
	colgroup: HTMLTableColElementProps;
	data: HTMLDataElementProps;
	datalist: HTMLDataListElementProps;
	dd: HTMLElementProps;
	del: HTMLModElementProps;
	details: HTMLDetailsElementProps;
	dfn: HTMLElementProps;
	dialog: HTMLDialogElementProps;
	div: HTMLDivElementProps;
	dl: HTMLDListElementProps;
	dt: HTMLElementProps;
	em: HTMLElementProps;
	embed: HTMLEmbedElementProps;
	fieldset: HTMLFieldSetElementProps;
	figcaption: HTMLElementProps;
	figure: HTMLElementProps;
	footer: HTMLElementProps;
	form: HTMLFormElementProps;
	h1: HTMLHeadingElementProps;
	h2: HTMLHeadingElementProps;
	h3: HTMLHeadingElementProps;
	h4: HTMLHeadingElementProps;
	h5: HTMLHeadingElementProps;
	h6: HTMLHeadingElementProps;
	// head: HTMLHeadElementProps;
	header: HTMLElementProps;
	hgroup: HTMLElementProps;
	hr: HTMLHRElementProps;
	// html: HTMLHtmlElementProps;
	i: HTMLElementProps;
	iframe: HTMLIFrameElementProps;
	img: HTMLImageElementProps;
	input: HTMLInputElementProps;
	ins: HTMLModElementProps;
	kbd: HTMLElementProps;
	label: HTMLLabelElementProps;
	legend: HTMLLegendElementProps;
	li: HTMLLIElementProps;
	// link: HTMLLinkElementProps;
	main: HTMLElementProps;
	map: HTMLMapElementProps;
	mark: HTMLElementProps;
	menu: HTMLMenuElementProps;
	// meta: HTMLMetaElementProps;
	meter: HTMLMeterElementProps;
	nav: HTMLElementProps;
	noscript: HTMLElementProps;
	object: HTMLObjectElementProps;
	ol: HTMLOListElementProps;
	optgroup: HTMLOptGroupElementProps;
	option: HTMLOptionElementProps;
	output: HTMLOutputElementProps;
	p: HTMLParagraphElementProps;
	picture: HTMLPictureElementProps;
	pre: HTMLPreElementProps;
	progress: HTMLProgressElementProps;
	q: HTMLQuoteElementProps;
	rp: HTMLElementProps;
	rt: HTMLElementProps;
	ruby: HTMLElementProps;
	s: HTMLElementProps;
	samp: HTMLElementProps;
	// script: HTMLScriptElementProps;
	search: HTMLElementProps;
	section: HTMLElementProps;
	select: HTMLSelectElementProps;
	slot: HTMLSlotElementProps;
	small: HTMLElementProps;
	source: HTMLSourceElementProps;
	span: HTMLSpanElementProps;
	strong: HTMLElementProps;
	// style: HTMLStyleElementProps;
	sub: HTMLElementProps;
	summary: HTMLElementProps;
	sup: HTMLElementProps;
	table: HTMLTableElementProps;
	tbody: HTMLTableSectionElementProps;
	td: HTMLTableCellElementProps;
	template: HTMLTemplateElementProps;
	textarea: HTMLTextAreaElementProps;
	tfoot: HTMLTableSectionElementProps;
	th: HTMLTableCellElementProps;
	thead: HTMLTableSectionElementProps;
	time: HTMLTimeElementProps;
	// title: HTMLTitleElementProps;
	tr: HTMLTableRowElementProps;
	track: HTMLTrackElementProps;
	u: HTMLElementProps;
	ul: HTMLUListElementProps;
	var: HTMLElementProps;
	video: HTMLVideoElementProps;
	wbr: HTMLWbrElementProps;
}

export interface SVGGlobalProps {
	readonly autofocus?: MaybeReadonlyAtom<boolean>;
	readonly class?: MaybeReadonlyAtom<string>;
	readonly color?: MaybeReadonlyAtom<string>;
	readonly display?: MaybeReadonlyAtom<string>;
	readonly filter?: MaybeReadonlyAtom<string>;
	readonly id?: MaybeReadonlyAtom<string>;
	readonly lang?: MaybeReadonlyAtom<string>;
	readonly style?: MaybeReadonlyAtom<string>;
	readonly tabindex?: MaybeReadonlyAtom<string | number>;
	readonly transform?: MaybeReadonlyAtom<string>;
	readonly "transform-origin"?: MaybeReadonlyAtom<string>;
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

export interface SVGAElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly referrerpolicy?: MaybeReadonlyAtom<ReferrerPolicy>;
	readonly rel?: MaybeReadonlyAtom<string>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly target?: MaybeReadonlyAtom<string>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
}

export interface SVGAnimateElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAnimateElement;
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeReadonlyAtom<SVGAccumulate>;
	readonly additive?: MaybeReadonlyAtom<SVGAdditive>;
	readonly attributeName?: MaybeReadonlyAtom<string>;
	readonly begin?: MaybeReadonlyAtom<string>;
	readonly by?: MaybeReadonlyAtom<string | number>;
	readonly calcMode?: MaybeReadonlyAtom<SVGCalcMode>;
	readonly dur?: MaybeReadonlyAtom<string | number>;
	readonly end?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<SVGFillMode>;
	readonly from?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly keyPoints?: MaybeReadonlyAtom<string>;
	readonly keySplines?: MaybeReadonlyAtom<string>;
	readonly keyTimes?: MaybeReadonlyAtom<string>;
	readonly max?: MaybeReadonlyAtom<string>;
	readonly min?: MaybeReadonlyAtom<string>;
	readonly repeatCount?: MaybeReadonlyAtom<number | "indefinite">;
	readonly repeatDur?: MaybeReadonlyAtom<string | number>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly restart?: MaybeReadonlyAtom<SVGRestart>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly to?: MaybeReadonlyAtom<string | number>;
	readonly values?: MaybeReadonlyAtom<string>;
}

export interface SVGAnimateMotionElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAnimateMotionElement;
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeReadonlyAtom<SVGAccumulate>;
	readonly additive?: MaybeReadonlyAtom<SVGAdditive>;
	readonly begin?: MaybeReadonlyAtom<string>;
	readonly by?: MaybeReadonlyAtom<string | number>;
	readonly calcMode?: MaybeReadonlyAtom<SVGCalcMode>;
	readonly dur?: MaybeReadonlyAtom<string | number>;
	readonly end?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<SVGFillMode>;
	readonly from?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly keyPoints?: MaybeReadonlyAtom<string>;
	readonly keySplines?: MaybeReadonlyAtom<string>;
	readonly keyTimes?: MaybeReadonlyAtom<string>;
	readonly max?: MaybeReadonlyAtom<string>;
	readonly min?: MaybeReadonlyAtom<string>;
	readonly path?: MaybeReadonlyAtom<string>;
	readonly repeatCount?: MaybeReadonlyAtom<number | "indefinite">;
	readonly repeatDur?: MaybeReadonlyAtom<string | number>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly restart?: MaybeReadonlyAtom<SVGRestart>;
	readonly rotate?: MaybeReadonlyAtom<number | "auto" | "auto-reverse">;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly to?: MaybeReadonlyAtom<string | number>;
	readonly values?: MaybeReadonlyAtom<string>;
}

export interface SVGAnimateTransformElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGAnimateTransformElement;
	readonly children?: JsxChildren;
	readonly accumulate?: MaybeReadonlyAtom<SVGAccumulate>;
	readonly additive?: MaybeReadonlyAtom<SVGAdditive>;
	readonly attributeName?: MaybeReadonlyAtom<string>;
	readonly begin?: MaybeReadonlyAtom<string>;
	readonly by?: MaybeReadonlyAtom<string | number>;
	readonly calcMode?: MaybeReadonlyAtom<SVGCalcMode>;
	readonly dur?: MaybeReadonlyAtom<string | number>;
	readonly end?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<SVGFillMode>;
	readonly from?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly keyPoints?: MaybeReadonlyAtom<string>;
	readonly keySplines?: MaybeReadonlyAtom<string>;
	readonly keyTimes?: MaybeReadonlyAtom<string>;
	readonly max?: MaybeReadonlyAtom<string>;
	readonly min?: MaybeReadonlyAtom<string>;
	readonly repeatCount?: MaybeReadonlyAtom<number | "indefinite">;
	readonly repeatDur?: MaybeReadonlyAtom<string | number>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly restart?: MaybeReadonlyAtom<SVGRestart>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly to?: MaybeReadonlyAtom<string | number>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly values?: MaybeReadonlyAtom<string>;
}

export interface SVGCircleElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGCircleElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly cx?: MaybeReadonlyAtom<string | number>;
	readonly cy?: MaybeReadonlyAtom<string | number>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly r?: MaybeReadonlyAtom<string | number>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
}

export interface SVGClipPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGClipPathElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly clipPathUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
}

export interface SVGDefsElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGDefsElement;
	readonly children?: JsxChildren;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
}

export interface SVGDescElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGDescElement;
	readonly children?: JsxChildren;
}

export interface SVGEllipseElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGEllipseElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly cx?: MaybeReadonlyAtom<string | number>;
	readonly cy?: MaybeReadonlyAtom<string | number>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly rx?: MaybeReadonlyAtom<string | number>;
	readonly ry?: MaybeReadonlyAtom<string | number>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
}

export interface SVGFEBlendElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEBlendElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly in2?: MaybeReadonlyAtom<string>;
	readonly mode?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEColorMatrixElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEColorMatrixElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly values?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEComponentTransferElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEComponentTransferElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFECompositeElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFECompositeElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly in2?: MaybeReadonlyAtom<string>;
	readonly k1?: MaybeReadonlyAtom<string | number>;
	readonly k2?: MaybeReadonlyAtom<string | number>;
	readonly k3?: MaybeReadonlyAtom<string | number>;
	readonly k4?: MaybeReadonlyAtom<string | number>;
	readonly operator?: MaybeReadonlyAtom<"in" | "over" | "out" | "atop" | "xor" | "lighter" | "arithmetic">;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEConvolveMatrixElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEConvolveMatrixElement;
	readonly children?: JsxChildren;
	readonly bias?: MaybeReadonlyAtom<string | number>;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly divisor?: MaybeReadonlyAtom<string | number>;
	readonly edgeMode?: MaybeReadonlyAtom<SVGEdgeMode>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly kernelMatrix?: MaybeReadonlyAtom<string>;
	readonly kernelUnitLength?: MaybeReadonlyAtom<string | number>;
	readonly order?: MaybeReadonlyAtom<string | number>;
	readonly preserveAlpha?: MaybeReadonlyAtom<string | boolean>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly targetX?: MaybeReadonlyAtom<string | number>;
	readonly targetY?: MaybeReadonlyAtom<string | number>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEDiffuseLightingElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDiffuseLightingElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly diffuseConstant?: MaybeReadonlyAtom<string | number>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly kernelUnitLength?: MaybeReadonlyAtom<string | number>;
	readonly "lighting-color"?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly surfaceScale?: MaybeReadonlyAtom<string | number>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEDisplacementMapElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDisplacementMapElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly in2?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly scale?: MaybeReadonlyAtom<string | number>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly xChannelSelector?: MaybeReadonlyAtom<SVGColorChannel>;
	readonly y?: MaybeReadonlyAtom<string | number>;
	readonly yChannelSelector?: MaybeReadonlyAtom<SVGColorChannel>;
}

export interface SVGFEDistantLightElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDistantLightElement;
	readonly children?: JsxChildren;
	readonly azimuth?: MaybeReadonlyAtom<string | number>;
	readonly elevation?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEDropShadowElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEDropShadowElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly dx?: MaybeReadonlyAtom<string | number>;
	readonly dy?: MaybeReadonlyAtom<string | number>;
	readonly "flood-color"?: MaybeReadonlyAtom<string>;
	readonly "flood-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly stdDeviation?: MaybeReadonlyAtom<string | number>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEFloodElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFloodElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly "flood-color"?: MaybeReadonlyAtom<string>;
	readonly "flood-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEFuncAElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncAElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeReadonlyAtom<string | number>;
	readonly exponent?: MaybeReadonlyAtom<string | number>;
	readonly intercept?: MaybeReadonlyAtom<string | number>;
	readonly slope?: MaybeReadonlyAtom<string | number>;
	readonly tableValues?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEFuncBElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncBElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeReadonlyAtom<string | number>;
	readonly exponent?: MaybeReadonlyAtom<string | number>;
	readonly intercept?: MaybeReadonlyAtom<string | number>;
	readonly slope?: MaybeReadonlyAtom<string | number>;
	readonly tableValues?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEFuncGElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncGElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeReadonlyAtom<string | number>;
	readonly exponent?: MaybeReadonlyAtom<string | number>;
	readonly intercept?: MaybeReadonlyAtom<string | number>;
	readonly slope?: MaybeReadonlyAtom<string | number>;
	readonly tableValues?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEFuncRElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEFuncRElement;
	readonly children?: JsxChildren;
	readonly amplitude?: MaybeReadonlyAtom<string | number>;
	readonly exponent?: MaybeReadonlyAtom<string | number>;
	readonly intercept?: MaybeReadonlyAtom<string | number>;
	readonly slope?: MaybeReadonlyAtom<string | number>;
	readonly tableValues?: MaybeReadonlyAtom<string>;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEGaussianBlurElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEGaussianBlurElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly edgeMode?: MaybeReadonlyAtom<SVGEdgeMode>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly stdDeviation?: MaybeReadonlyAtom<string | number>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEImageElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEImageElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEMergeElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEMergeNodeElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEMergeNodeElement;
	readonly children?: JsxChildren;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEMorphologyElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEMorphologyElement;
	readonly children?: JsxChildren;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly operator?: MaybeReadonlyAtom<"erode" | "dilate">;
	readonly radius?: MaybeReadonlyAtom<string | number>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEOffsetElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEOffsetElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly dx?: MaybeReadonlyAtom<string | number>;
	readonly dy?: MaybeReadonlyAtom<string | number>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFEPointLightElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFEPointLightElement;
	readonly children?: JsxChildren;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
	readonly z?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFESpecularLightingElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFESpecularLightingElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly kernelUnitLength?: MaybeReadonlyAtom<string | number>;
	readonly "lighting-color"?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly specularConstant?: MaybeReadonlyAtom<string | number>;
	readonly specularExponent?: MaybeReadonlyAtom<string | number>;
	readonly surfaceScale?: MaybeReadonlyAtom<string | number>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFESpotLightElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFESpotLightElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly limitingConeAngle?: MaybeReadonlyAtom<string | number>;
	readonly pointsAtX?: MaybeReadonlyAtom<string | number>;
	readonly pointsAtY?: MaybeReadonlyAtom<string | number>;
	readonly pointsAtZ?: MaybeReadonlyAtom<string | number>;
	readonly specularExponent?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
	readonly z?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFETileElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFETileElement;
	readonly children?: JsxChildren;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly in?: MaybeReadonlyAtom<string>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFETurbulenceElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFETurbulenceElement;
	readonly children?: JsxChildren;
	readonly baseFrequency?: MaybeReadonlyAtom<string | number>;
	readonly "color-interpolation-filters"?: MaybeReadonlyAtom<SVGColorInterpolationFilters>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly numOctaves?: MaybeReadonlyAtom<string | number>;
	readonly result?: MaybeReadonlyAtom<string>;
	readonly seed?: MaybeReadonlyAtom<string | number>;
	readonly stitchTiles?: MaybeReadonlyAtom<"noStitch" | "stitch">;
	readonly type?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGFilterElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGFilterElement;
	readonly children?: JsxChildren;
	readonly filterUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly primitiveUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGForeignObjectElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGForeignObjectElement;
	readonly children?: JsxChildren;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGGElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGGElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
}

export interface SVGImageElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGImageElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly crossorigin?: MaybeReadonlyAtom<SVGCrossOrigin>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly decoding?: MaybeReadonlyAtom<"auto" | "async" | "sync">;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly "image-rendering"?: MaybeReadonlyAtom<"auto" | "optimizeSpeed" | "optimizeQuality">;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGLineElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGLineElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly orient?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linecap"?: MaybeReadonlyAtom<SVGStrokeLineCap>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly x1?: MaybeReadonlyAtom<string | number>;
	readonly x2?: MaybeReadonlyAtom<string | number>;
	readonly y1?: MaybeReadonlyAtom<string | number>;
	readonly y2?: MaybeReadonlyAtom<string | number>;
}

export interface SVGLinearGradientElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGLinearGradientElement;
	readonly children?: JsxChildren;
	readonly gradientTransform?: MaybeReadonlyAtom<string>;
	readonly gradientUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly spreadMethod?: MaybeReadonlyAtom<SVGSpreadMethod>;
	readonly x1?: MaybeReadonlyAtom<string | number>;
	readonly x2?: MaybeReadonlyAtom<string | number>;
	readonly y1?: MaybeReadonlyAtom<string | number>;
	readonly y2?: MaybeReadonlyAtom<string | number>;
}

export interface SVGMarkerElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMarkerElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly markerHeight?: MaybeReadonlyAtom<string | number>;
	readonly markerUnits?: MaybeReadonlyAtom<"strokeWidth" | "userSpaceOnUse">;
	readonly markerWidth?: MaybeReadonlyAtom<string | number>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly refX?: MaybeReadonlyAtom<string | number>;
	readonly refY?: MaybeReadonlyAtom<string | number>;
	readonly viewBox?: MaybeReadonlyAtom<string>;
}

export interface SVGMaskElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMaskElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly "mask-type"?: MaybeReadonlyAtom<"alpha" | "luminance">;
	readonly maskContentUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly maskUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGMetadataElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMetadataElement;
	readonly children?: JsxChildren;
}

export interface SVGMPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGMPathElement;
	readonly children?: JsxChildren;
	readonly href?: MaybeReadonlyAtom<string>;
}

export interface SVGPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPathElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly d?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "fill-rule"?: MaybeReadonlyAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linecap"?: MaybeReadonlyAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
}

export interface SVGPatternElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPatternElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly patternContentUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly patternTransform?: MaybeReadonlyAtom<string>;
	readonly patternUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly viewBox?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGPolygonElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPolygonElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "fill-rule"?: MaybeReadonlyAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly points?: MaybeReadonlyAtom<string>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
}

export interface SVGPolylineElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGPolylineElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "fill-rule"?: MaybeReadonlyAtom<SVGFillRule>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly points?: MaybeReadonlyAtom<string>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linecap"?: MaybeReadonlyAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
}

export interface SVGRadialGradientElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGRadialGradientElement;
	readonly children?: JsxChildren;
	readonly cx?: MaybeReadonlyAtom<string | number>;
	readonly cy?: MaybeReadonlyAtom<string | number>;
	readonly fr?: MaybeReadonlyAtom<string | number>;
	readonly fx?: MaybeReadonlyAtom<string | number>;
	readonly fy?: MaybeReadonlyAtom<string | number>;
	readonly gradientTransform?: MaybeReadonlyAtom<string>;
	readonly gradientUnits?: MaybeReadonlyAtom<SVGUnits>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly r?: MaybeReadonlyAtom<string | number>;
	readonly spreadMethod?: MaybeReadonlyAtom<SVGSpreadMethod>;
}

export interface SVGRectElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGRectElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly "marker-end"?: MaybeReadonlyAtom<string>;
	readonly "marker-mid"?: MaybeReadonlyAtom<string>;
	readonly "marker-start"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly pathLength?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly rx?: MaybeReadonlyAtom<string | number>;
	readonly ry?: MaybeReadonlyAtom<string | number>;
	readonly "shape-rendering"?: MaybeReadonlyAtom<SVGShapeRendering>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGSetElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSetElement;
	readonly children?: JsxChildren;
	readonly attributeName?: MaybeReadonlyAtom<string>;
	readonly begin?: MaybeReadonlyAtom<string>;
	readonly dur?: MaybeReadonlyAtom<string | number>;
	readonly end?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<SVGFillMode>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly keyPoints?: MaybeReadonlyAtom<string>;
	readonly max?: MaybeReadonlyAtom<string>;
	readonly min?: MaybeReadonlyAtom<string>;
	readonly repeatCount?: MaybeReadonlyAtom<number | "indefinite">;
	readonly repeatDur?: MaybeReadonlyAtom<string | number>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly restart?: MaybeReadonlyAtom<SVGRestart>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly to?: MaybeReadonlyAtom<string | number>;
}

export interface SVGStopElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGStopElement;
	readonly children?: never;
	readonly "stop-color"?: MaybeReadonlyAtom<string>;
	readonly "stop-opacity"?: MaybeReadonlyAtom<string | number>;
}

export interface SVGSVGElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSVGElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly viewBox?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGSwitchElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSwitchElement;
	readonly children?: JsxChildren;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
}

export interface SVGSymbolElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGSymbolElement;
	readonly children?: JsxChildren;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly viewBox?: MaybeReadonlyAtom<string>;
}

export interface SVGTextElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTextElement;
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeReadonlyAtom<SVGAlignmentBaseline>;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly direction?: MaybeReadonlyAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeReadonlyAtom<SVGDominantBaseline>;
	readonly dx?: MaybeReadonlyAtom<string | number>;
	readonly dy?: MaybeReadonlyAtom<string | number>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "fill-rule"?: MaybeReadonlyAtom<SVGFillRule>;
	readonly "font-family"?: MaybeReadonlyAtom<string>;
	readonly "font-size"?: MaybeReadonlyAtom<string | number>;
	readonly "font-size-adjust"?: MaybeReadonlyAtom<string>;
	readonly "font-style"?: MaybeReadonlyAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeReadonlyAtom<string>;
	readonly "font-weight"?: MaybeReadonlyAtom<string | number>;
	readonly lengthAdjust?: MaybeReadonlyAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly overflow?: MaybeReadonlyAtom<SVGOverflow>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linecap"?: MaybeReadonlyAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "text-anchor"?: MaybeReadonlyAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeReadonlyAtom<string>;
	readonly "text-overflow"?: MaybeReadonlyAtom<"clip" | "ellipses">;
	readonly "text-rendering"?: MaybeReadonlyAtom<"auto" | "optimizeSpeed" | "geometricPrecision" | "optimizeLegibility">;
	readonly textLength?: MaybeReadonlyAtom<string | number>;
	readonly "unicode-bidi"?: MaybeReadonlyAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly "white-space"?: MaybeReadonlyAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeReadonlyAtom<string | number>;
	readonly "writing-mode"?: MaybeReadonlyAtom<SVGWritingMode>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGTextPathElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTextPathElement;
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeReadonlyAtom<SVGAlignmentBaseline>;
	readonly "baseline-shift"?: MaybeReadonlyAtom<string>;
	readonly direction?: MaybeReadonlyAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeReadonlyAtom<SVGDominantBaseline>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "fill-rule"?: MaybeReadonlyAtom<SVGFillRule>;
	readonly "font-family"?: MaybeReadonlyAtom<string>;
	readonly "font-size"?: MaybeReadonlyAtom<string | number>;
	readonly "font-size-adjust"?: MaybeReadonlyAtom<string>;
	readonly "font-style"?: MaybeReadonlyAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeReadonlyAtom<string>;
	readonly "font-weight"?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly lengthAdjust?: MaybeReadonlyAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeReadonlyAtom<string>;
	readonly method?: MaybeReadonlyAtom<"align" | "stretch">;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly path?: MaybeReadonlyAtom<string>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly spacing?: MaybeReadonlyAtom<"auto" | "exact">;
	readonly startOffset?: MaybeReadonlyAtom<string | number>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linecap"?: MaybeReadonlyAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "text-anchor"?: MaybeReadonlyAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeReadonlyAtom<string>;
	readonly "text-overflow"?: MaybeReadonlyAtom<"clip" | "ellipses">;
	readonly textLength?: MaybeReadonlyAtom<string | number>;
	readonly "unicode-bidi"?: MaybeReadonlyAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly "white-space"?: MaybeReadonlyAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeReadonlyAtom<string | number>;
	readonly "writing-mode"?: MaybeReadonlyAtom<SVGWritingMode>;
}

export interface SVGTitleElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTitleElement;
	readonly children?: JsxChildren;
}

export interface SVGTSpanElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGTSpanElement;
	readonly children?: JsxChildren;
	readonly "alignment-baseline"?: MaybeReadonlyAtom<SVGAlignmentBaseline>;
	readonly "baseline-shift"?: MaybeReadonlyAtom<string>;
	readonly direction?: MaybeReadonlyAtom<SVGTextDirection>;
	readonly "dominant-baseline"?: MaybeReadonlyAtom<SVGDominantBaseline>;
	readonly dx?: MaybeReadonlyAtom<string | number>;
	readonly dy?: MaybeReadonlyAtom<string | number>;
	readonly fill?: MaybeReadonlyAtom<string>;
	readonly "fill-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "fill-rule"?: MaybeReadonlyAtom<SVGFillRule>;
	readonly "font-family"?: MaybeReadonlyAtom<string>;
	readonly "font-size"?: MaybeReadonlyAtom<string | number>;
	readonly "font-size-adjust"?: MaybeReadonlyAtom<string>;
	readonly "font-style"?: MaybeReadonlyAtom<SVGFontStyle>;
	readonly "font-variant"?: MaybeReadonlyAtom<string>;
	readonly "font-weight"?: MaybeReadonlyAtom<string | number>;
	readonly lengthAdjust?: MaybeReadonlyAtom<SVGLengthAdjust>;
	readonly "letter-spacing"?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "paint-order"?: MaybeReadonlyAtom<string>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly stroke?: MaybeReadonlyAtom<string>;
	readonly "stroke-dasharray"?: MaybeReadonlyAtom<string>;
	readonly "stroke-dashoffset"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-linecap"?: MaybeReadonlyAtom<SVGStrokeLineCap>;
	readonly "stroke-linejoin"?: MaybeReadonlyAtom<SVGStrokeLineJoin>;
	readonly "stroke-miterlimit"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-opacity"?: MaybeReadonlyAtom<string | number>;
	readonly "stroke-width"?: MaybeReadonlyAtom<string | number>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "text-anchor"?: MaybeReadonlyAtom<SVGTextAnchor>;
	readonly "text-decoration"?: MaybeReadonlyAtom<string>;
	readonly "text-overflow"?: MaybeReadonlyAtom<"clip" | "ellipses">;
	readonly textLength?: MaybeReadonlyAtom<string | number>;
	readonly "unicode-bidi"?: MaybeReadonlyAtom<SVGUnicodeBidi>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly visibility?: MaybeReadonlyAtom<SVGVisibility>;
	readonly "white-space"?: MaybeReadonlyAtom<SVGWhiteSpace>;
	readonly "word-spacing"?: MaybeReadonlyAtom<string | number>;
	readonly "writing-mode"?: MaybeReadonlyAtom<SVGWritingMode>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGUseElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGUseElement;
	readonly children?: never;
	readonly "clip-path"?: MaybeReadonlyAtom<string>;
	readonly "clip-rule"?: MaybeReadonlyAtom<SVGClipRule>;
	readonly cursor?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string | number>;
	readonly href?: MaybeReadonlyAtom<string>;
	readonly mask?: MaybeReadonlyAtom<string>;
	readonly opacity?: MaybeReadonlyAtom<string | number>;
	readonly "pointer-events"?: MaybeReadonlyAtom<SVGPointerEvents>;
	readonly requiredExtensions?: MaybeReadonlyAtom<string>;
	readonly systemLanguage?: MaybeReadonlyAtom<string>;
	readonly "vector-effect"?: MaybeReadonlyAtom<SVGVectorEffect>;
	readonly width?: MaybeReadonlyAtom<string | number>;
	readonly x?: MaybeReadonlyAtom<string | number>;
	readonly y?: MaybeReadonlyAtom<string | number>;
}

export interface SVGViewElementProps extends SVGGlobalProps {
	readonly [S_NODE_TYPE]?: SVGViewElement;
	readonly children?: JsxChildren;
	readonly preserveAspectRatio?: MaybeReadonlyAtom<string>;
	readonly viewBox?: MaybeReadonlyAtom<string>;
}

export interface SVGIntrinsicElements {
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

export interface MathMLGlobalProps {
	readonly dir?: MaybeReadonlyAtom<"rtl" | "ltr">;
	readonly displaystyle?: MaybeReadonlyAtom<boolean>;
	readonly mathbackground?: MaybeReadonlyAtom<string>;
	readonly mathcolor?: MaybeReadonlyAtom<string>;
	readonly mathsize?: MaybeReadonlyAtom<string>;
	readonly scriptlevel?: MaybeReadonlyAtom<string>;
}

export interface MathMLElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
}

export interface MathMLMathElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly display?: MaybeReadonlyAtom<"block" | "inline">;
}

export interface MatMLFracElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: never;
	readonly linethickness?: MaybeReadonlyAtom<string>;
}

export interface MatMLIElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly mathvariant?: MaybeReadonlyAtom<"normal">;
}

export interface MatMLOElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly fence?: MaybeReadonlyAtom<boolean>;
	readonly form?: MaybeReadonlyAtom<"prefix" | "infix" | "postfix">;
	readonly largeop?: MaybeReadonlyAtom<boolean>;
	readonly lspace?: MaybeReadonlyAtom<string>;
	readonly maxsize?: MaybeReadonlyAtom<string>;
	readonly minsize?: MaybeReadonlyAtom<string>;
	readonly movablelimits?: MaybeReadonlyAtom<boolean>;
	readonly rspace?: MaybeReadonlyAtom<string>;
	readonly separator?: MaybeReadonlyAtom<boolean>;
	readonly stretchy?: MaybeReadonlyAtom<boolean>;
	readonly symmetric?: MaybeReadonlyAtom<boolean>;
}

export interface MatMLOverElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly accent?: MaybeReadonlyAtom<boolean>;
}

export interface MatMLPaddedElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly depth?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly lspace?: MaybeReadonlyAtom<string>;
	readonly voffset?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
}

export interface MatMLRowElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: never;
}

export interface MatMLSpaceElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly depth?: MaybeReadonlyAtom<string>;
	readonly height?: MaybeReadonlyAtom<string>;
	readonly width?: MaybeReadonlyAtom<string>;
}

export interface MatMLTDElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly columnspan?: MaybeReadonlyAtom<string | number>;
	readonly rowspan?: MaybeReadonlyAtom<string | number>;
}

export interface MatMLTextElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: never;
}

export interface MatMLUnderElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly accentunder?: MaybeReadonlyAtom<boolean>;
}

export interface MatMLUnderOverElementProps extends MathMLGlobalProps {
	readonly [S_NODE_TYPE]?: MathMLElement;
	readonly children?: JsxChildren;
	readonly accent?: MaybeReadonlyAtom<boolean>;
	readonly accentunder?: MaybeReadonlyAtom<boolean>;
}

export interface MathMLIntrinsicElements {
	merror: MathMLElementProps;
	mfrac: MatMLFracElementProps;
	mi: MatMLIElementProps;
	mmultiscripts: MathMLElementProps;
	mn: MathMLElementProps;
	mo: MatMLOElementProps;
	mover: MatMLOverElementProps;
	mpadded: MatMLPaddedElementProps;
	mphantom: MathMLElementProps;
	mprescripts: MathMLElementProps;
	mroot: MathMLElementProps;
	mrow: MatMLRowElementProps;
	ms: MathMLElementProps;
	mspace: MatMLSpaceElementProps;
	msqrt: MathMLElementProps;
	mstyle: MathMLElementProps;
	msub: MathMLElementProps;
	msup: MathMLElementProps;
	msubsup: MathMLElementProps;
	mtable: MathMLElementProps;
	mtd: MatMLTDElementProps;
	mtext: MatMLTextElementProps;
	mtr: MathMLElementProps;
	munder: MatMLUnderElementProps;
	munderover: MatMLUnderOverElementProps;

	// intentionally uppercase, handled by the MathML component
	MathML: MathMLMathElementProps;

	// difficult to support due to the inclusion of extra XML namespaces:
	// - semantics
	// - annotation
	// - annotation-xml
}

export interface IntrinsicElements extends HTMLIntrinsicElements, SVGIntrinsicElements, MathMLIntrinsicElements {
	a: HTMLAnchorElementProps | SVGAElementProps;
}

