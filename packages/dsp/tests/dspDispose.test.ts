import { describe, expect, it } from "vitest"
import { dspCreate, dspDispose, dspLink } from "../src"

describe("dspDispose", () => {
    it("should dispose callbacks", () => {
        const calls: number[] = []
        const dsp = dspCreate()
        dspLink(dsp, () => calls.push(1))
        dspLink(dsp, () => calls.push(2))
        dspLink(dsp, () => calls.push(3))
        dspDispose(dsp)
        dspDispose(dsp)
        expect(calls).toEqual([3, 2, 1])
    })

    it("should dispose dsps #1", () => {
        const calls: number[] = []

        const dsp = dspCreate()
        dspLink(dsp, () => calls.push(1))
        dspLink(dsp, () => calls.push(2))
        dspLink(dsp, () => calls.push(3))

        const dsp1 = dspCreate()
        dspLink(dsp1, () => calls.push(4))
        dspLink(dsp1, () => calls.push(5))
        dspLink(dsp1, () => calls.push(6))

        const dsp2 = dspCreate()
        dspLink(dsp2, () => calls.push(7))
        dspLink(dsp2, () => calls.push(8))
        dspLink(dsp2, () => calls.push(9))

        const dsp3 = dspCreate()
        dspLink(dsp3, () => calls.push(10))
        dspLink(dsp3, () => calls.push(11))
        dspLink(dsp3, () => calls.push(12))

        dspLink(dsp, dsp1)
        dspLink(dsp, dsp2)
        dspLink(dsp, dsp3)

        dspDispose(dsp)
        dspDispose(dsp)
        dspDispose(dsp1)
        dspDispose(dsp2)
        dspDispose(dsp3)

        expect(calls).toEqual([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    })

    it("should dispose dsps #2", () => {
        const calls: number[] = []

        const dsp = dspCreate()
        dspLink(dsp, () => calls.push(1))
        dspLink(dsp, () => calls.push(2))
        dspLink(dsp, () => calls.push(3))

        const dsp1 = dspCreate()
        dspLink(dsp1, () => calls.push(4))
        dspLink(dsp1, () => calls.push(5))
        dspLink(dsp1, () => calls.push(6))

        const dsp2 = dspCreate()
        dspLink(dsp2, () => calls.push(7))
        dspLink(dsp2, () => calls.push(8))
        dspLink(dsp2, () => calls.push(9))

        const dsp3 = dspCreate()
        dspLink(dsp3, () => calls.push(10))
        dspLink(dsp3, () => calls.push(11))
        dspLink(dsp3, () => calls.push(12))

        dspLink(dsp, dsp1)
        dspLink(dsp, dsp2)
        dspLink(dsp, dsp3)

        dspDispose(dsp2)
        dspDispose(dsp2)
        dspDispose(dsp3)
        dspDispose(dsp3)
        dspDispose(dsp1)
        dspDispose(dsp1)
        dspDispose(dsp)
        dspDispose(dsp)

        expect(calls).toEqual([9, 8, 7, 12, 11, 10, 6, 5, 4, 3, 2, 1])
    })
})
