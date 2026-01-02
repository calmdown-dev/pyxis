import type { IntrinsicElements as PyxisIntrinsicElements } from "@calmdown/pyxis-dom";

declare global {
	namespace JSX {
		type Node = globalThis.Node;
		type IntrinsicElements = PyxisIntrinsicElements;
	}
}
