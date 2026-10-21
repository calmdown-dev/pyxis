import type { ResolvedId } from "rolldown";
import type { Plugin } from "vite";

import type { ResolvedPyxisPluginOptions } from "~/options";
import type { PyxisLoader } from "~/PyxisLoader";

export interface PyxisDevInit {
	loader: PyxisLoader;
	options: ResolvedPyxisPluginOptions;
}

export function pyxisDev({ loader, options }: PyxisDevInit): Plugin {
	const coreProd = options.pyxisModule;
	const coreDev = `${options.pyxisModule}/dev`;

	const coreProdPattern = new RegExp(`^${RegExp.escape(coreProd)}$`);

	let resolvedCoreDev: ResolvedId | null = null;
	let isVite = false;

	return {
		name: `${__THIS_PLUGIN__}:dev`,
		enforce: "pre",
		apply: "serve",
		config() {
			// Vite: configure resolution alias
			isVite = true;
			return {
				resolve: {
					alias: [
						{
							find: coreProdPattern,
							replacement: coreDev,
						},
					],
				},
			};
		},
		resolveId: {
			order: "pre",
			filter: {
				id: coreProdPattern,
			},
			async handler(source, importer, extraOptions) {
				if (isVite || source !== coreProd) {
					return null;
				}

				return resolvedCoreDev ??= await loader.resolve({
					source: coreDev,
					importer,
					options: extraOptions,
				});
			},
		},
	};
}
