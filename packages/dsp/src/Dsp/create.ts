import type { Dsp } from "."
import { symbol } from "./symbol"

/**
 * # create
 *
 * ```ts
 * function Dsp.create(): Dsp;
 * ```
 *
 * Creates a new `Dsp` instance.
 *
 * ## Example
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dsp = Dsp.create();
 * ```
 *
 */
export function create(): Dsp {
    return {
        dsps: undefined,
        [symbol]: false,
        vals: undefined,
    }
}
