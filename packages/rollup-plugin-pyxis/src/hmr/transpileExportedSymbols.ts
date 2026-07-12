import type { AST, TransformBlock, TranspileTsxCall } from "~/transpiler";

type NodeInfo =
	| VariableNodeInfo
	| ClassNodeInfo
	| FunctionNodeInfo
	| DefaultExpressionNodeInfo;

interface VariableNodeInfo {
	readonly kind: "variable";
	readonly node: AST.VariableDeclaration;
}

interface ClassNodeInfo {
	readonly kind: "class";
	readonly node: AST.Class;
}

interface FunctionNodeInfo {
	readonly kind: "function";
	node?: AST.Function;
	overloads?: AST.Function[];
}

interface DefaultExpressionNodeInfo {
	readonly kind: "default-expression";
	readonly node: AST.Expression;
}

interface ExportedNameInfo {
	readonly shouldExport: boolean;
	readonly localName: string;
	readonly exportName: string;
}

const HMR_PREFIX = "__HMR_";

/**
 * applies transforms to exports:
 * - all exports are removed
 * - originally exported consts are converted to mutable variables
 * - originally exported function and class declarations are stored to mutable variables
 * - HMR logic is appended
 * - finally a common export is added re-exporting all the original symbols
 */
export async function transpileExportedSymbols({ ast, transpiler }: TranspileTsxCall) {
	const topScopeNodesByName: { [N in string]?: NodeInfo } = {};
	const topScopeNodes = new Map<AST.Node, NodeInfo>();
	const exportedNodes = new Set<AST.Node>();
	const exportedNames = new Map<string, ExportedNameInfo>();

	const visitTopScopeNode = (node: AST.VariableDeclaration | AST.Class | AST.Function, name: string) => {
		let info: NodeInfo | undefined;
		switch (node.type) {
			case "VariableDeclaration":
				topScopeNodesByName[name] = (info = { kind: "variable", node });
				break;

			case "ClassDeclaration":
				topScopeNodesByName[name] = (info = { kind: "class", node });
				break;

			case "FunctionDeclaration":
				info = topScopeNodesByName[name];
				if (!info || info.kind !== "function") {
					topScopeNodesByName[name] = (info = { kind: "function" });
				}

				info.node = node;
				break;

			case "TSDeclareFunction":
				info = topScopeNodesByName[name];
				if (!info || info.kind !== "function") {
					topScopeNodesByName[name] = (info = { kind: "function" });
				}

				(info.overloads ??= []).push(node);
				break;

			default:
				return;
		}

		topScopeNodes.set(node, info);
	};

	for (const node of ast.body) {
		switch (node.type) {
			case "VariableDeclaration":
			case "FunctionDeclaration":
			case "ClassDeclaration":
				findDeclaredSymbols(node, it => {
					visitTopScopeNode(node, it.name);
				});

				break;

			case "ExportNamedDeclaration": {
				// may be a direct named export, e.g.:
				// export const a = 123;
				const declaration = node.declaration;
				if (declaration && (declaration.type === "TSDeclareFunction" || !isTypeScriptNode(declaration))) {
					exportedNodes.add(declaration);
					findDeclaredSymbols(declaration, it => {
						visitTopScopeNode(declaration, it.name);
						exportedNames.set(it.name, {
							shouldExport: true,
							localName: it.name,
							exportName: it.name,
						});
					});

					transpiler.addTransform(node, removeExport);
				}

				if (node.exportKind === "type") {
					break;
				}

				// or a named reference export:
				// export { a, b, c };
				for (const ref of node.specifiers) {
					if (ref.local.type !== "Identifier" || ref.exported.type !== "Identifier") {
						continue;
					}

					const localName = ref.local.name;
					const exportedNode = topScopeNodesByName[localName]?.node;
					if (exportedNode) {
						const exportName = ref.exported.name;
						exportedNodes.add(exportedNode);
						exportedNames.set(exportName, {
							shouldExport: false,
							localName,
							exportName,
						});
					}
				}

				break;
			}

			case "ExportDefaultDeclaration": {

				// default export can be any expression -> detect references, otherwise use directly
				if (node.declaration.type === "Identifier") {
					const localName = node.declaration.name;
					const exportedNode = topScopeNodesByName[localName]?.node;
					if (exportedNode) {
						exportedNodes.add(exportedNode);
						transpiler.addTransform(node, removeNode);
					}
				}
				else if (!isTypeScriptNode(node.declaration)) {
					topScopeNodes.set(node.declaration, {
						kind: "default-expression",
						node: node.declaration,
					});

					exportedNodes.add(node.declaration);
					exportedNames.set("default", {
						shouldExport: true,
						localName: `${HMR_PREFIX}default`,
						exportName: "default",
					});

					transpiler.addTransform(node, removeExport);
				}

				break;
			}
		}
	}

	// exit early if no exports were transformed
	if (exportedNodes.size === 0) {
		return;
	}

	const handled = new WeakSet<NodeInfo>();
	for (const node of exportedNodes) {
		const info = topScopeNodes.get(node);
		if (!info || handled.has(info)) {
			continue;
		}

		handled.add(info);
		switch (info.kind) {
			case "variable":
				if (info.node.kind === "const") {
					transpiler.addTransform(node, convertToMutableVariable);
				}

				break;

			case "class":
				if (info.node.id) {
					transpiler.addTransform(node, assignToMutableVariable(info.node.id.name));
				}

				break;

			case "function":
				if (!info.node || !info.node.id) {
					break;
				}

				if (info.overloads) {
					const oldName = info.node.id.name;
					const newName = `${HMR_PREFIX}${oldName}`;
					[ ...info.overloads, info.node ].forEach(it => {
						transpiler.addTransform(it, renameOverloadedFunction(newName));
					});

					transpiler.addTransform(info.node, appendCode(`\n\nlet ${oldName} = ${newName};`));
				}
				else {
					transpiler.addTransform(node, assignToMutableVariable(info.node.id.name));
				}

				break;

			case "default-expression":
				transpiler.addTransform(node, assignToMutableVariable(`${HMR_PREFIX}default`));
				break;
		}
	}

	// generate HMR replacer code
	let setters = "\n";
	let exports = "";

	for (const it of exportedNames.values()) {
		setters += `\t\t${JSON.stringify(it.exportName)}: value => { ${it.localName} = value; },\n`;
		if (it.shouldExport) {
			if (it.localName !== it.exportName) {
				exports += `${it.localName} as ${it.exportName}, `;
			}
			else {
				exports += `${it.localName}, `;
			}
		}
	}

	let hmrCode = `

if (import.meta.hot) {
	const setter = {${setters}\t};
	import.meta.hot.accept(hmrExports => {
		hmrExports && Object.keys(hmrExports).forEach(key => {
			setter[key]?.(hmrExports[key]);
		});
	});
}
`;

	if (exports) {
		hmrCode += `\nexport { ${exports.slice(0, -2)} };\n`;
	}

	transpiler.addTransform(ast, appendCode(hmrCode));
}

function findDeclaredSymbols(
	declaration: AST.Declaration,
	block: (node: AST.Node & { type: "Identifier" }) => void,
) {
	switch (declaration.type) {
		case "VariableDeclaration":
			findDeclaredVariables(declaration, block);
			break;

		case "FunctionDeclaration":
		case "TSDeclareFunction":
		case "ClassDeclaration": {
			if (!declaration.id) {
				break;
			}

			block(declaration.id);
			break;
		}
	}
}

function findDeclaredVariables(
	declaration: AST.VariableDeclaration,
	block: (node: AST.Node & { type: "Identifier" }) => void,
) {
	for (const decl of declaration.declarations) {
		if (decl.init) {
			if (isBindingPattern(decl.id)) {
				// variable declarations via a binding pattern, e.g.:
				// const { a, b } = obj;
				// const [ x, y ] = arr;
				//
				// here id points to `obj` or `arr` -> we don't care about it

				findDestructuredVariables(decl.id, block);
			}
			else {
				// variable initialized to an expression, e.g.:
				// const x = 123;

				if (decl.id.type !== "Identifier") {
					continue;
				}

				block(decl.id);
			}
		}
		else {
			// variable declaration without an init, e.g.:
			// let x;

			if (decl.id.type !== "Identifier") {
				continue;
			}

			block(decl.id);
		}
	}
}

function findDestructuredVariables(
	node: AST.BindingPattern | AST.BindingRestElement | null | undefined,
	block: (node: AST.Node & { type: "Identifier" }) => void,
) {
	switch (node?.type) {
		case "Identifier":
			// we don't make any effort to understand where values come from when using object or
			// array destructuring patterns - it's enough to know the exported names
			block(node);
			break;

		case "AssignmentPattern":
			findDestructuredVariables(node.left, block);
			break;

		case "ObjectPattern":
			for (const prop of node.properties) {
				findDestructuredVariables(prop.value, block);
			}

			break;

		case "ArrayPattern":
			for (const elem of node.elements) {
				const arg = elem?.type === "RestElement" ? elem.argument : elem;
				findDestructuredVariables(arg, block);
			}

			break;
	}
}

function isBindingPattern(node: AST.Node): node is AST.ObjectPattern | AST.ArrayPattern {
	const { type } = node;
	return (
		type === "ObjectPattern" ||
		type === "ArrayPattern"
	);
}

function isTypeScriptNode(node: AST.Node): node is AST.Node & { type: `TS${string}` } {
	return node.type.startsWith("TS");
}

const convertToMutableVariable: TransformBlock = (originalCode, start) => {
	const match = /^\s*const\s+/.exec(originalCode);
	if (!match) {
		return null;
	}

	const removed = match[0].length;
	return {
		newCode: "let " + originalCode.slice(removed),
		edits: [
			{
				at: start,
				delta: -removed,
			},
			{
				at: start + removed,
				delta: 4,
			},
		],
	};
};

const assignToMutableVariable = (name: string): TransformBlock => (originalCode, start, end) => {
	return {
		newCode: `let ${name} = (${originalCode});`,
		edits: [
			{
				at: start,
				delta: name.length + 8,
			},
			{
				at: end,
				delta: 2,
			},
		],
	};
};

const renameOverloadedFunction = (newName: string): TransformBlock => (originalCode, start) => {
	const match = /^(\s*function\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)(?=[(<\s])/.exec(originalCode);
	if (!match) {
		return null;
	}

	const offset = match[1].length;
	const removed = match[2].length;
	return {
		newCode: match[1] + newName + originalCode.slice(offset + removed),
		edits: [
			{
				at: start + offset,
				delta: -removed,
			},
			{
				at: start + offset + removed,
				delta: newName.length,
			},
		],
	};
};

const removeExport: TransformBlock = (originalCode, start) => {
	const match = /^\s*export(\s+default)?\s+/.exec(originalCode);
	if (!match) {
		return null;
	}

	const removed = match[0].length;
	return {
		newCode: originalCode.slice(removed),
		edits: [
			{
				at: start,
				delta: -removed,
			},
		],
	};
};

const removeNode: TransformBlock = (originalCode, start) => ({
	newCode: "",
	edits: [
		{
			at: start,
			delta: -originalCode.length,
		},
	],
});

const appendCode = (code: string): TransformBlock => (originalCode, _start, end) => {
	return {
		newCode: originalCode + code,
		edits: [
			{
				at: end,
				delta: code.length,
			},
		],
	};
};
