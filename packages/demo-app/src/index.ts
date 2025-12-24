import { ButtonTemplate } from "./Template";

console.log(ButtonTemplate);

type AnyExtensionProps = { [K in `${string}:${string}`]?: any };

declare global {
	namespace JSX {
		export type Element = any;
		export type IntrinsicElements = { [K in string]: any } & AnyExtensionProps;
		export interface ElementChildrenAttribute {
			children: any;
		}
	}
}
