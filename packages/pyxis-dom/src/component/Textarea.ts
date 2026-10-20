import { effect, type Component } from "@calmdown/pyxis/core";

import { control, setControlProps } from "./common";

export type TextAreaProps = JSX.IntrinsicElements["textarea"];

const DEFERRED_PROPS = [
	"defaultValue",
	"value",
];

export const TextArea: Component<TextAreaProps> = /*@__PURE__*/ control(
	/* tagName = */ "textarea",
	/* deferredPropNames = */ DEFERRED_PROPS,
	/* attributeMapping = */ {},
	/* initialize = */ (elem, props, lifecycle) => {
		effect(() => {
			setControlProps(elem, props, DEFERRED_PROPS);
		}, lifecycle);
	},
);
