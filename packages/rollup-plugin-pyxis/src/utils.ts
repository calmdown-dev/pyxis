import * as Path from "node:path";

export function normalizePath(moduleId: string) {
	return Path.posix.normalize(moduleId.replace(/\\/g, '/'));
}

export function trimQuery(url: string) {
	return url.replace(/\?.*$/, "");
}
