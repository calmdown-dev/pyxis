import { ComponentRegistry } from "~/dev/ComponentRegistry";
import { StateRegistry } from "~/dev/StateRegistry";
import { runtime } from "~/Runtime";

runtime.hmrComponent ??= new ComponentRegistry();
runtime.hmrState ??= new StateRegistry();

export { S_DEV_INFO } from "~/symbols";
export * from "./core";
