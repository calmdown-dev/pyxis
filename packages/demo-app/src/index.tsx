import { renderer, type ElementsOf, type JsxResult } from "@calmdown/pyxis";
import { ClassListExtension, DomAdapter, EventExtension } from "@calmdown/pyxis-dom";

import { TestApp } from "./TestApp";

const pyxis = renderer(DomAdapter)
	.extend("cl", ClassListExtension)
	.extend("on", EventExtension)
	.create();

declare global {
	namespace JSX {
		type Element = JsxResult;
		type IntrinsicElements = ElementsOf<typeof pyxis>;
	}
}

pyxis.mount(document.body, <TestApp />);
