import type { Dsp, DspLink } from "./types"
import { dispose } from "./dispose"
import { createLink, linkDsp, linkVal } from "./internals"
import { symbol } from "./symbol"

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
