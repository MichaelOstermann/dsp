import type { Dsp } from "."
import { symbol } from "./symbol"

/**
 * # isDsp
 *
 * ```ts
 * function Dsp.isDsp(value: unknown): value is Dsp;
 * ```
 *
 * Checks whether the provided `value` is a `Dsp` instance.
 *
 * ## Example
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dsp = Dsp.create();
 * Dsp.isDsp(dsp); // true
 * ```
 *
 */
export function isDsp(value: unknown): value is Dsp {
    return value != null && typeof value === "object" && symbol in value
}
