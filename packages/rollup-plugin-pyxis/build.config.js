import * as Target from "build-logic/targets";

Target.TypeScriptLibrary.build((target, context) => {
	target.entry("index", "./src/index.ts");

	target.configure({
		external: [
			/^node:.*/,
			"lightningcss"
		],
		transform: {
			define: {
				__THIS_PLUGIN__: JSON.stringify(context.moduleName),
				__VIRTUAL_DIR__: JSON.stringify("@pyxis"), // must be regex safe, otherwise escaping would be necessary in ./src/pyxisTransform.ts
			},
		},
	});
});
