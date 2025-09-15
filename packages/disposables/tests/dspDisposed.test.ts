import { describe, expect, it } from "vitest"
import { dspCreate, dspDispose, dspDisposed } from "../src"

describe("dspDisposed", () => {
    it("should return true for disposed dsp instances", () => {
        const dsp = dspCreate()
        dspDispose(dsp)
        expect(dspDisposed(dsp)).toBe(true)
    })

    it("should return false for alive dsp instances", () => {
        const dsp = dspCreate()
        expect(dspDisposed(dsp)).toBe(false)
    })
})
