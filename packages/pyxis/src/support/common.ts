import type { ArgsMax2, Callback } from "./types";

/**
 * Invokes a Callback passing stored arguments and forwarding the return value.
 * @internal
 */
export function invoke<TArgs extends ArgsMax2, TReturn>(callback: Callback<TArgs, TReturn>): TReturn;
export function invoke(callback: Callback<ArgsMax2>) {
	return callback.$fn(
		callback.$a0,
		callback.$a1,
	);
}
