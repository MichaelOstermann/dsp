import { describe, expect, it } from "vitest"
import { dspCreate, dspLink, dspUnlink } from "../src"

describe("dspUnlink", () => {
    it("should unlink callbacks", () => {
        const dsp = dspCreate()

        const l1 = dspLink(dsp, () => {})
        const l2 = dspLink(dsp, () => {})
        const l3 = dspLink(dsp, () => {})

        dspUnlink(l2)
        expect(l2.nextVal).toBe(undefined)
        expect(l2.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(l3)
        expect(l3.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        dspUnlink(l3)
        expect(l3.nextVal).toBe(undefined)
        expect(l3.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        dspUnlink(l1)
        expect(l1.nextVal).toBe(undefined)
        expect(l1.prevVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should unlink dsps #1", () => {
        const dsp = dspCreate()

        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        const dsp3 = dspCreate()

        const l1 = dspLink(dsp, dsp1)
        const l2 = dspLink(dsp, dsp2)
        const l3 = dspLink(dsp, dsp3)

        dspUnlink(l2)
        expect(dsp2.dsps).toBe(undefined)
        expect(l2.nextVal).toBe(undefined)
        expect(l2.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(l3)
        expect(l3.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        dspUnlink(l3)
        expect(dsp3.dsps).toBe(undefined)
        expect(l3.nextVal).toBe(undefined)
        expect(l3.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        dspUnlink(l1)
        expect(dsp1.dsps).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should unlink dsps #2", () => {
        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        const dsp3 = dspCreate()

        const dsp = dspCreate()

        const l1 = dspLink(dsp1, dsp)
        const l2 = dspLink(dsp2, dsp)
        const l3 = dspLink(dsp3, dsp)

        dspUnlink(l2)
        expect(l2.nextDsp).toBe(undefined)
        expect(l2.prevDsp).toBe(undefined)
        expect(l1.nextDsp).toBe(l3)
        expect(l3.prevDsp).toBe(l1)
        expect(dsp2.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l3)

        dspUnlink(l3)
        expect(l3.nextDsp).toBe(undefined)
        expect(l3.prevDsp).toBe(undefined)
        expect(l1.nextDsp).toBe(undefined)
        expect(dsp3.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l1)

        dspUnlink(l1)
        expect(l1.nextDsp).toBe(undefined)
        expect(dsp1.vals).toBe(undefined)
        expect(dsp.dsps).toBe(undefined)
    })
})
