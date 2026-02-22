import type { ResolvedPyxisPluginOptions } from "~/options";
import { resolveDevCore } from "~/features/hmr/resolveDevCore";
import { transpile } from "~/transpiler";
import { createModuleChecker } from "~/utils";

import { transpileExportedSymbols } from "./transpileExportedSymbols";
import { transpileFactoryCalls, type TranspileFactoryCallsContext } from "./transpileFactoryCalls";

export function pyxisHMR(options: ResolvedPyxisPluginOptions) {
	if (!options.hmr) {
		return [];
	}

	return [
		resolveDevCore(options),
		transpile({
			include: options.hmr!.include,
			exclude: options.hmr!.exclude,
			order: "pre",
			async init(): Promise<TranspileFactoryCallsContext> {
				return {
					isPyxisModule: await createModuleChecker.call(this, options.pyxisModule, [
						"core",
						"core-dev",
					]),
				};
			},
			async process(call) {
				transpileExportedSymbols(call);
				transpileFactoryCalls(call);
			},
		}),
	];
}
