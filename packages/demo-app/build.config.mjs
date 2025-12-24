import { Target } from "build-logic/targets";

Target.PyxisApplication.build(target => {
	target.entry("index", "./src/index.ts");
});
