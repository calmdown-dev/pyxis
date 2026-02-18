import * as path from "node:path";

import { normalizePath, type Plugin } from "vite";

import type { PyxisHmrPluginOptions } from "~/types";

import { applyTransforms, generateOutro } from "./analysis/codegen";
import { findFactoryCalls } from "./analysis/findFactoryCalls";
import { findExportedSymbols } from "./analysis/findExportedSymbols";
import { generateCodeTransforms } from "./analysis/generateCodeTransforms";

export function pyxisHmrTransformPlugin(pluginOptions: Required<PyxisHmrPluginOptions>): Plugin {
	let root: string;
	return {
		name: `${__THIS_MODULE__}:transform`,
		configResolved(config) {
			root = config.root;
		},
		transform: {
			filter: {
				id: {
					include: /\.m?[jt]sx?$/i,
					exclude: pluginOptions.exclude,
				},
			},
			handler(code, moduleId) {
				if (!(root && moduleId.startsWith(root))) {
					return null;
				}

				const ast = this.parse(code, { astType: "js" });

				const exportedSymbols = findExportedSymbols(ast);
				const factoryCalls = findFactoryCalls(ast, pluginOptions);
				if (exportedSymbols.length === 0 && factoryCalls.length === 0) {
					return null;
				}

				const shortModuleId = normalizePath(path.relative(root, moduleId));
				const transforms = generateCodeTransforms(exportedSymbols, factoryCalls, shortModuleId);
				return (
					"\n" +
					applyTransforms(code, transforms) +
					generateOutro(exportedSymbols)
				);
			},
		},
	};
}
