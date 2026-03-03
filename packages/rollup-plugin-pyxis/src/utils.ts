import * as path from "node:path";

import type { PluginContext, PluginContextResolveOptions } from "rolldown";

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
	(source: string, importer?: string): Promise<boolean>;
}

export async function createModuleChecker(context: PluginContext, moduleNames: string[]): Promise<ModuleChecker> {
	const relevantIds = new Set(moduleNames);
	await Promise.all(moduleNames.map(async source => {
		const id = await resolveId(context, source);
		id && relevantIds.add(id);
	}));

	const cachedResults = new Map<string, boolean>();
	return async (source, importer) => {
		const trimmed = trimQuery(source);

		let result = cachedResults.get(trimmed);
		if (result !== undefined) {
			return result;
		}

		if (relevantIds.has(trimmed)) {
			result = true;
		}
		else {
			const id = await resolveId(context, source, importer);
			result = id
				? relevantIds.has(id)
				: false;
		}

		cachedResults.set(trimmed, result);
		return result;
	};
}

const defaultResolveOptions: PluginContextResolveOptions = {
	isEntry: false,
	kind: "import-statement",
};

export async function resolveId(context: PluginContext, source: string, importer?: string, options?: PluginContextResolveOptions) {
	const resolved = await resolve(context, source, importer, options);
	return resolved?.id ?? null;
}

export async function resolve(context: PluginContext, source: string, importer?: string, options: PluginContextResolveOptions = defaultResolveOptions) {
	const resolved = await context.resolve(source, importer, options);
	return resolved
		? {
			...resolved,
			id: trimQuery(resolved.id),
		}
		: null;
}

export function trimQuery(url: string) {
	return url.replace(/\?.*$/, "");
}
