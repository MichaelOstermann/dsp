import { describe, expect, it, vi } from "vitest"
import { dspCreate, dspDispose, dspLink } from "../src"

describe("dspLink", () => {
    it("should link callbacks", () => {
        const dsp = dspCreate()

        const cb1 = () => {}
        const cb2 = () => {}

        const l1 = dspLink(dsp, cb1)
        expect(dsp.vals).toBe(l1)
        expect(l1.val).toBe(cb1)
        expect(l1.disposer).toBe(dsp)
        expect(l1.nextDsp).toBe(undefined)
        expect(l1.prevDsp).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(l1.prevVal).toBe(undefined)

        const l2 = dspLink(dsp, cb2)
        expect(dsp.vals).toBe(l2)
        expect(l2.val).toBe(cb2)
        expect(l2.nextDsp).toBe(undefined)
        expect(l2.prevDsp).toBe(undefined)
        expect(l2.nextVal).toBe(undefined)
        expect(l2.prevVal).toBe(l1)
        expect(l1.nextVal).toBe(l2)
    })

    it("should link dsps #1", () => {
        const dsp = dspCreate()
        const dsp1 = dspCreate()
        const dsp2 = dspCreate()

        const l1 = dspLink(dsp, dsp1)
        expect(dsp.vals).toBe(l1)
        expect(dsp.vals).toBe(l1)
        expect(dsp1.dsps).toBe(l1)
        expect(l1.val).toBe(dsp1)
        expect(l1.disposer).toBe(dsp)
        expect(l1.nextDsp).toBe(undefined)
        expect(l1.prevDsp).toBe(undefined)
        expect(l1.nextVal).toBe(undefined)
        expect(l1.prevVal).toBe(undefined)

        const l2 = dspLink(dsp, dsp2)
        expect(dsp.vals).toBe(l2)
        expect(dsp2.dsps).toBe(l2)
        expect(l2.val).toBe(dsp2)
        expect(l2.nextDsp).toBe(undefined)
        expect(l2.prevDsp).toBe(undefined)
        expect(l2.nextVal).toBe(undefined)
        expect(l2.prevVal).toBe(l1)
        expect(l1.nextVal).toBe(l2)
    })

    it("should link dsps #2", () => {
        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        const dsp = dspCreate()

        const l1 = dspLink(dsp1, dsp)
        expect(dsp.dsps).toBe(l1)
        expect(l1.nextDsp).toBe(undefined)
        expect(l1.prevDsp).toBe(undefined)
        expect(l1.disposer).toBe(dsp1)

        const l2 = dspLink(dsp2, dsp)
        expect(dsp.dsps).toBe(l2)
        expect(l1.nextDsp).toBe(l2)
        expect(l1.prevDsp).toBe(undefined)
        expect(l2.nextDsp).toBe(undefined)
        expect(l2.prevDsp).toBe(l1)
        expect(l2.disposer).toBe(dsp2)
    })

    it("should prevent infinite recursion", () => {
        const dsp = dspCreate()
        const link = dspLink(dsp, dsp)
        expect(link).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
        expect(dsp.dsps).toBe(undefined)
    })

    it("should not link disposed dsps", () => {
        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        dspDispose(dsp2)
        const link = dspLink(dsp1, dsp2)
        expect(link).toBe(undefined)
        expect(dsp1.vals).toBe(undefined)
        expect(dsp1.dsps).toBe(undefined)
        expect(dsp2.vals).toBe(undefined)
        expect(dsp2.dsps).toBe(undefined)
    })

    it("should immediately dispose callbacks", () => {
        const dsp = dspCreate()
        dspDispose(dsp)
        const cb = vi.fn()
        const link = dspLink(dsp, cb)
        expect(cb).toBeCalled()
        expect(link).toBe(undefined)
        expect(dsp.vals).toBe(undefined)
        expect(dsp.dsps).toBe(undefined)
    })

    it("should immediately dispose dsps", () => {
        const dsp1 = dspCreate()
        const dsp2 = dspCreate()
        dspDispose(dsp1)
        const cb = vi.fn()
        dspLink(dsp2, cb)
        const link = dspLink(dsp1, dsp2)
        expect(cb).toBeCalled()
        expect(link).toBe(undefined)
        expect(dsp1.vals).toBe(undefined)
        expect(dsp1.dsps).toBe(undefined)
        expect(dsp2.vals).toBe(undefined)
        expect(dsp2.dsps).toBe(undefined)
    })
})
