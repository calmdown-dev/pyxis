import { declareTarget, inEnv } from "@calmdownval/rollup-util";

import { Plugin } from "./rollup-plugins.mjs";

const TypeScriptLibrary = declareTarget("TypeScriptLibrary", target => (target
	.pipeline("Code", pipe => (pipe
		.plugin(Plugin.Delete
			.configure({
				// dryRun: true,
				targets: [
					{
						trigger: "before",
						include: "./dist/**/*",
					},
					{
						trigger: "after",
						include: "./dist/types/**",
					},
				],
			}))
		.plugin(Plugin.BundleDts
			.configure({
				entries: {
					"first": "./dist/types/first.d.ts",
					"second": "./dist/types/second.d.ts",
				},
			}))
		.plugin(Plugin.TypeScript
			.configure({
				compilerOptions: {
					declaration: true,
					declarationDir: "./dist/types",
				},
			}))
		.plugin(Plugin.Terser
			.enable(inEnv("prod"))
			.configure({
				output: {
					comments: false,
				},
			}))
		.output("Main", out => (out
			.configure({
				format: "es",
				entryFileNames: "[name].mjs",
			})
		))
	))
));

export const Target = { TypeScriptLibrary };
