import { effect, read, type MaybeAtom, type Nil } from "@calmdown/pyxis/core";

import { control, setControlProps } from "./common";

export type InputProps = JSX.IntrinsicElements["input"] & {
	readonly popoverTarget?: MaybeAtom<Nil<string>>;
};

const CONTROL_PROPS = [
	"type",
	"defaultValue",
	"value",
	"valueAsNumber",
	"valueAsDate",
	"defaultChecked",
	"checked",
];

export const Input = /*@__PURE__*/ control<InputProps>(
	/* tagName = */ "input",
	/* deferredPropNames = */ [ ...CONTROL_PROPS, "name" ],
	/* attributeMapping = */ {
		popoverTarget: "popovertarget",
	},
	/* initialize = */ (elem, props, lifecycle) => {
		effect(() => {
			// avoid affecting a named radio group halfway through updating its type or checked state
			const name = read(props.name) as string | undefined;
			const previousName = elem.name;
			elem.name = "";

			try {
				setControlProps(elem, props, CONTROL_PROPS);
			}
			finally {
				elem.name = name === undefined ? previousName : name;
			}
		}, lifecycle);
	},
);
