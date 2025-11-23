import { declareTarget, inEnv } from "@calmdownval/rollup-util";

import { Plugin } from "./rollup-plugins.mjs";

const TypeScriptLibrary = declareTarget("TypeScriptLibrary", target => target
	.pipeline("Code", pipe => pipe
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
				baseDir: "./src",
				declarationDir: "./dist/types",
			}))
		.plugin(Plugin.TypeScript
			.configure({
				compilerOptions: {
					declaration: true,
					declarationDir: "./dist/types",
				},
			}))
		.output("Main", out => out
			.configure({
				format: "es",
				entryFileNames: "[name].mjs",
			})
		)
		.output("Minified", out => out
			.enable(inEnv("prod"))
			.configure({
				format: "es",
				entryFileNames: "[name].min.mjs",
			})
			.plugin(Plugin.Terser
				.configure({
					output: {
						comments: false,
					},
				}))
		)
	)
);

export const Target = { TypeScriptLibrary };
