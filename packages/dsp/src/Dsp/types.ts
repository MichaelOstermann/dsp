import type { symbol } from "./symbol"

export interface Dsp {
    dsps: DspLink | undefined
    [symbol]: boolean
    vals: DspLink | undefined
}

export interface DspLink {
    disposer: Dsp
    nextDsp: DspLink | undefined
    nextVal: DspLink | undefined
    prevDsp: DspLink | undefined
    prevVal: DspLink | undefined
    val: (() => void) | Dsp
}
