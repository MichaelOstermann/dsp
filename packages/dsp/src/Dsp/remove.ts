import type { Dsp } from "."
import { find } from "./find"
import { unlink } from "./unlink"

export function remove(disposer: Dsp, value: (() => void) | Dsp): void {
    const link = find(disposer, value)
    if (link) unlink(link)
}
