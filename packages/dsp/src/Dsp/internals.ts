import type { Dsp, DspLink } from "."
import { symbol } from "./symbol"

export function createLink(disposer: Dsp, val: (() => void) | Dsp): DspLink {
    return {
        disposer,
        nextDsp: undefined,
        nextVal: undefined,
        prevDsp: undefined,
        prevVal: undefined,
        val,
    }
}

export function linkVal(disposer: Dsp, link: DspLink): DspLink {
    link.prevVal = disposer.vals
    if (disposer.vals) disposer.vals.nextVal = link
    disposer.vals = link
    return link
}

export function linkDsp(disposer: Dsp, link: DspLink): DspLink {
    link.prevDsp = disposer.dsps
    if (disposer.dsps) disposer.dsps.nextDsp = link
    disposer.dsps = link
    return link
}

export function unlinkVal(link: DspLink): void {
    if (link.prevVal) link.prevVal.nextVal = link.nextVal
    if (link.nextVal) link.nextVal.prevVal = link.prevVal
    if (link.disposer.vals === link) link.disposer.vals = link.prevVal
    link.nextVal = link.prevVal = undefined
}

export function unlinkDsp(link: DspLink): void {
    if (symbol in link.val) {
        if (link.prevDsp) link.prevDsp.nextDsp = link.nextDsp
        if (link.nextDsp) link.nextDsp.prevDsp = link.prevDsp
        if (link.val.dsps === link) link.val.dsps = link.prevDsp
        link.nextDsp = link.prevDsp = undefined
    }
}
