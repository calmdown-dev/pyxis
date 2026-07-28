// A TypeScript "bake" script capable of materializing complex types into flat interfaces.
// Usage: yarn bake-types <input> <output>
//
// Only types tagged with the @bake JSDoc tag will be baked.
// Any node tagged with the @preserve JSDoc tag will be preserved as-is into the output.
// All other nodes get dropped.

import * as FS from "node:fs/promises";
import * as Path from "node:path";

import * as TS from "typescript";

const INPUT = Path.resolve(process.argv[2]);
const OUTPUT = Path.resolve(process.argv[3]);


// load config
const configPath = TS.findConfigFile(Path.dirname(INPUT), TS.sys.fileExists);
if (!configPath) {
	throw new Error("could not find tsconfig");
}

const baseConfig = TS.readConfigFile(configPath, TS.sys.readFile);
if (baseConfig.error) {
	throw new Error(`could not read "${configPath}"`);
}

const config = TS.parseJsonConfigFileContent(baseConfig.config, TS.sys, Path.dirname(configPath), undefined, configPath);


// init program
const program = TS.createProgram([ INPUT ], config.options);
const checker = program.getTypeChecker();

const input = program.getSourceFile(INPUT);
if (!input) {
	throw new Error(`source file "${INPUT}" not found`);
}

const output = (await FS.open(OUTPUT, "w+")).createWriteStream({ encoding: "utf8" });
output.write(`\
// baked types, do not modify as changes will be lost
// source file: ${Path.relative(Path.dirname(OUTPUT), INPUT)}

`);

const flags =
	TS.TypeFormatFlags.NoTruncation |
	TS.TypeFormatFlags.MultilineObjectLiterals |
	TS.TypeFormatFlags.UseStructuralFallback |
	TS.TypeFormatFlags.InTypeAlias |
	TS.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;


function visit(node) {
	const tags = resolveTags(node);
	if (tags.isPreserved) {
		visitPreservedNode(node);
	}
	else if (tags.isBaked) {
		visitBakedNode(node, tags.extensions);
	}

	TS.forEachChild(node, visit);
}

function visitPreservedNode(node) {
	output.write(node.getText());
	output.write("\n\n");
}

function visitBakedNode(node, extensions) {
	if (!TS.isTypeAliasDeclaration(node)) {
		throw new Error("the @bake tag is only applicable to type aliases");
	}

	const type = checker.getTypeAtLocation(node);
	let typeStr = checker.typeToString(type, node, flags);

	// remove redundant `| undefined` unions
	typeStr = typeStr.replaceAll(/(\?:[^;]+?)\s*\|\s*undefined;/g, "$1;");

	// add newline since TS doesn't add it...
	// https://github.com/microsoft/TypeScript/pull/61349
	typeStr = typeStr.replaceAll(/(?<! ) {4}(?! )/g, "\n\t");

	// add newline before closing bracket
	typeStr = typeStr.replace(/\}$/, "\n}");

	// check if the type is exported
	const declaration = node.modifiers?.some(it => it.kind === TS.SyntaxKind.ExportKeyword)
		? "export interface"
		: "interface";

	// add extends clause, if specified
	let extension = "";
	if (extensions.length > 0) {
		extension = `extends ${extensions.join(", ")} `;
	}

	output.write(`${declaration} ${node.name.text} ${extension}`);
	output.write(typeStr);
	output.write("\n\n");
}

function resolveTags(node) {
	const jsdocTags = TS.getJSDocTags(node);
	const extensions = [];
	let isPreserved = false;
	let isBaked = false;

	for (const tag of jsdocTags) {
		switch (tag.tagName.text) {
			case "preserve":
				isPreserved = true;
				break;

			case "bake":
				isBaked = true;
				break;

			case "extends": {
				const ref = tag.class?.expression?.text;
				if (typeof ref === "string") {
					extensions.push(ref);
				}

				break;
			}
		}
	}

	if (isPreserved && isBaked) {
		throw new Error("the @bake and @preserve tags are mutually exclusive");
	}

	return {
		extensions,
		isPreserved,
		isBaked,
	};
}

visit(input);
