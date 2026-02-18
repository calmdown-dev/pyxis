import type { CodeTransform, SymbolMeta } from "./types";

interface Boundary {
	readonly kind: "start" | "end";
	readonly transform: CodeTransform;
	position: number;
}

export function applyTransforms(originalCode: string, transforms: readonly CodeTransform[]) {
	// pre-sort transforms
	const sortedTransforms = transforms.toSorted((a, b) => (a.node.start - b.node.start) || (a.node.end - b.node.end));

	// generate start and end boundaries separately, with end bounds in reverse order
	const startBoundaries = sortedTransforms
		.map<Boundary>(transform => ({
			kind: "start",
			position: transform.node.start,
			transform,
		}));

	const endBoundaries = sortedTransforms
		.map<Boundary>(transform => ({
			kind: "end",
			position: transform.node.end,
			transform,
		}))
		.reverse();

	// concat and re-sort - relying on stable sort
	// this way nested boundaries will be in the correct order
	const boundaries = startBoundaries
		.concat(endBoundaries)
		.sort((a, b) => a.position - b.position); // stable sort

	const { length } = boundaries;
	const skipped: Boundary[] = [];

	let newCode = originalCode;
	let offset = 0;
	let index = 1;
	let prev = boundaries[0];

	for (; index < length; index += 1) {
		let next = boundaries[index];

		if (next.transform === prev.transform) {
			const start = prev.position + offset;
			const end = next.position + offset;

			const originalCode = newCode.slice(start, end);
			const transformedCode = next.transform.block(originalCode);

			newCode = (
				newCode.slice(0, start) +
				transformedCode +
				newCode.slice(end)
			);

			offset += transformedCode.length - originalCode.length;

			const peek = boundaries[index + 1];
			switch (peek?.kind) {
				case "start":
					prev = peek;
					index += 1;
					break;

				case "end":
					if (skipped.length === 0) {
						throw new Error("invalid state: no skipped nodes");
					}

					prev = skipped.pop()!;
					prev.position -= offset;
					break;
			}
		}
		else {
			if (prev.kind !== "start") {
				throw new Error("invalid state: disordered nodes");
			}

			skipped.push(prev);
			prev.position += offset;
			prev = next;
		}
	}

	return newCode;
}

export function generateOutro(exportedSymbols: readonly SymbolMeta[]) {
	let setters = "\n";
	let exports = " ";

	for (const symbol of exportedSymbols) {
		setters += `\t\t${JSON.stringify(symbol.exportedAs)}: value => { ${symbol.name} = value; },\n`;
		if (symbol.exportedAs !== symbol.name) {
			exports += `${symbol.name} as ${symbol.exportedAs}, `;
		}
		else {
			exports += `${symbol.name}, `;
		}
	}

	return `

if (import.meta.hot) {
	const set = {${setters}\t};
	import.meta.hot.accept(newExports => {
		Object.keys(newExports).forEach(key => {
			set[key]?.(newExports[key]);
		});
	});
}

export {${exports}};
`;
}
