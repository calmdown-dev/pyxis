import * as Path from "node:path";

import type { Plugin } from "vite";

import type { ResolvedPyxisPluginOptions } from "~/options";
import { PyxisLoader } from "~/PyxisLoader";
import { replaceSourceIndex } from "~/transpiler";
import { normalizePath } from "~/utils";

import type { CssExportsMap, CssExportsRegistry } from "./CssExportsRegistry";

export interface PyxisTranspileTsxInit {
	loader: PyxisLoader;
	registry: CssExportsRegistry;
	options: ResolvedPyxisPluginOptions;
	tag: WeakKey;
}

interface CssChunk {
	readonly originalPath: string;
	readonly mappings: string;
	readonly originalCode: string;
	readonly transformedCode: string;
}

export function pyxisTranspileCss({ loader, registry, options, tag }: PyxisTranspileTsxInit): Plugin {
	const bundleCssChunks = new Map<string, CssChunk>();

	let LightningCss!: typeof import("lightningcss");

	return {
		name: `${__THIS_PLUGIN__}:transpile-css`,
		enforce: "pre",
		async buildStart() {
			try {
				LightningCss ??= await import("lightningcss");
			}
			catch (ex) {
				this.error({
					cause: ex,
					code: "E_DEPENDENCY",
					message: "When using the cssModules feature, the LightningCss package must be installed.",
				});
			}
		},
		transform: {
			order: "pre",
			async handler(originalCode, moduleId) {
				const module = loader.peek(moduleId);
				if (module?.tags.has(tag) !== true) {
					return null;
				}

				// transform CSS module with Lightning CSS
				const { originalPath, virtualPath } = module;
				const isModule = options.cssModules!.modules.some(pattern => pattern.test(originalPath));
				const result = LightningCss.transform({
					...options.cssModules!.lightningcss,
					code: Buffer.from(originalCode, "utf8"),
					filename: originalPath,
					projectRoot: loader.rootDir,
					sourceMap: true,
					cssModules: isModule && (
						typeof options.cssModules!.lightningcss?.cssModules === "object"
							? { ...options.cssModules!.lightningcss?.cssModules }
							: true
					),
				});

				// forward warnings
				for (const warning of result.warnings) {
					this.warn({
						code: warning.type,
						message: warning.message,
						loc: {
							column: warning.loc.column,
							line: warning.loc.line,
							file: warning.loc.filename,
						},
					});
				}

				// build and register CSS class name map
				const classNameMap: CssExportsMap = {};
				if (isModule) {
					Object
						.keys(result.exports!)
						.reduce((map, key) => (map[key] = result.exports![key].name, map), classNameMap);
				}

				registry.upsertExports(virtualPath, classNameMap);

				// get source mappings
				let mappings;
				try {
					const sourcemap = JSON.parse((result.map as Buffer).toString("utf8"));
					if (sourcemap?.version !== 3) {
						throw new Error("expected sourcemap version 3");
					}

					mappings = sourcemap.mappings ?? "";
				}
				catch (ex) {
					this.warn({
						code: "E_SOURCEMAP",
						message: `failed to parse sourcemap, ${(ex as Error).message}`,
					});
				}

				// Vite handles the bundling, return CSS directly, no caching
				const transformedCode = (result.code as Buffer).toString("utf8");
				if (loader.isVite) {
					const sourcePath = normalizePath(Path.relative(module.virtualPath, module.originalPath));
					return {
						moduleType: "js",
						moduleSideEffects: "no-treeshake",
						code: getViteHMRLoaderSource(classNameMap, moduleId, transformedCode),
						map: {
							version: 3,
							sources: [ sourcePath ],
							sourcesContent: [ originalCode ],
							names: [],
							mappings,
						},
					};
				}

				// for raw Rollup/Rolldown builds, cache CSS and instead return a JS chunk with mappings
				bundleCssChunks.set(moduleId, {
					originalPath,
					mappings,
					originalCode,
					transformedCode,
				});

				return {
					moduleType: "js",
					moduleSideEffects: "no-treeshake",
					code: getMappingsSource(classNameMap),
					map: {
						version: 3,
						sources: [ module.relativePath ],
						sourcesContent: [ originalCode ],
						names: [],
						mappings: "",
					},
				};
			},
		},
		generateBundle(outputOptions, bundle) {
			// do nothing when used with Vite
			if (loader.isVite) {
				return;
			}

			const sourcemapEnabled = outputOptions.sourcemap ?? false;
			const baseDir = Path.resolve(loader.rootDir, outputOptions.dir ?? "./dist");
			const baseUrl = outputOptions.sourcemapBaseUrl ? new URL(outputOptions.sourcemapBaseUrl) : null;
			const bundles = Object
				.values(bundle)
				.filter(it => it.type === "chunk");

			for (const it of bundles) {
				const fileName = `${Path.parse(it.fileName).name}.css`;
				const chunks = it.moduleIds
					.map(moduleId => bundleCssChunks.get(moduleId)!)
					.filter(Boolean);

				if (chunks.length === 0) {
					continue;
				}

				// merge CSS code
				let code = chunks.map(chunk => chunk.transformedCode).join("\n");

				// generate bundled sourcemap if enabled
				if (sourcemapEnabled) {
					const sourcemap = {
						version: 3,
						sources: chunks.map(chunk => normalizePath(Path.relative(baseDir, chunk.originalPath))),
						sourcesContent: chunks.map(chunk => chunk.originalCode),
						names: [],
						mappings: chunks
							.map((chunk, sourceIndex) => replaceSourceIndex(chunk.mappings, sourceIndex))
							.join(";"),
					};

					// emit sourcemap chunk
					const sourcemapFileName = `${fileName}.map`;
					this.emitFile({
						type: "prebuilt-chunk",
						fileName: sourcemapFileName,
						code: JSON.stringify(sourcemap),
					});

					code += `\n/*# sourceMappingURL=${baseUrl ? new URL(sourcemapFileName, baseUrl) : sourcemapFileName} */`;
				}

				// emit CSS chunk
				this.emitFile({
					type: "prebuilt-chunk",
					fileName,
					code,
				});
			}
		},
	};
}

function getMappingsSource(classNameMap: CssExportsMap) {
	return `
export default ${JSON.stringify(classNameMap, null, "\t")};
`;
}

function getViteHMRLoaderSource(
	classNameMap: CssExportsMap,
	moduleId: string,
	cssCode: string,
) {
	// Vite populates `import.meta.hot` automatically
	// we just need to add the raw CSS loader
	return `
import { removeStyle, updateStyle } from "/@vite/client";

const moduleId = ${JSON.stringify(moduleId)};
const cssCode = ${JSON.stringify(cssCode)};

updateStyle(moduleId, cssCode);
import.meta.hot.accept();
import.meta.hot.prune(() => removeStyle(moduleId));
${getMappingsSource(classNameMap)}
`;
}
