import { write, type Atom } from "~/data/Atom";

export interface RefExtensionType {
	set(
		node: JSX.Node,
		kind: "atom",
		atom: Atom<JSX.Node>,
	): void;

	set(
		node: JSX.Node,
		kind: "fn",
		call: (node: JSX.Node) => void,
	): void;
}

export const RefExtension: RefExtensionType = {
	set: (node, kind, value) => {
		switch (kind) {
			case "atom":
				write(value, node);
				break;

			case "fn":
				(value as (node: JSX.Node) => void)(node);
				break;
		}
	},
};
