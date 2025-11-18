import type { Dsp } from "."
import { unlinkVal } from "./internals"
import { symbol } from "./symbol"

type DisposeStack =
    | undefined
    | { dsp: Dsp, prev: DisposeStack }

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
