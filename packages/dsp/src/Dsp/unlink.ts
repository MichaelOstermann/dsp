import type { DspLink } from "."
import { unlinkDsp, unlinkVal } from "./internals"

export function unlink(link: DspLink | undefined): void {
    if (!link) return
    unlinkVal(link)
    unlinkDsp(link)
}
