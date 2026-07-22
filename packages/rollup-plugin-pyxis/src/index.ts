import type { Plugin as RolldownPlugin } from "rolldown";
import type { Plugin as VitePlugin } from "vite";

import { resolveOptions, type PyxisPluginOptions } from "./options";
import { PyxisLoader } from "./PyxisLoader";
import { pyxisTranspileTsx } from "./transpiler";

import { pyxisDev } from "./hmr/pyxisDev";
import { transpileExportedSymbols } from "./hmr/transpileExportedSymbols";
import { transpileFactoryCalls } from "./hmr/transpileFactoryCalls";

import { pyxisTranspileCss } from "./cssModules/pyxisTranspileCss";
import { CssExportsRegistry } from "./cssModules/CssExportsRegistry";
import { transpileClassNames } from "./cssModules/transpileClassNames";

export type * from "./options";

export default function pyxis(pluginOptions?: PyxisPluginOptions) {
	const options = resolveOptions(pluginOptions);
	const loader = new PyxisLoader(options);
	const registry = new CssExportsRegistry(loader);
	const plugins: VitePlugin[] = [ loader.plugin ];

	const tsxTag = loader.addFilter({
		include: options.include,
		exclude: options.exclude,
	});


	if (options.hmr) {
		plugins.push(pyxisDev({ loader, options }));
	}

	if (options.cssModules) {
		const cssTag = loader.addFilter({
			include: options.cssModules.include,
			exclude: options.cssModules.exclude,
			virtualExt: ".js",
		});

		plugins.push(pyxisTranspileCss({
			loader,
			registry,
			options,
			tag: cssTag,
		}));
	}

	if (options.hmr || options.cssModules) {
		plugins.push(pyxisTranspileTsx({
			loader,
			tag: tsxTag,
			async transpile(call) {
				if (options.hmr) {
					await transpileExportedSymbols(call);
					await transpileFactoryCalls({ ...call, loader });
				}

				if (options.cssModules) {
					await transpileClassNames({ ...call, loader, registry, options });
				}
			},
		}));
	}

	return plugins as RolldownPlugin[];
}
