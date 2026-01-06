import type { Dsp } from "."
import { find } from "./find"

/**
 * # dspIncludes
 *
 * ```ts
 * function Dsp.includes(disposer: Dsp, value: (() => void) | Dsp): boolean;
 * ```
 *
 * `O(n)`
 *
 * Returns a boolean indicating whether the provided `Dsp` instance includes `value`.
 *
 * By default `add` does not check for duplicates, you can use this or `find` if you need to make sure there are none.
 *
 * ## Example
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dsp = Dsp.create();
 * const cb = () => {};
 *
 * Dsp.includes(dsp, cb); // false
 * const link = Dsp.add(dsp, cb);
 * Dsp.includes(dsp, cb); // true
 * Dsp.unlink(dsp, link);
 * Dsp.includes(dsp, cb); // false
 * ```
 *
 */
export function includes(target: Dsp, value: (() => void) | Dsp): boolean {
    return !!find(target, value)
}
