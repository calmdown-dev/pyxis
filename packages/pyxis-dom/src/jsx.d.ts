import type { Nil } from "@calmdown/pyxis";
import type { ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

declare global {
	namespace JSX {
		type Node = globalThis.Node;
		type IntrinsicElements = ExtendedIntrinsicElements<{}>;
	}
}
