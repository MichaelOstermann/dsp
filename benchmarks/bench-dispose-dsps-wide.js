import { dspCreate, dspDispose, dspLink } from "@monstermann/disposables"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack

function setupDsp(size) {
    return {
        beforeEach() {
            dsp = dspCreate()
            for (let i = 0; i < size; i++) {
                const inner = dspCreate()
                dspLink(inner, () => {})
                dspLink(dsp, inner)
            }
        },
    }
}

function setupDisposableStack(size) {
    return {
        beforeEach() {
            stack = new DisposableStack()
            for (let i = 0; i < size; i++) {
                const inner = new DisposableStack()
                inner.adopt(undefined, () => {})
                stack.use(inner)
            }
        },
    }
}

bench

    .add("dspDispose(dsp) x 1", () => dspDispose(dsp), setupDsp(1))
    .add("dspDispose(dsp) x 10", () => dspDispose(dsp), setupDsp(10))
    .add("dspDispose(dsp) x 100", () => dspDispose(dsp), setupDsp(100))

    .add("DisposableStack.dispose() x 1", () => stack.dispose(), setupDisposableStack(1))
    .add("DisposableStack.dispose() x 10", () => stack.dispose(), setupDisposableStack(10))
    .add("DisposableStack.dispose() x 100", () => stack.dispose(), setupDisposableStack(100))

await bench.run()
console.table(bench.table())
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
