import type { Dsp } from "."
import { symbol } from "./symbol"

export function isDsp(value: unknown): value is Dsp {
    return value != null && typeof value === "object" && symbol in value
}
