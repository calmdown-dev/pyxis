import { template } from "@calmdown/pyxis";

export interface ButtonModel {
	type: string;
	onClick: () => void;
	children: any;
}

export const ButtonTemplate = template((model: ButtonModel) => (
	<button type={model.type} on:click={model.onClick}>
		{model.children}
	</button>
));
