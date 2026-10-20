export type ExtendedProps<TSource, TProps> =
	& Omit<TSource extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[TSource] : TSource, keyof TProps>
	& TProps;
