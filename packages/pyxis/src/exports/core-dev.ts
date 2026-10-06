import { ComponentRegistry } from "~/dev/ComponentRegistry";
import { StateRegistry } from "~/dev/StateRegistry";
import { runtime } from "~/Runtime";

runtime.hmr ??= {
	component: new ComponentRegistry(),
	state: new StateRegistry(),
};

export { S_DEV_INFO } from "~/symbols";
export * from "./core";
