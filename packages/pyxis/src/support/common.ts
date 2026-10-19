import type { ArgsMax3, Callback } from "./types";

/**
 * Invokes a Callback passing stored arguments and forwarding the return value.
 * @internal
 */
export function invoke<TArgs extends ArgsMax3, TReturn>(callback: Callback<TArgs, TReturn>): TReturn;
export function invoke(callback: Callback<ArgsMax3>) {
	return callback.$fn(
		callback.$a0,
		callback.$a1,
		callback.$a2,
	);
}

/**
 * Does absolutely nothing.
 */
export function noop() {}

/**
 * Re-throws a list of collected errors.
 */
export function rethrow(errors: readonly unknown[] | null | undefined) {
	if (errors) {
		if (errors.length > 1) {
			throw new AggregateError(errors);
		}

		if (errors.length === 1) {
			throw errors[0];
		}
	}
}

/**
 * A plain, empty object (cast to any) internal to Pyxis, guaranteed to never equal any value
 * arriving from user code.
 */
export const UNIQUE_VALUE: any = Object.create(null);
