import { Target } from "build-logic/targets";

Target.TypeScriptLibrary.build(target => {
	target.entry("index", "./src/index.ts");
	target.entry("jsx-runtime", "./src/jsx-runtime.ts");
});
