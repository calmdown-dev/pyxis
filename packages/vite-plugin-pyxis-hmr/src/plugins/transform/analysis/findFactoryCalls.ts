import type * as AST from "@oxc-project/types";

import type { PyxisHmrPluginOptions } from "~/types";

import { walkDown } from "./ast";
import type { FactoryCallSymbolMeta } from "./types";

interface ImportedSymbol {
	kind: FactoryCallSymbolMeta["kind"] | "namespace";
	name: string;
}

const factoryKind: { [N in string]?: FactoryCallSymbolMeta["kind"] } = {
	atom: "atom",
	component: "component",
	createContext: "context",
	list: "list",
	providerOf: "provider",
};

export function findFactoryCalls(
	ast: AST.Program,
	{ pyxisModule }: Required<PyxisHmrPluginOptions>,
) {
	const factoryCalls: FactoryCallSymbolMeta[] = [];

	// find pyxis imports within the program
	const imported: { [N in string]?: ImportedSymbol } = {};
	let hasPyxisImports = false;

	for (const node of ast.body) {
		if (node.type !== "ImportDeclaration" ||
			node.importKind === "type" ||
			!node.source.value.startsWith(pyxisModule)
		) {
			continue;
		}

		for (const spec of node.specifiers) {
			let kind;
			switch (spec.type) {
				case "ImportSpecifier":
					if (spec.importKind !== "type" && spec.imported.type === "Identifier" && (kind = factoryKind[spec.imported.name])) {
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
		return factoryCalls;
	}

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
						factoryCalls.push({
							expression: node,
							kind: tmp.kind,
						});
					}

					break;

				case "MemberExpression":
					if (node.callee.property.type === "Identifier" &&
						(kind = factoryKind[node.callee.property.name]) &&
						node.callee.object.type === "Identifier" &&
						(tmp = imported[node.callee.object.name]) &&
						tmp.kind === "namespace"
					) {
						factoryCalls.push({
							expression: node,
							kind,
						});
					}

					break;
			}

		},
	});

	return factoryCalls;
}
