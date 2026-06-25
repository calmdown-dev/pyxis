import type { ResolvedPyxisPluginOptions } from "~/options";
import type { PyxisLoader } from "~/PyxisLoader";
import { walkDown, type AST, type TransformBlock, type TranspileTsxCall } from "~/transpiler";
import { trimQuery } from "~/utils";

import type { CssExportsMap, CssExportsRegistry } from "./CssExportsRegistry";

interface SymbolInfo {
	readonly name: string;
	readonly kind: "jsx" | "namespace";
}

const isJsxFactory: { [K in string]?: true } = {
	jsx: true,
	jsxs: true,
	jsxDEV: true,
};

export interface TranspileClassNamesCall extends TranspileTsxCall {
	loader: PyxisLoader;
	registry: CssExportsRegistry;
	options: ResolvedPyxisPluginOptions;
}

export async function transpileClassNames({
	ast,
	transpiler,
	moduleId,
	loader,
	registry,
	options,
}: TranspileClassNamesCall) {
	// find CSS and pyxis imports of JSX factories within the program
	const imported: { [N in string]?: SymbolInfo } = {};
	const cssExportsMap: CssExportsMap = {};

	let hasCssImports = false;
	let node;
	let spec;

	for (node of ast.body) {
		if (node.type !== "ImportDeclaration" || node.importKind === "type") {
			continue;
		}

		const importSource = trimQuery(node.source.value);
		if (isPotentialCssModule(options, importSource)) {
			const map = await registry.getExports(importSource, moduleId);
			if (map) {
				Object.assign(cssExportsMap, map);
				hasCssImports = true;
			}

			continue;
		}

		const isPyxisModule = await loader.isPyxisModule({
			source: importSource,
			importer: moduleId,
		});

		if (!isPyxisModule) {
			continue;
		}

		for (spec of node.specifiers) {
			switch (spec.type) {
				case "ImportSpecifier":
					if (spec.importKind !== "type" &&
						spec.imported.type === "Identifier" &&
						isJsxFactory[spec.imported.name]
					) {
						imported[spec.local.name] = {
							name: spec.imported.name,
							kind: "jsx",
						};
					}

					break;

				case "ImportNamespaceSpecifier":
					imported[spec.local.name] = {
						name: spec.local.name,
						kind: "namespace",
					};

					break;

				// pyxis doesn't have default exports
			}
		}
	}

	if (!hasCssImports) {
		return;
	}

	// identify and transpile relevant CSS class names within the program
	const extPrefix = options.cssModules!.cssExtensionPrefix;
	const transpileJsxAttribute = (attribute: AST.JSXAttribute) => {
		let newClassName;
		if (attribute.name.type === "JSXNamespacedName" &&
			attribute.name.namespace.name === extPrefix &&
			(newClassName = cssExportsMap[attribute.name.name.name])
		) {
			transpiler.addTransform(attribute.name.name, rewriteAttributeName(newClassName));
		}
	};

	const transpileJsxFactoryCall = (factory: AST.CallExpression) => {
		if (factory.arguments.length < 2) {
			return;
		}

		const propsArg = factory.arguments[1];
		if (propsArg.type !== "ObjectExpression") {
			return;
		}

		let key;
		let newClassName;
		for (const prop of propsArg.properties) {
			if (prop.type === "Property" &&
				prop.key.type === "Literal" &&
				typeof (key = prop.key.value) === "string" &&
				key.startsWith(`${extPrefix}:`) &&
				(newClassName = cssExportsMap[key.slice(extPrefix.length + 1)])
			) {
				transpiler.addTransform(prop.key, rewritePropKeyLiteral(`${extPrefix}:${newClassName}`));
			}
		}
	};

	walkDown(ast, {
		enter: node => {
			if (node.type === "JSXAttribute") {
				transpileJsxAttribute(node);
			}
			else if (node.type === "CallExpression") {
				let tmp;
				switch (node.callee.type) {
					case "Identifier":
						if ((tmp = imported[node.callee.name]) && tmp.kind === "jsx") {
							transpileJsxFactoryCall(node);
						}

						break;

					case "MemberExpression":
						if (node.callee.property.type === "Identifier" &&
							isJsxFactory[node.callee.property.name] &&
							node.callee.object.type === "Identifier" &&
							(tmp = imported[node.callee.object.name]) &&
							tmp.kind === "namespace"
						) {
							transpileJsxFactoryCall(node);
						}

						break;
				}
			}
		},
	});
}

function isPotentialCssModule(options: ResolvedPyxisPluginOptions, source: string) {
	// under Vite CSS modules are suffixed as `.css.js` which breaks pattern matching -> trim it
	const trimmedSource = /\.js$/.test(source) ? source.slice(0, -3) : source;
	return options.cssModules!.modules.some(pattern => pattern.test(trimmedSource));
}

function rewriteAttributeName(newName: string): TransformBlock {
	return (originalCode, start) => {
		const removed = originalCode.length;
		return {
			newCode: newName,
			edits: [
				{
					at: start,
					delta: -removed,
				},
				{
					at: start + removed,
					delta: newName.length,
				},
			],
		};
	};
}

function rewritePropKeyLiteral(newName: string): TransformBlock {
	return (originalCode, start) => {
		// verify it's a quoted string literal
		if (originalCode[0] !== originalCode[originalCode.length - 1] || !/["'`]/.test(originalCode[0])) {
			return null;
		}

		const newCode = JSON.stringify(newName);
		const removed = originalCode.length;
		return {
			newCode,
			edits: [
				{
					at: start,
					delta: -removed,
				},
				{
					at: start + removed,
					delta: newCode.length,
				},
			],
		};
	};
}
