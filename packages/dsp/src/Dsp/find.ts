import type { Dsp, DspLink } from "./types"

export function find(target: Dsp, value: (() => void) | Dsp): DspLink | undefined {
    let link = target.vals
    while (link) {
        if (link.val === value) return link
        link = link.prevVal
    }
    return link
}
