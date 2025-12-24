export interface JsxFactory {
	/**
	 * Creates a Template for a native component.
	 */
	(
		tagName: string,
		props: any,
		key?: string
	): any;

	/**
	 * Creates a Template for a custom component.
	 */
	(
		component: () => any,
		props: any,
		key?: string
	): any;
}



export const jsx = noop as JsxFactory;
export const jsxs = noop as JsxFactory;
export const Fragment = noop as () => any;
