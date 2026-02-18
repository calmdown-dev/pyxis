import * as Target from "build-logic/targets";
import * as Plugin from "build-logic/plugins";

Target.TypeScriptLibrary.build(target => {
	target.entry("core", "./src/exports/core.ts");

	target.configure({
		external: [ "@calmdown/pyxis", "@calmdown/pyxis/core" ],
	});

	target.pipelines.Code.plugin(Plugin.Copy
		.configure({
			targets: [
				{
					destination: "./dist",
					include: "./src/exports/*.{js,d.ts}",
				},
			],
		})
	);
});
