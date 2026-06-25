import type { PyxisLoader } from "~/PyxisLoader";

export type CssExportsMap = { [CN in string]?: string };

export class CssExportsRegistry {
	private readonly mappings = new Map<string, CssExportsMap>();

	public constructor(
		private readonly loader: PyxisLoader,
	) {}

	public upsertExports(moduleId: string, exportsMap: CssExportsMap) {
		this.mappings.set(moduleId, exportsMap);
	}

	public async getExports(moduleId: string, importer?: string) {
		let id: string | null = moduleId;
		let map;

		if (map = this.mappings.get(id)) {
			return map;
		}

		id = await this.loader.resolveId({
			source: moduleId,
			importer,
		});

		if (!id) {
			return null;
		}

		if (map = this.mappings.get(id)) {
			return map;
		}

		await this.loader.load({
			id: id,
			resolveDependencies: false,
		});

		return this.mappings.get(id) ?? null;
	}
}
