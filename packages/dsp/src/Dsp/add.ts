import type { Dsp, DspLink } from "."
import { dispose } from "./dispose"
import { createLink, linkDsp, linkVal } from "./internals"
import { symbol } from "./symbol"

/**
 * # add
 *
 * ```ts
 * function Dsp.add(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined;
 * ```
 *
 * Takes a Dsp instance and attaches a callback or another Dsp.
 *
 * Returns a data-structure that can be passed to `unlink` for fast `O(1)` removals.
 *
 * Returns undefined if:
 *
 * - The target Dsp has already been disposed
 * - The provided Dsp has already been disposed
 * - The target Dsp is equal to the provided Dsp
 *
 * If the target Dsp is already disposed, the provided value will be immediately disposed if possible.
 *
 * ## Example
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dspA = Dsp.create();
 * const dspB = Dsp.create();
 *
 * Dsp.add(dspA, () => console.log(1));
 * Dsp.add(dspB, () => console.log(2));
 * Dsp.add(dspA, dspB);
 *
 * Dsp.dispose(dspA); // Prints: 2, 1
 *
 * Dsp.add(dspA, () => console.log(3)); // Prints: 3
 * Dsp.add(dspB, () => console.log(4)); // Prints: 4
 * ```
 *
 */
export function add(target: Dsp, value: (() => void) | Dsp): DspLink | undefined
export function add(a: Dsp, b: (() => void) | Dsp): DspLink | void {
    if (symbol in b) {
        if (a === b) return
        if (b[symbol]) return
        if (a[symbol]) return dispose(b)
        return linkDsp(b, linkVal(a, createLink(a, b)))
    }

    if (a[symbol]) return b()
    return linkVal(a, createLink(a, b))
}
