import * as Path from "node:path";

import type { PluginContext, PluginContextResolveOptions, ResolvedId } from "rolldown";
import type { Plugin } from "vite";

import type { ResolvedPyxisPluginOptions } from "./options";
import { normalizePath, trimQuery } from "./utils";

export interface ResolverCall {
	source: string;
	importer?: string;
	options?: PluginContextResolveOptions;
}

export interface PyxisModuleFilter {
	include: RegExp[];
	exclude: RegExp[];
	virtualExt?: string;
}

export interface PyxisModuleEntry {
	readonly resolved: ResolvedId;
	readonly originalPath: string;
	readonly relativePath: string;
	readonly virtualPath: string;
	readonly tags: WeakSet<WeakKey>;
}

export class PyxisLoader {
	public readonly plugin: Plugin;
	public rootDir: string = process.cwd();
	public isVite: boolean = false;
	public isDevServer: boolean = false;
	public isHotReload: boolean = false;

	private readonly resolverCache = new Map<string, PyxisModuleEntry>();
	private readonly pyxisModuleIds = new Set<string>();
	private readonly filters: (PyxisModuleFilter & { tag: WeakKey })[] = [];
	private viteCacheDir?: string;
	private context!: PluginContext;

	public constructor(options: ResolvedPyxisPluginOptions) {
		const self = this;

		this.plugin = {
			name: PyxisLoader.name,
			enforce: "pre",
			config(config) {
				// Vite-only hook
				self.isVite = true;

				const oxc = config.oxc;
				if (oxc === false) {
					return config;
				}

				const jsx = oxc?.jsx;
				if (jsx !== undefined && typeof jsx !== "object") {
					return config;
				}

				return {
					...config,
					oxc: {
						...oxc,
						jsx: {
							...jsx,
							importSource: options.pyxisModule,
						},
					},
				};
			},
			options(config) {
				// Rollup, Rolldown, Vite hook
				if (self.isVite) {
					return config;
				}

				if (config.cwd) {
					self.rootDir = Path.resolve(config.cwd);
				}

				return config;
			},
			configResolved(viteConfig) {
				// Vite-only hook
				self.rootDir = viteConfig.root;
				self.isDevServer = !viteConfig.isProduction;
				self.isHotReload = !!viteConfig.server.hmr;
				self.viteCacheDir = viteConfig.cacheDir;
			},
			async buildStart(inputOptions) {
				// Rollup, Rolldown, Vite hook
				self.rootDir ??= inputOptions.cwd ?? process.cwd();
				self.context = this;

				// pre-resolve Pyxis imports
				const moduleIds = [
					options.pyxisModule,
					`${options.pyxisModule}/core`,
					`${options.pyxisModule}/core-dev`,
					`${options.pyxisModule}/jsx-runtime`,
					`${options.pyxisModule}/jsx-dev-runtime`,
				];

				await Promise.all(
					moduleIds.map(async source => {
						self.pyxisModuleIds.add(source);

						const id = await self.resolveId({ source });
						id && self.pyxisModuleIds.add(id);
					}),
				);
			},
			resolveId: {
				order: "pre",
				async handler(source, importer, options) {
					if (importer !== undefined) {
						// importer should be a previously resolved path, so it should be cached
						const importerHit = self.resolverCache.get(trimQuery(importer));
						if (importerHit) {
							importer = importerHit.originalPath;
						}
					}

					// let the bundler resolve it
					const result = await this.resolve(source, importer, {
						...options,
						skipSelf: true,
					});

					if (!result) {
						return null;
					}

					// check cache
					const originalPath = trimQuery(result.id);
					const sourceHit = self.resolverCache.get(originalPath);
					if (sourceHit) {
						return sourceHit.resolved;
					}

					// match filters
					if (self.isVite && originalPath.startsWith(self.viteCacheDir!)) {
						return result;
					}

					const relativePathRaw = Path.relative(self.rootDir, originalPath);
					const isWithinRoot = (
						relativePathRaw &&
						!relativePathRaw.startsWith("..") &&
						!relativePathRaw.startsWith(".vite") &&
						!Path.isAbsolute(relativePathRaw)
					);

					if (!isWithinRoot) {
						return result;
					}

					const matchesRegExp = (pattern: RegExp) => pattern.test(originalPath);
					const matchesFilter = (filter: PyxisModuleFilter) => filter.include.some(matchesRegExp) && !filter.exclude.some(matchesRegExp);
					const matchingFilters = self.filters.filter(matchesFilter);
					if (matchingFilters.length === 0) {
						return result;
					}

					// build virtual override
					const relativePath = normalizePath(relativePathRaw);
					const virtualExt = matchingFilters.reduce((ext, filter) => filter.virtualExt ?? ext, "");
					const virtualPath = self.isVite
						? normalizePath(Path.join(self.rootDir, `${__VIRTUAL_DIR__}/${relativePath}${virtualExt}`))
						: relativePath;

					const override: ResolvedId = {
						...result,
						id: virtualPath,
					};

					const entry: PyxisModuleEntry = {
						resolved: override,
						tags: matchingFilters.reduce((tags, filter) => (tags.add(filter.tag), tags), new WeakSet()),
						originalPath,
						relativePath,
						virtualPath,
					};

					self.resolverCache.set(virtualPath, entry);
					self.resolverCache.set(originalPath, entry);
					return override;
				},
			},
			load: {
				order: "pre",
				handler(moduleId) {
					const entry = self.resolverCache.get(trimQuery(moduleId));
					if (!entry) {
						return null;
					}

					if (self.isHotReload) {
						this.addWatchFile(entry.originalPath);
					}

					// FUTURE: detect encoding first?
					return this.fs.readFile(entry.originalPath, { encoding: "utf8" });
				},
			},
			handleHotUpdate({ file, server, modules }) {
				const entry = self.resolverCache.get(trimQuery(file));
				if (entry) {
					const virtualModule = server.moduleGraph.getModuleById(entry.virtualPath);
					if (virtualModule) {
						return [ virtualModule ];
					}
				}

				return modules;
			},
		};
	}


	public addFilter(filter: PyxisModuleFilter): WeakKey {
		const tag: WeakKey = {};
		this.filters.push({ ...filter, tag });

		return tag;
	}

	public async resolve(call: ResolverCall) {
		const { source } = call;

		const hit = this.resolverCache.get(trimQuery(source));
		if (hit) {
			return Promise.resolve(hit.resolved);
		}

		let importer = call.importer;
		if (importer !== undefined) {
			// importer should be a previously resolved path, so it should be cached
			const importerHit = this.resolverCache.get(trimQuery(importer));
			if (importerHit) {
				importer = importerHit.originalPath;
			}
		}

		return this.context.resolve(source, importer, {
			...call.options,
			skipSelf: false,
		});
	}

	public async resolveId(call: ResolverCall) {
		const result = await this.resolve(call);
		return result?.id ?? null;
	}

	public async isPyxisModule(call: ResolverCall) {
		if (this.pyxisModuleIds.has(call.source)) {
			return true;
		}

		const id = await this.resolveId(call);
		return id === null
			? false
			: this.pyxisModuleIds.has(id);
	}

	public peek(moduleId: string) {
		return this.resolverCache.get(trimQuery(moduleId)) ?? null;
	}

	public load(options: Parameters<PluginContext["load"]>[0]) {
		return this.context.load(options);
	}


	public static readonly name = `${__THIS_PLUGIN__}:loader`;
}
