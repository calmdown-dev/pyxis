import { effect, unmounted } from "@calmdown/pyxis/core";

import { control, setControlProps } from "./common";

export type SelectProps = JSX.IntrinsicElements["select"];

const DEFERRED_PROPS = [
	"multiple",
	"value",
	"selectedIndex",
];

export const Select = /*@__PURE__*/ control<SelectProps>(
	/* tagName = */ "select",
	/* deferredPropNames = */ DEFERRED_PROPS,
	/* attributeMapping = */ {},
	/* initialize = */ (elem, props, lifecycle) => {
		const applyProps = () => {
			setControlProps(elem, props, DEFERRED_PROPS);
		};

		effect(applyProps, lifecycle);

		if (props.value !== undefined || props.selectedIndex !== undefined) {
			const observer = new MutationObserver(applyProps);
			unmounted(() => observer.disconnect(), lifecycle);

			observer.observe(elem, {
				childList: true,
				subtree: true,
				characterData: true,
				attributes: true,
				attributeFilter: [ "value", "selected", "disabled" ],
			});
		}
	},
);
