import { Target } from "build-logic/targets";

Target.TypeScriptLibrary.build(target => {
	target.entry("first", "./src/first.ts");
	target.entry("second", "./src/test/second.ts");
});
