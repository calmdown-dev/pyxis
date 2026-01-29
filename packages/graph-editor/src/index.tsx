import { pyxis, RefExtension, type ElementsOf, type JsxResult } from "@calmdown/pyxis";
import { ClassListExtension, CssVariableExtension, DomAdapter, EventExtension, Text } from "@calmdown/pyxis-dom";

import { EditorLayout } from "~/component/EditorLayout";
import { GraphEditor } from "~/component/GraphEditor";

const renderer = pyxis(DomAdapter)
	.extend("on", EventExtension)
	.extend("cl", ClassListExtension)
	.extend("var", CssVariableExtension)
	.extend("ref", RefExtension)
	.build();

declare global {
	namespace JSX {
		type Element = JsxResult;
		type IntrinsicElements = ElementsOf<typeof renderer>;
	}
}

renderer.mount(document.body, () => (
	<EditorLayout
		main={() => (
			<GraphEditor />
		)}
		toolbar={() => (
			<Text>Lmao</Text>
		)}
	/>
));
