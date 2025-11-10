import type { Dsp } from "./types"
import { symbol } from "./symbol"

export function isDisposed(target: Dsp): boolean {
    return target[symbol]
}
