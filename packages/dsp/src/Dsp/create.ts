import type { Dsp } from "."
import { symbol } from "./symbol"

export function create(): Dsp {
    return {
        dsps: undefined,
        [symbol]: false,
        vals: undefined,
    }
}
