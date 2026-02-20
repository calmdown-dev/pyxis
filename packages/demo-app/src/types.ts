export type ExtendedProps<TTagName extends keyof JSX.IntrinsicElements, TProps> =
	& Omit<JSX.IntrinsicElements[TTagName], keyof TProps>
	& TProps;
