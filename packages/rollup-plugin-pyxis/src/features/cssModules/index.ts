import type { ResolvedPyxisPluginOptions } from "~/options";
import { transpile } from "~/transpiler";
import { createModuleChecker } from "~/utils";

import { CssExportsRegistry } from "./CssExportsRegistry";
import { transformCssModules } from "./transformCssModules";
import { transpileClassNames, type TranspileClassNamesContext } from "./transpileClassNames";

export function pyxisCssModules(options: ResolvedPyxisPluginOptions) {
	if (!options.cssModules) {
		return [];
	}

	const registry = new CssExportsRegistry();
	return [
		transformCssModules(options, registry),
		transpile({
			include: /\.m?[jt]sx?$/i,
			exclude: [],
			order: "post",
			async init(): Promise<TranspileClassNamesContext> {
				return {
					isPyxisModule: await createModuleChecker(this, [
						options.pyxisModule,
						`${options.pyxisModule}/core`,
						`${options.pyxisModule}/core-dev`,
						`${options.pyxisModule}/jsx-runtime`,
						`${options.pyxisModule}/jsx-dev-runtime`,
					]),
					resolveCssExports: (source, importer) => (
						registry.getExports(this, source, importer)
					),
				};
			},
			process: call => (
				transpileClassNames(options, call)
			),
		})
	];
}
