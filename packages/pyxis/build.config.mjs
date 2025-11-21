import { Target } from "build-logic/targets";

Target.TypeScriptLibrary.build(target => {
	target.entry("first", "./src/first.ts");
	target.entry("second", "./src/second.ts");
});
