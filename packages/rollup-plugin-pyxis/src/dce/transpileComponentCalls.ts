import type { PyxisLoader } from "~/PyxisLoader";
import { walkDown, type TransformBlock, type TranspileTsxCall } from "~/transpiler";

export interface TranspileComponentCallsCall extends TranspileTsxCall {
	loader: PyxisLoader;
}

const RE_PURE_TAG = /\/\*\s*[@#]__PURE__\s*\*\/\s*$/;
const PURE_TAG = "/*@__PURE__*/";

export async function transpileComponentCalls({ ast, code, moduleId, transpiler, loader }: TranspileComponentCallsCall) {
	// Track factory imports independently of HMR, including local aliases and namespace imports.
	const imported: { [N in string]?: "direct" | "namespace" } = {};
	let hasPyxisImports = false;

	for (const node of ast.body) {
		if (node.type !== "ImportDeclaration" || node.importKind === "type") {
			continue;
		}

		if (!await loader.isPyxisModule({ source: node.source.value, importer: moduleId })) {
			continue;
		}

		for (const spec of node.specifiers) {
			if (spec.type === "ImportSpecifier" && spec.importKind !== "type") {
				const name = spec.imported.type === "Identifier" ? spec.imported.name : spec.imported.value;
				if (name === "component") {
					hasPyxisImports = true;
					imported[spec.local.name] = "direct";
				}
			}
			else if (spec.type === "ImportNamespaceSpecifier") {
				hasPyxisImports = true;
				imported[spec.local.name] = "namespace";
			}
		}
	}

	if (!hasPyxisImports) {
		return;
	}

	walkDown(ast, {
		enter(node) {
			if (node.type !== "CallExpression") {
				return;
			}

			const { callee } = node;

			let name;
			if (callee.type === "Identifier" && imported[callee.name] === "direct") {
				name = callee.name;
			}
			else if (
				callee.type === "MemberExpression" &&
				callee.object.type === "Identifier" &&
				imported[callee.object.name] === "namespace" &&
				callee.property.type === "Identifier" &&
				callee.property.name === "component"
			) {
				name = callee.object.name;
			}

			if (!name) {
				return;
			}

			// Avoid adding a second annotation when source code already marks the call as pure.
			if (!RE_PURE_TAG.test(code.slice(0, node.start))) {
				transpiler.addTransform(node, prependPure);
			}
		},
	});
}

const prependPure: TransformBlock = (originalCode, start) => ({
	newCode: PURE_TAG + originalCode,
	edits: [
		{
			at: start,
			delta: PURE_TAG.length,
		},
	],
});
