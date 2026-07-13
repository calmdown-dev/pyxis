import type { PyxisLoader } from "~/PyxisLoader";
import { walkDown, walkUp, type AST, type TransformBlock, type TranspileTsxCall } from "~/transpiler";

interface SymbolInfo {
	readonly kind: FactoryKind | "namespace";
	readonly name: string;
}

type FactoryKind =
	| "atom"
	| "component"
	| "context"
	| "list"
	| "host";

const factoryKindMap: { [N in string]?: FactoryKind } = {
	atomOf: "atom",
	component: "component",
	createContext: "context",
	listOf: "list",
	host: "host",
};

const factoryArgCount: { [K in FactoryKind]: number } = {
	atom: 2,
	component: 1,
	context: 0,
	list: 2,
	host: 2,
};

export interface TranspileFactoryCallsCall extends TranspileTsxCall {
	loader: PyxisLoader;
}

export async function transpileFactoryCalls({
	ast,
	moduleId,
	relativeId,
	transpiler,
	loader,
}: TranspileFactoryCallsCall) {
	// find pyxis imports within the program
	const imported: { [N in string]?: SymbolInfo } = {};
	let hasPyxisImports = false;

	for (const node of ast.body) {
		if (node.type !== "ImportDeclaration" || node.importKind === "type") {
			continue;
		}

		const isPyxisModule = await loader.isPyxisModule({
			source: node.source.value,
			importer: moduleId,
		});

		if (!isPyxisModule) {
			continue;
		}

		for (const spec of node.specifiers) {
			let kind;
			switch (spec.type) {
				case "ImportSpecifier":
					if (spec.importKind !== "type" &&
						spec.imported.type === "Identifier" &&
						(kind = factoryKindMap[spec.imported.name])
					) {
						hasPyxisImports = true;
						imported[spec.local.name] = {
							name: spec.imported.name,
							kind,
						};
					}

					break;

				case "ImportNamespaceSpecifier":
					hasPyxisImports = true;
					imported[spec.local.name] = {
						name: spec.local.name,
						kind: "namespace",
					};

					break;

				// pyxis doesn't have default exports
			}
		}
	}

	if (!hasPyxisImports) {
		return;
	}

	// identify and transpile factory calls within the program, passing unique devId's
	// uniqueness is not guaranteed from names alone, so we append counters when necessary (an order-sensitive fallback)
	const assignedIds: { [K in string]?: number } = {};

	// track component nodes - devId must only be assigned to factories within a component scope, not e.g. within event handlers.
	const componentNodes = new WeakSet<AST.Node>();

	const transpileCall = (factory: AST.CallExpression, kind: FactoryKind) => {
		if (kind === "component") {
			componentNodes.add(factory);
		}
		else if (!isComponentScope(componentNodes, factory)) {
			return;
		}

		const name = findNameFor(factory);
		const extraArgCount = factoryArgCount[kind] - factory.arguments.length;
		if (name && extraArgCount >= 0) {
			const baseId = `${relativeId} ${name}`;
			const counter = (assignedIds[baseId] ?? 0) + 1;
			assignedIds[baseId] = counter;

			transpiler.addTransform(factory, appendDevIdArgument(`${baseId} ${counter}`, extraArgCount));
		}
	};

	walkDown(ast, {
		enter: node => {
			if (node.type !== "CallExpression") {
				return;
			}

			let tmp;
			let kind;
			switch (node.callee.type) {
				case "Identifier":
					if ((tmp = imported[node.callee.name]) && tmp.kind !== "namespace") {
						transpileCall(node, tmp.kind);
					}

					break;

				case "MemberExpression":
					if (node.callee.property.type === "Identifier" &&
						(kind = factoryKindMap[node.callee.property.name]) &&
						node.callee.object.type === "Identifier" &&
						(tmp = imported[node.callee.object.name]) &&
						tmp.kind === "namespace"
					) {
						transpileCall(node, kind);
					}

					break;
			}

		},
	});
}

function isComponentScope(componentNodes: WeakSet<AST.Node>, node: AST.Node) {
	const nearestFn = walkUp(node, it => (
		it.type === "FunctionDeclaration" || it.type === "ArrowFunctionExpression"
			? it
			: null
	));

	return (
		nearestFn &&
		nearestFn.parent?.type === "CallExpression" &&
		componentNodes.has(nearestFn.parent)
	);
}

function findNameFor(node: AST.Node) {
	return walkUp(node.parent, parent => {
		switch (parent.type) {
			case "VariableDeclarator":
				return parent.id.type === "Identifier"
					? parent.id.name
					: undefined;

			case "Property":
				switch (parent.key.type) {
					case "Identifier":
						return parent.key.name;

					case "PrivateIdentifier":
						return parent.key.name;

					case "Literal":
						return typeof parent.key.value === "string"
							? parent.key.value
							: undefined;

					default:
						return undefined;
				}

			case "ExportDefaultDeclaration":
				return "default";

			default:
				return null;
		}
	});
}

function appendDevIdArgument(devId: string, extraArgCount: number): TransformBlock {
	return (originalCode, _start, end) => {
		const match = /\s*\)$/.exec(originalCode);
		if (!match) {
			return null;
		}

		const slicedStart = originalCode.slice(0, match.index);
		let addedCode = "";
		if (!/[(,]$/.test(slicedStart)) {
			addedCode += ", ";
		}

		addedCode += "undefined, ".repeat(extraArgCount);
		addedCode += JSON.stringify(devId);

		return {
			newCode: `${slicedStart}${addedCode})`,
			edits: [
				{
					at: end - 1,
					delta: addedCode.length,
				},
			],
		};
	};
}
