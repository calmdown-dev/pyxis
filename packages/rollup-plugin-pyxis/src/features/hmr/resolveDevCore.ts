import type { PluginContext, ResolvedId } from "rolldown";
import type { Plugin } from "vite";

import type { ResolvedPyxisPluginOptions } from "~/options";
import { resolve } from "~/utils";

export function resolveDevCore(options: ResolvedPyxisPluginOptions): Plugin {
	const coreProd = `${options.pyxisModule}/core`;
	const coreDev = `${options.pyxisModule}/core-dev`;

	let coreDevId: ResolvedId | null = null;
	let isVite = false;

	return {
		name: `${__THIS_MODULE__}:DevResolver`,
		enforce: "pre",
		config() {
			// Vite only
			// mix in resolution alias
			isVite = true;
			return {
				resolve: {
					alias: {
						[coreProd]: coreDev,
					},
				},
			};
		},
		resolveId: {
			filter: {
				id: /\/core$/,
			},
			order: "pre",
			async handler(source, importer, extraOptions) {
				if (isVite || source !== coreProd) {
					return null;
				}

				coreDevId ??= await resolve(this as unknown as PluginContext, source, importer, {
					isEntry: extraOptions.isEntry,
					kind: extraOptions.kind,
					skipSelf: true,
				});

				return coreDevId;
			},
		},
	};
}
