import { component, write } from "@calmdown/pyxis";

import type { ExtendedProps } from "~/types";

export type TextInputProps = ExtendedProps<"input", {
	type?: never;
	masked?: boolean;
}>;

export const TextInput = component((props: TextInputProps) => (
	<input
		type={props.masked ? "password" : "text"}
		name={props.name ?? ""}
		value={props.value}
		on:input={e => write(props.value, e.currentTarget.value)}
	/>
));
