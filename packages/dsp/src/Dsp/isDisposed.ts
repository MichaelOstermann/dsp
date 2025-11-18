import type { Dsp } from "."
import { symbol } from "./symbol"

export function isDisposed(target: Dsp): boolean {
    return target[symbol]
}
