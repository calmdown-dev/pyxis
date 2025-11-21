import { join } from "node:path";

import { generateDtsBundle } from "dts-bundle-generator";

const PLUGIN_NAME = "BundleDts";
const RE_DTS = /.d.ts$/i;

/**
 * @typedef {Object} BundleDtsOptions
 * @property {Record<string, string>} entries - Map of output name -> entry .d.ts path
 * @property {string} [tsconfig="./tsconfig.json"] - Path to tsconfig (defaults to "./tsconfig.json")
 */

/**
 * @param {BundleDtsOptions} options
 */
export default function BundleDtsPlugin(options) {
	const entriesMap = options?.entries ?? {};

	let cwd = undefined;
	let entries = [];
	return {
		name: PLUGIN_NAME,
		buildStart() {
			cwd = process.cwd();
		},
		generateBundle() {
			entries = [];
			for (let assetId in entriesMap) {
				if (!Object.hasOwn(entriesMap, assetId)) {
					continue;
				}

				entries.push({
					entryPointPath: join(cwd, entriesMap[assetId]),
					assetId: this.emitFile({
						type: "asset",
						fileName: RE_DTS.test(assetId) ? assetId : `${assetId}.d.ts`,
						source: "// pending generation",
					}),
				});
			}
		},
		writeBundle(outputOptions) {
			const dtsEntries = entries.map(it => ({ filePath: it.entryPointPath }));
			const compilerOptions = {
				preferredConfigPath: join(cwd, options?.tsconfig ?? "./tsconfig.json"),
			};

			const results = generateDtsBundle(dtsEntries, compilerOptions);
			return Promise.all(
				entries.map((entry, index) => {
					const path = join(cwd, outputOptions.dir, this.getFileName(entry.assetId));
					return this.fs.writeFile(path, results[index], "utf8");
				}),
			);
		},
	};
}
