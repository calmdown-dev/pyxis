import { effect } from "@calmdown/pyxis/core";

import { control, setControlProps } from "./common";

export type TextareaProps = JSX.IntrinsicElements["textarea"];

const DEFERRED_PROPS = [
	"defaultValue",
	"value",
];

export const Textarea = /*@__PURE__*/ control<TextareaProps>(
	/* tagName = */ "textarea",
	/* deferredPropNames = */ DEFERRED_PROPS,
	/* attributeMapping = */ {},
	/* initialize = */ (elem, props, lifecycle) => {
		effect(() => {
			setControlProps(elem, props, DEFERRED_PROPS);
		}, lifecycle);
	},
);
