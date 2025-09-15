import { describe, expect, it } from "vitest"
import { dspCreate, dspIncludes, dspLink } from "../src"

describe("dspIncludes", () => {
    it("should return false for missing callbacks", () => {
        const dsp = dspCreate()
        expect(dspIncludes(dsp, () => {})).toBe(false)
    })

    it("should return false for missing dsps", () => {
        const dsp = dspCreate()
        expect(dspIncludes(dsp, dspCreate())).toBe(false)
    })

    it("should return true for included callbacks", () => {
        const dsp = dspCreate()
        const cb = () => {}
        dspLink(dsp, cb)
        expect(dspIncludes(dsp, cb)).toBe(true)
    })

    it("should return true for included dsps", () => {
        const dspA = dspCreate()
        const dspB = dspCreate()
        dspLink(dspA, dspB)
        expect(dspIncludes(dspA, dspB)).toBe(true)
        expect(dspIncludes(dspB, dspA)).toBe(false)
    })
})
