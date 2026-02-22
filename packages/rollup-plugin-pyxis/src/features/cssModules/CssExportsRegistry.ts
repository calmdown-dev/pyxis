import type { PluginContext } from "rolldown";

import { resolveId, trimQuery } from "~/utils";

export type CssExportsMap = { [CN in string]?: string };

export class CssExportsRegistry {
	private readonly mappings = new Map<string, CssExportsMap>();

	public upsertExports(moduleId: string, exportsMap: CssExportsMap) {
		this.mappings.set(
			trimQuery(moduleId),
			exportsMap,
		);
	}

	public async getExports(context: PluginContext, moduleId: string, importer?: string) {
		let id: string | null = trimQuery(moduleId);
		let map;

		if (map = this.mappings.get(id)) {
			return map;
		}

		id = await resolveId(context, moduleId, importer);
		if (!id) {
			return CssExportsRegistry.NO_EXPORTS;
		}

		if (map = this.mappings.get(id)) {
			return map;
		}

		await context.load({
			id,
			resolveDependencies: false,
		});

		return this.mappings.get(id) ?? CssExportsRegistry.NO_EXPORTS;
	}

	public static readonly NO_EXPORTS = {};
}
