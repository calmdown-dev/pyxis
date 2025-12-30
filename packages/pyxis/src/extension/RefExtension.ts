import { write, type Atom } from "~/data/Atom";

export interface AtomRefExtensionType {
	set(
		node: JSX.Node,
		kind: "atom",
		atom: Atom<JSX.Node>,
	): void;
}

export interface FnRefExtensionType {
	set(
		node: JSX.Node,
		kind: "fn",
		call: (node: JSX.Node) => void,
	): void;
}

export type RefExtensionType = AtomRefExtensionType | FnRefExtensionType;

export const RefExtension: RefExtensionType = {
	set: (node: JSX.Node, kind: string, value: any) => {
		switch (kind) {
			case "atom":
				write(value, node);
				break;

			case "fn":
				value(node);
				break;
		}
	},
};
