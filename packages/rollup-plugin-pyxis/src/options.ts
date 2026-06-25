import type { CSSModulesConfig, TransformOptions } from "lightningcss";

export interface PyxisPluginOptions {
	/**
	 * The name of the Pyxis module.
	 * @default "@calmdown/pyxis"
	 */
	pyxisModule?: string;

	/**
	 * Regular expression(s) matching file paths of source files to process.
	 * @default /\.[cm]?[jt]sx?$/i
	 */
	include?: RegExp | RegExp[];

	/**
	 * Regular expression(s) matching file paths to exclude from processing.
	 * @default undefined
	 */
	exclude?: RegExp | RegExp[];

	/**
	 * Whether to apply transformations to enable hot module replacement (HMR) with Vite dev server.
	 * @default false
	 */
	hmr?: boolean;

	/**
	 * Whether to enable transformations for CSS modules. A string may be passed to specify a glob
	 * to match CSS module files.
	 *
	 * Note that to use this feature, the optional `lightningcss` dependency **must be installed**.
	 * @default false
	 */
	cssModules?: PyxisCssModulesOptions | null | boolean;
}

export interface PyxisCssModulesOptions {
	/**
	 * Regular expression(s) matching file paths to consider as CSS sources.
	 * @default /\.css$/i
	 */
	include?: RegExp | RegExp[];

	/**
	 * Regular expression(s) matching file paths NOT to consider as CSS sources.
	 * @default undefined
	 */
	exclude?: RegExp | RegExp[];

	/**
	 * Regular expression(s) matching CSS sources to consider as CSS modules.
	 * @default /\.module\.css$/i
	 */
	modules?: RegExp | RegExp[];

	/**
	 * The prefix of the `ClassListExtension` to rewrite class names for.
	 * @default "cl"
	 */
	cssExtensionPrefix?: string;

	/**
	 * Custom Lightning CSS option overrides.
	 * @default {}
	 */
	lightningcss?: Omit<TransformOptions<any>, "code" | "cssModules" | "filename" | "projectRoot" | "sourceMap"> & {
		cssModules?: CSSModulesConfig | true;
	};
}

/** @internal */
export type ResolvedPyxisPluginOptions = ReturnType<typeof resolveOptions>;

/** @internal */
export function resolveOptions(options?: PyxisPluginOptions) {
	const cssModules = toObject(options?.cssModules);
	return {
		pyxisModule: options?.pyxisModule ?? "@calmdown/pyxis",
		include: toArray(options?.include, /\.[cm]?[jt]sx?$/i),
		exclude: toArray(options?.exclude),
		hmr: options?.hmr ?? false,
		cssModules: cssModules && {
			include: toArray(cssModules.include, /\.css$/i),
			exclude: toArray(cssModules.exclude),
			modules: toArray(cssModules.modules, /\.module\.css$/i),
			cssExtensionPrefix: cssModules.cssExtensionPrefix ?? "cl",
			lightningcss: cssModules.lightningcss ?? {},
		},
	} satisfies PyxisPluginOptions;
}

function toObject<T>(value: T | boolean | undefined) {
	switch (typeof value) {
		case "boolean":
			return value ? {} as T : null;

		case "object":
			return value;

		default:
			return null;
	}
}

function toArray<T>(value: T | T[] | undefined, defaultValue?: T) {
	return value === undefined
		? defaultValue === undefined
			? []
			: [ defaultValue ]
		: Array.isArray(value)
			? value
			: [ value ];
}
