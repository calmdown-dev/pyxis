import { component } from "@calmdown/pyxis";
import { Button as DomButton, type ButtonProps as DomButtonProps } from "@calmdown/pyxis-dom";

import "./Button.module.css";

export type ButtonProps = DomButtonProps;

export const Button = component((props: ButtonProps) => (
	<DomButton
		{...props}
		cl:button
		type={props.type ?? "button"}
	/>
));
