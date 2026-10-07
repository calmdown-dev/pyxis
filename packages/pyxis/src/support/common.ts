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
