import { join, parse, relative } from "node:path";

import { generateDtsBundle } from "dts-bundle-generator";

const PLUGIN_NAME = "BundleDts";

/**
 * @typedef {Object} BundleDtsOptions
 * @property {Record<string, string>} entries - Map of output name -> entry .d.ts path (optional)
 * @property {string} baseDir - The base directory of the typescript module aka baseUrl in tsconfig (optional)
 * @property {string} declarationDir - Where to look for .d.ts files (optional)
 * @property {string} [tsconfig="./tsconfig.json"] - Path to tsconfig (defaults to "./tsconfig.json")
 */

/**
 * @param {BundleDtsOptions} options
 */
export default function BundleDtsPlugin(pluginOptions) {
	let cwd = undefined;
	let hasRun = false;
	let entries = [];

	return {
		name: PLUGIN_NAME,
		buildStart(rollupOptions) {
			cwd = process.cwd();
			hasRun = false;
			entries = [];

			if (pluginOptions?.entries) {
				if (pluginOptions.baseDir || pluginOptions.declarationDir) {
					this.warn({
						plugin: PLUGIN_NAME,
						pluginCode: "INVALID_OPTIONS",
						message: "Options `baseDir` and `declarationDir` have no meaning when `entries` map is specified.",
					});
				}

				const entriesMap = pluginOptions?.entries;
				for (const entryId in entriesMap) {
					if (!Object.hasOwn(entriesMap, entryId)) {
						continue;
					}

					entries.push({
						dtsEntryPath: join(cwd, getDeclarationPath(entriesMap[entryId])),
						fileName: getDeclarationPath(entryId),
					});
				}
			}
			else {
				if (!pluginOptions.baseDir || !pluginOptions.declarationDir) {
					this.error({
						plugin: PLUGIN_NAME,
						pluginCode: "INVALID_OPTIONS",
						message: "Both `baseDir` and `declarationDir` must be specified.",
					});

					return;
				}

				const baseDir = join(cwd, pluginOptions.baseDir);
				const declDir = join(cwd, pluginOptions.declarationDir);
				const { input } = rollupOptions;

				// TODO: input can also be a string ... i think
				for (const entryId in input) {
					const parsed = parse(input[entryId]);
					const entryDir = relative(baseDir, join(cwd, parsed.dir));
					entries.push({
						dtsEntryPath: join(declDir, entryDir, `${parsed.name}.d.ts`),
						fileName: getDeclarationPath(entryId),
					});
				}
			}
		},
		generateBundle() {
			if (hasRun) {
				return;
			}

			for (const entry of entries) {
				entry.assetId = this.emitFile({
					type: "asset",
					fileName: entry.fileName,
					source: "// pending generation\n",
				});
			}
		},
		writeBundle(outputOptions) {
			if (hasRun) {
				return;
			}

			hasRun = true;

			const dtsEntries = entries.map(it => ({ filePath: it.dtsEntryPath }));
			const compilerOptions = {
				preferredConfigPath: join(cwd, pluginOptions?.tsconfig ?? "./tsconfig.json"),
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

const RE_TS = /(?<!\.d)\.(tsx?|[mc]ts)$/i;
const EXT_MAP = {
	ts: ".d.ts",
	tsx: ".d.ts",
	mts: ".d.mts",
	cts: ".d.cts",
};

function parseTypeScriptPath(path) {
	const match = RE_TS.exec(path);
	return match
		? {
			base: path.slice(0, match.index),
			ext: match[1].toLowerCase(),
		}
		: null;
}

function getDeclarationPath(path) {
	const ts = parseTypeScriptPath(path);
	if (!ts) {
		return `${path}.d.ts`;
	}

	return `${ts.base}${EXT_MAP[ts.ext]}`;
}
