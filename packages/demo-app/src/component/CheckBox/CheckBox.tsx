import { component, write, type WithChildren } from "@calmdown/pyxis";

import type { ExtendedProps } from "~/types";

export type CheckBoxProps = ExtendedProps<"input", WithChildren<{
	"on:input"?: never;
	type?: never;
	value?: never;
}>>;

export const CheckBox = component((props: CheckBoxProps) => (
	<label>
		<input
			type="checkbox"
			name={props.name ?? ""}
			checked={props.checked}
			on:input={(e) => {
				write(props.checked, e.currentTarget.checked === true);
			}}
		/>
		{props.children}
	</label>
));
