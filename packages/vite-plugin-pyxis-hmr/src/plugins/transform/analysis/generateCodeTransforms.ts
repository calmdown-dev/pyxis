import type * as AST from "@oxc-project/types";

import { walkUp } from "./ast";
import type { CodeTransform, FactoryCallSymbolMeta, SymbolMeta } from "./types";

type ExpectedNode =
	| AST.CallExpression
	| AST.Class
	| AST.ExportNamedDeclaration
	| AST.ExportDefaultDeclaration
	| AST.Function
	| AST.VariableDeclaration;

export function generateCodeTransforms(
	exportedSymbols: readonly SymbolMeta[],
	factoryCalls: readonly FactoryCallSymbolMeta[],
	moduleId: string,
) {
	// find distinct nodes of interest
	const nodes = new Map<ExpectedNode, SymbolMeta | FactoryCallSymbolMeta>();
	for (const symbol of exportedSymbols) {
		switch (symbol.type) {
			case "Variable":
			case "Declaration":
				nodes.set(symbol.declaredBy, symbol);
				break;
		}

		if (symbol.exportedBy) {
			nodes.set(symbol.exportedBy, symbol);
		}
	}

	for (const call of factoryCalls) {
		nodes.set(call.expression, call);
	}

	const transforms: CodeTransform[] = [];
	for (const [ node, symbol ] of nodes) {
		switch (node.type) {
			case "CallExpression":
				generateDevelopmentId(transforms, symbol as FactoryCallSymbolMeta, moduleId);
				break;

			case "ClassDeclaration":
			case "FunctionDeclaration":
				assignToMutableVariable(transforms, node);
				break;

			case "ExportNamedDeclaration":
				removeNamedExport(transforms, node);
				break;

			case "ExportDefaultDeclaration":
				removeDefaultExport(transforms, node);
				break;

			case "VariableDeclaration":
				transformToMutableVariable(transforms, node);
				break;
		}
	}

	return transforms;
}

function generateDevelopmentId(transforms: CodeTransform[], symbol: FactoryCallSymbolMeta, moduleId: string) {
	let name = walkUp(symbol.expression.parent, parent => {
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

	if (!name) {
		return;
	}

	name = `${moduleId}:${name}`;
	transforms.push({
		node: symbol.expression,
		block: originalCode => {
			const match = /\s*\)$/.exec(originalCode);
			if (!match) {
				return originalCode; // unexpected format
			}

			let precedingArgCount = 0;
			switch (symbol.kind) {
				case "atom":		// function atom(initialValue?, lifecycle?, devId?)
				case "list":		// function list(source?, lifecycle?, devId?)
				case "provider":	// function providerOf(context, defaultValue?, devId?)
					precedingArgCount = 2;
					break;

				case "component":	// function component(block, devId?)
					precedingArgCount = 1;
					break;

				case "context":		// function createContext(devId?)
					precedingArgCount = 0;
					break;
			}

			const addArgCount = precedingArgCount - symbol.expression.arguments.length;
			if (addArgCount < 0) {
				return originalCode; // unexpected arg count
			}

			let newCode = originalCode.slice(0, match.index);
			if (!/[(,]$/.test(newCode)) {
				newCode += ", ";
			}

			newCode += "undefined, ".repeat(addArgCount);
			return `${newCode}${JSON.stringify(name)})`;
		},
	});
}

function transformToMutableVariable(transforms: CodeTransform[], node: AST.VariableDeclaration) {
	if (node.kind !== "const") {
		// only transform consts, leave vars & lets as-is
		return;
	}

	transforms.push({
		node,
		block: originalCode => {
			const match = /^\s*const\s+/.exec(originalCode);
			return match
				? "let " + originalCode.slice(match[0].length)
				: originalCode;
		},
	});
}

function assignToMutableVariable(transforms: CodeTransform[], node: AST.Function | AST.Class) {
	transforms.push({
		node,
		block: originalCode => `let ${node.id!.name} = ${originalCode};`,
	});
}

function removeNamedExport(transforms: CodeTransform[], node: AST.ExportNamedDeclaration) {
	transforms.push({
		node,
		block: originalCode => {
			if (!node.declaration) {
				return "";
			}

			const match = /^\s*export\s+/.exec(originalCode);
			return match
				? originalCode.slice(match[0].length)
				: originalCode;
		},
	});
}

function removeDefaultExport(transforms: CodeTransform[], node: AST.ExportDefaultDeclaration) {
	transforms.push({
		node,
		block: originalCode => {
			if (node.declaration.type === "Identifier") {
				return "";
			}

			const match = /^\s*export\s+default\s+/.exec(originalCode);
			return match
				? "let __default = " + originalCode.slice(match[0].length)
				: originalCode;
		},
	});
}
