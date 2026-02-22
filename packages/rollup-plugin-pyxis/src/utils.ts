import * as path from "node:path";

import type { PluginContext } from "rolldown";

export function getShortModuleId(root: string, moduleId: string) {
	const relative = path.relative(root, moduleId).replace(/\\/g, "/");
	return path.posix.normalize(relative);
}

export function isPathWithin(root: string, moduleId: string) {
	const relative = path.relative(root, moduleId);
	return (
		relative &&
		!relative.startsWith("..") &&
		!path.isAbsolute(relative)
	);
}

export interface ModuleChecker {
	(source: string): boolean;
}

export async function createModuleChecker(this: PluginContext, moduleName: string, subImports?: string[]): Promise<ModuleChecker> {
	const sources = [ moduleName ];
	if (subImports) {
		sources.push(...subImports.map(it => `${moduleName}/${it}`));
	}

	const resolved = (
		await Promise.all(
			sources.map(async it => (await this.resolve(it))?.id!),
		)
	)
	.filter(Boolean);

	return source => (
		sources.includes(source) ||
		(/^\/@fs\/|^file:\/\//.test(source) && resolved.some(it => source.includes(it)))
	);
}
