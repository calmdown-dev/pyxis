import { component, write, type MaybeWriteAtom } from "@calmdown/pyxis";
import { Input, type InputProps } from "@calmdown/pyxis-dom";

import type { ExtendedProps } from "~/types";

export type TextInputProps = ExtendedProps<InputProps, {
	value?: MaybeWriteAtom<string>;
	type?: never;
	masked?: boolean;
}>;

export const TextInput = component((props: TextInputProps) => (
	<Input
		type={props.masked ? "password" : "text"}
		name={props.name ?? ""}
		value={props.value}
		on:input={e => write(props.value, e.currentTarget.value)}
	/>
));
