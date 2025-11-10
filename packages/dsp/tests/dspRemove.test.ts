import { describe, expect, it } from "vitest"
import { dspCreate, dspLink, dspRemove } from "../src"

describe("dspRemove", () => {
    it("should remove callbacks", () => {
        const dsp = dspCreate()

        const cb1 = () => {}
        const cb2 = () => {}
        const cb3 = () => {}

        const l1 = dspLink(dsp, cb1)
        const l2 = dspLink(dsp, cb2)
        const l3 = dspLink(dsp, cb3)

        dspRemove(dsp, cb2)
        expect(l2.nextVal).toBe(undefined)
        expect(l2.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(l3)
        expect(l3.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        dspRemove(dsp, cb3)
        expect(l3.nextVal).toBe(undefined)
        expect(l3.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        dspRemove(dsp, cb1)
        expect(l1.nextVal).toBe(undefined)
        expect(l1.prevVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should remove dsps #1", () => {
        const dsp = dspCreate()

        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        const dsp3 = dspCreate()

        const l1 = dspLink(dsp, dsp1)
        const l2 = dspLink(dsp, dsp2)
        const l3 = dspLink(dsp, dsp3)

        dspRemove(dsp, dsp2)
        expect(dsp2.dsps).toBe(undefined)
        expect(l2.nextVal).toBe(undefined)
        expect(l2.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(l3)
        expect(l3.prevVal).toBe(l1)
        expect(dsp.vals).toBe(l3)

        dspRemove(dsp, dsp3)
        expect(dsp3.dsps).toBe(undefined)
        expect(l3.nextVal).toBe(undefined)
        expect(l3.prevVal).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(l1)

        dspRemove(dsp, dsp1)
        expect(dsp1.dsps).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
    })

    it("should remove dsps #2", () => {
        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        const dsp3 = dspCreate()

        const dsp = dspCreate()

        const l1 = dspLink(dsp1, dsp)
        const l2 = dspLink(dsp2, dsp)
        const l3 = dspLink(dsp3, dsp)

        dspRemove(dsp2, dsp)
        expect(l2.nextDsp).toBe(undefined)
        expect(l2.prevDsp).toBe(undefined)
        expect(l1.nextDsp).toBe(l3)
        expect(l3.prevDsp).toBe(l1)
        expect(dsp2.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l3)

        dspRemove(dsp3, dsp)
        expect(l3.nextDsp).toBe(undefined)
        expect(l3.prevDsp).toBe(undefined)
        expect(l1.nextDsp).toBe(undefined)
        expect(dsp3.vals).toBe(undefined)
        expect(dsp.dsps).toBe(l1)

        dspRemove(dsp1, dsp)
        expect(l1.nextDsp).toBe(undefined)
        expect(dsp1.vals).toBe(undefined)
        expect(dsp.dsps).toBe(undefined)
    })
})
