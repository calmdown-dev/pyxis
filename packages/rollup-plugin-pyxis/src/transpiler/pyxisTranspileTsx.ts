import * as Path from "node:path";

import type { TransformPluginContext } from "rolldown";
import type { Plugin } from "vite";

import { PyxisLoader } from "~/PyxisLoader";
import { normalizePath, trimQuery } from "~/utils";

import type { AST } from "./ast";
import { Transpiler } from "./Transpiler";
import { buildSourcemap } from "./sourcemap";

export interface PyxisTranspileTsxInit {
	loader: PyxisLoader;
	tag: WeakKey;
	transpile(this: TransformPluginContext, call: TranspileTsxCall): Promise<void>;
}

export interface TranspileTsxCall {
	readonly code: string;
	readonly ast: AST.Program;
	readonly transpiler: Transpiler;
	readonly moduleId: string;
	readonly relativeId: string;
}

export function pyxisTranspileTsx({ loader, tag, transpile }: PyxisTranspileTsxInit): Plugin {
	return {
		name: `${__THIS_PLUGIN__}:transpile-tsx`,
		enforce: "pre",
		transform: {
			order: "pre",
			async handler(originalCode, moduleId) {
				const module = loader.peek(moduleId);
				if (module?.tags.has(tag) !== true) {
					return null;
				}

				const trimmedId = trimQuery(moduleId);
				const lang = detectLang(trimmedId);
				if (!lang) {
					return null;
				}

				const ast = this.parse(originalCode, {
					astType: "js",
					lang,
				});

				const transpiler = new Transpiler();
				await transpile.call(this, {
					code: originalCode,
					transpiler,
					moduleId,
					relativeId: module.relativePath,
					ast,
				});

				const sourcePath = loader.isVite
					? normalizePath(Path.relative(module.virtualPath, module.originalPath))
					: module.relativePath;

				if (!transpiler.hasTransforms()) {
					return {
						code: originalCode,
						map: {
							version: 3,
							sources: [ sourcePath ],
							sourcesContent: [ originalCode ],
							names: [],
							mappings: buildSourcemap(originalCode, originalCode, []),
						},
					};
				}

				const result = transpiler.transpile(originalCode);
				return {
					code: result.transpiledCode,
					map: {
						version: 3,
						sources: [ sourcePath ],
						sourcesContent: [ originalCode ],
						names: [],
						mappings: result.sourcemap,
					},
				};
			},
		},
	};
}

function detectLang(moduleId: string) {
	const ext = Path.extname(moduleId);
	if (/^\.[cm]?tsx?$/i.test(ext)) {
		return ext.endsWith('x') ? "tsx" : "ts";
	}
	else if (/^\.[cm]?jsx?$/i.test(ext)) {
		return ext.endsWith('x') ? "jsx" : "js";
	}

	return null;
}
