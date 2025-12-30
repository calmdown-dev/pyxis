import { isAtom, reaction, read, type MaybeAtom } from "@calmdown/pyxis";

export interface ClassListExtensionType {
	set(
		node: HTMLElement,
		className: string,
		toggle: MaybeAtom<boolean>,
	): void;
}

export const ClassListExtension: ClassListExtensionType = {
	set: (node, className, toggle) => {
		if (isAtom(toggle)) {
			reaction(() => {
				node.classList.toggle(className, read(toggle));
			});
		}
		else if (toggle) {
			node.classList.add(className);
		}
	},
};
