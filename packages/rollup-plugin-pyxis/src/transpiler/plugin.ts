import * as path from "node:path";

import type { Plugin, PluginContext, TransformPluginContext } from "rolldown";

import { getShortModuleId, isPathWithin } from "~/utils";

import type { AST } from "./ast";
import { Transpiler } from "./Transpiler";

export interface TranspileRoutine<TContext> {
	include: MaybeArray<RegExp | string>;
	exclude?: MaybeArray<RegExp | string>;
	order?: "pre" | "post";
	init?: (this: PluginContext) => Promise<TContext> | TContext;
	process: (this: TransformPluginContext, call: TranspileCall<TContext>) => Promise<void> | void;
}

export interface TranspileCall<TContext = {}> {
	readonly context: TContext;
	readonly ast: AST.Program;
	readonly transpiler: Transpiler;
	readonly moduleId: string;
	readonly shortModuleId: string;
}

export type MaybeArray<T> = T[] | T;

export function transpile<TInit = void>(routine: TranspileRoutine<TInit>): Plugin {
	let root: string;
	let init!: TInit;
	return {
		name: `${__THIS_MODULE__}:Transpiler`,
		async buildStart(inputOptions) {
			root = inputOptions.cwd ?? process.cwd();
			init = await routine.init?.call(this)!;
		},
		transform: {
			filter: {
				id: {
					include: routine.include,
					exclude: routine.exclude,
				},
			},
			order: routine.order,
			async handler(code, moduleId) {
				if (!isPathWithin(root, moduleId)) {
					return null;
				}

				const lang = detectLang(moduleId);
				if (!lang) {
					return null;
				}

				const transpiler = new Transpiler();
				const shortModuleId = getShortModuleId(root, moduleId);
				await routine.process.call(this, {
					context: init,
					ast: this.parse(code, {
						astType: "js",
						lang,
					}),
					transpiler,
					moduleId,
					shortModuleId,
				});

				if (!transpiler.hasTransforms()) {
					return null;
				}

				const result = transpiler.transpile(code);
				return {
					code: result.transpiledCode,
					map: {
						version: 3,
						sources: [ shortModuleId ],
						sourcesContent: [ code ],
						names: [],
						mappings: result.sourcemap,
					},
				};
			},
		},
	};
}

function detectLang(moduleId: string) {
	const ext = path.extname(moduleId);
	if (/^\.[cm]?tsx?$/i.test(ext)) {
		return ext.endsWith("x") ? "tsx" : "ts";
	}
	else if (/^\.[cm]?jsx?$/i.test(ext)) {
		return ext.endsWith("x") ? "jsx" : "js";
	}

	return null;
}
