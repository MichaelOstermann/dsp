import type { DspLink } from "./types"
import { unlinkDsp, unlinkVal } from "./internals"

export function unlink(link: DspLink | undefined): void {
    if (!link) return
    unlinkVal(link)
    unlinkDsp(link)
}
