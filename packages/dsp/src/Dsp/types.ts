import { symbol } from "./symbol"

export interface Dsp {
    [symbol]: boolean
    dsps: DspLink | undefined
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
