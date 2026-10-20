import type { Component, MaybeAtom, Nil } from "@calmdown/pyxis";

import { control } from "./common";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
	readonly commandFor?: MaybeAtom<Nil<string>>;
	readonly popoverTarget?: MaybeAtom<Nil<string>>;
};

export const Button: Component<ButtonProps> = /*@__PURE__*/ control(
	/* tagName = */ "button",
	/* deferredPropNames = */ [],
	/* attributeMapping = */ {
		commandFor: "commandfor",
		popoverTarget: "popovertarget",
	},
);
