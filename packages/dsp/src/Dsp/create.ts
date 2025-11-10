import type { Dsp } from "./types"
import { symbol } from "./symbol"

export function create(): Dsp {
    return {
        dsps: undefined,
        [symbol]: false,
        vals: undefined,
    }
}
