import type { Dsp } from "./types"
import { find } from "./find"

export function includes(target: Dsp, value: (() => void) | Dsp): boolean {
    return !!find(target, value)
}
