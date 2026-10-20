import type { MaybeAtom, Nil } from "@calmdown/pyxis/core";

import { control } from "./common";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
	readonly commandFor?: MaybeAtom<Nil<string>>;
	readonly popoverTarget?: MaybeAtom<Nil<string>>;
};

export const Button = /*@__PURE__*/ control<ButtonProps>(
	/* tagName = */ "button",
	/* deferredPropNames = */ [],
	/* attributeMapping = */ {
		commandFor: "commandfor",
		popoverTarget: "popovertarget",
	},
);
