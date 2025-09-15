import { dspCreate, dspLink } from "@monstermann/disposables"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack

function setupDsp() {
    return {
        beforeEach() {
            dsp = dspCreate()
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

    .add("dspLink(dsp, dspCreate()) x 1", () => {
        for (let i = 0; i < 1; i++) dspLink(dsp, dspCreate())
    }, setupDsp())
    .add("dspLink(dsp, dspCreate()) x 100", () => {
        for (let i = 0; i < 100; i++) dspLink(dsp, dspCreate())
    }, setupDsp())
    .add("dspLink(dsp, dspCreate()) x 1000", () => {
        for (let i = 0; i < 1000; i++) dspLink(dsp, dspCreate())
    }, setupDsp())

    .add("DisposableStack.use(new DisposableStack()) x 1", () => {
        for (let i = 0; i < 1; i++) stack.use(new DisposableStack())
    }, setupDisposableStack())
    .add("DisposableStack.use(new DisposableStack()) x 100", () => {
        for (let i = 0; i < 100; i++) stack.use(new DisposableStack())
    }, setupDisposableStack())
    .add("DisposableStack.use(new DisposableStack()) x 1000", () => {
        for (let i = 0; i < 1000; i++) stack.use(new DisposableStack())
    }, setupDisposableStack())

await bench.run()
console.table(bench.table())
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
