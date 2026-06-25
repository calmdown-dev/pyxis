import { component } from "@calmdown/pyxis";

import type { ExtendedProps } from "~/types";

import "./Button.module.css";

export type ButtonProps = ExtendedProps<"button", {}>;

export const Button = component((props: ButtonProps) => (
	<button
		{...props}
		cl:button
		type={props.type ?? "button"}
	/>
));
