import type { Dsp } from "."
import { unlinkVal } from "./internals"
import { symbol } from "./symbol"

type DisposeStack =
    | undefined
    | { dsp: Dsp, prev: DisposeStack }

/**
 * # Dispose
 *
 * ```ts
 * function Dsp.dispose(disposer: Dsp): void;
 * ```
 *
 * Takes a `Dsp` instance and disposes it, walking through all added values in reverse order (LIFO).
 *
 * Disposed `Dsp`s will dereference themselves from other `Dsp`s.
 *
 * Every added value is wrapped with a `try/catch` and errors are accumulated in an `AggregateError`.
 *
 * ## Example
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dspA = Dsp.create();
 * Dsp.add(dspA, () => console.log(1));
 * Dsp.add(dspA, () => console.log(2));
 *
 * Dsp.dispose(dspA); // Prints: 2, 1
 * ```
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dspA = Dsp.create();
 * const dspB = Dsp.create();
 *
 * Dsp.add(dspA, () => console.log(1));
 * Dsp.add(dspA, () => console.log(2));
 * Dsp.add(dspB, () => console.log(3));
 * Dsp.add(dspB, () => console.log(4));
 * Dsp.add(dspA, dspB);
 *
 * Dsp.dispose(dspA); // Prints: 4, 3, 2, 1
 * ```
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dspA = Dsp.create();
 * const dspB = Dsp.create();
 *
 * Dsp.add(dspA, () => console.log(1));
 * Dsp.add(dspA, () => console.log(2));
 * Dsp.add(dspB, () => console.log(3));
 * Dsp.add(dspB, () => console.log(4));
 * Dsp.add(dspA, dspB);
 *
 * Dsp.dispose(dspB); // Prints: 4, 3
 * Dsp.dispose(dspA); // Prints: 2, 1
 * ```
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dspA = Dsp.create();
 *
 * Dsp.add(dspA, () => console.log(1));
 * Dsp.add(dspA, () => console.log(2));
 * Dsp.add(dspA, () => {
 *     throw new Error();
 * });
 *
 * Dsp.dispose(dspA); // Prints: 2, 1, then rethrows above error
 * ```
 *
 * ```ts
 * import { Dsp } from "@monstermann/dsp";
 *
 * const dspA = Dsp.create();
 *
 * Dsp.add(dspA, () => console.log(1));
 * Dsp.add(dspA, () => console.log(2));
 * Dsp.add(dspA, () => {
 *     throw new Error();
 * });
 * Dsp.add(dspA, () => {
 *     throw new Error();
 * });
 *
 * Dsp.dispose(dspA); // Prints: 2, 1, then throws AggregateError
 * ```
 *
 */
export function dispose(target: Dsp): void {
    let errors: unknown[] | undefined
    let stack: DisposeStack = { dsp: target, prev: undefined }
    let dsp: Dsp | undefined = target

    while (dsp) {
        dsp[symbol] = true

        while (dsp.dsps) {
            unlinkVal(dsp.dsps)
            dsp.dsps = dsp.dsps.prevDsp
        }

        while (dsp.vals) {
            const val: Dsp | (() => void) = dsp.vals.val
            dsp.vals = dsp.vals.prevVal
            if (symbol in val) {
                stack = { dsp: val, prev: stack }
                dsp = val
            }
            else {
                try {
                    val()
                }
                catch (err) {
                    errors ??= []
                    errors.push(err)
                }
            }
        }

        stack = stack?.prev
        dsp = stack?.dsp
    }

    if (!errors) return
    if (errors.length === 1) throw errors[0]
    throw new AggregateError(errors, "DisposeError")
}
