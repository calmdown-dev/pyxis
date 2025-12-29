export function wrap<T>(input: T | T[]): T[] {
	return Array.isArray(input) ? input : [ input ];
}

/**
 * An empty array.
 */
export const EMPTY_ARRAY = Object.freeze([] as const);

/**
 * An empty object.
 */
export const EMPTY_OBJECT = Object.freeze({} as const);
