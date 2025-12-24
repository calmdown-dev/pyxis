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
		.plugin(Plugin.Externals)
		.output("Main", out => out
			.configure({
				format: "es",
				entryFileNames: "[name].js",
			})
		)
		.output("Minified", out => out
			.enable(inEnv("prod"))
			.configure({
				format: "es",
				entryFileNames: "[name].min.js",
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

const PyxisApplication = declareTarget("PyxisApplication", target => target
	.pipeline("Code", pipe => pipe
		.plugin(Plugin.Delete
			.configure({
				// dryRun: true,
				targets: [
					{
						trigger: "before",
						include: "./dist/**/*",
					},
				],
			}))
		.plugin(Plugin.PyxisTranspiler)
		.plugin(Plugin.TypeScript)
		.plugin(Plugin.Externals)
		.output("Main", out => out
			.configure({
				format: "es",
				entryFileNames: "[name].js",
			})
		)
		.output("Minified", out => out
			.enable(inEnv("prod"))
			.configure({
				format: "es",
				entryFileNames: "[name].min.js",
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

export const Target = { PyxisApplication, TypeScriptLibrary };
