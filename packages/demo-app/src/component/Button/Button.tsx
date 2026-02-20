import { component } from "@calmdown/pyxis";

import type { ExtendedProps } from "~/types";

export type ButtonProps = ExtendedProps<"button", {}>;

export const Button = component((props: ButtonProps) => (
	<button
		{...props}
		type={props.type ?? "button"}
	/>
));
