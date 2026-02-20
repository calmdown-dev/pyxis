import { pyxisHmrResolvePlugin } from "~/plugins/resolve/ResolvePlugin";
import { pyxisHmrTransformPlugin } from "~/plugins/transform/TransformPlugin";
import type { PyxisHmrPluginOptions } from "~/types";

export function pyxisHotReload(pluginOptions?: PyxisHmrPluginOptions) {
	const normalizedOptions: Required<PyxisHmrPluginOptions> = {
		pyxisModule: "@calmdown/pyxis",
		exclude: [],
		...pluginOptions,
	};

	return [
		pyxisHmrResolvePlugin(normalizedOptions),
		pyxisHmrTransformPlugin(normalizedOptions),
	];
}
