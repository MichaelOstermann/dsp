import { Dsp } from "@monstermann/dsp"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack

function setupDsp() {
    return {
        beforeEach() {
            dsp = Dsp.create()
        },
    }
}

function setupDisposableStack() {
    return {
        beforeEach() {
            stack = new DisposableStack()
        },
    }
}

bench
    .add("Dsp.add(dsp, callback) x 1", () => {
        for (let i = 0; i < 1; i++) Dsp.add(dsp, () => {})
    }, setupDsp())
    .add("Dsp.add(dsp, callback) x 100", () => {
        for (let i = 0; i < 100; i++) Dsp.add(dsp, () => {})
    }, setupDsp())
    .add("Dsp.add(dsp, callback) x 1000", () => {
        for (let i = 0; i < 1000; i++) Dsp.add(dsp, () => {})
    }, setupDsp())

    .add("DisposableStack.adopt(undefined, callback) x 1", () => {
        for (let i = 0; i < 1; i++) stack.adopt(undefined, () => {})
    }, setupDisposableStack())
    .add("DisposableStack.adopt(undefined, callback) x 100", () => {
        for (let i = 0; i < 100; i++) stack.adopt(undefined, () => {})
    }, setupDisposableStack())
    .add("DisposableStack.adopt(undefined, callback) x 1000", () => {
        for (let i = 0; i < 1000; i++) stack.adopt(undefined, () => {})
    }, setupDisposableStack())

await bench.run()
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
