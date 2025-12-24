export interface Component<TProps extends {} = {}> {
	(props: TProps): any;
}
