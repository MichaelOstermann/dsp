import { describe, expect, it } from "vitest"
import { dspCreate, dspFind, dspLink } from "../src"

describe("dspFind", () => {
    it("should return undefined for missing callbacks", () => {
        const dsp = dspCreate()
        expect(dspFind(dsp, () => {})).toBe(undefined)
    })

    it("should return undefined for missing dsps", () => {
        const dsp = dspCreate()
        expect(dspFind(dsp, dspCreate())).toBe(undefined)
    })

    it("should return link for included callbacks", () => {
        const dsp = dspCreate()
        const cb = () => {}
        const link = dspLink(dsp, cb)
        expect(dspFind(dsp, cb)).toBe(link)
    })

    it("should return link for included dsps", () => {
        const dspA = dspCreate()
        const dspB = dspCreate()
        const link = dspLink(dspA, dspB)
        expect(dspFind(dspA, dspB)).toBe(link)
    })
})
