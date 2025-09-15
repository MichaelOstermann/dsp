import { describe, expect, it } from "vitest"
import { dspCreate, dspIs } from "../src"

describe("dspIs", () => {
    it("should return true for dsp instances", () => {
        const dsp = dspCreate()
        expect(dspIs(dsp)).toBe(true)
    })

    it("should return false for anything else", () => {
        expect(dspIs(null)).toBe(false)
        expect(dspIs(undefined)).toBe(false)
        expect(dspIs(1)).toBe(false)
        expect(dspIs("string")).toBe(false)
        expect(dspIs({})).toBe(false)
        expect(dspIs([])).toBe(false)
    })
})
