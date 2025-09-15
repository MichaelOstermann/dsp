import { dspCreate, dspDispose, dspLink } from "@monstermann/disposables"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack

function setupDsp(size) {
    return {
        beforeEach() {
            dsp = dspCreate()
            let current = dsp
            for (let i = 0; i < size; i++) {
                const next = dspCreate()
                dspLink(next, () => {})
                dspLink(current, next)
                current = next
            }
        },
    }
}

function setupDisposableStack(size) {
    return {
        beforeEach() {
            stack = new DisposableStack()
            let current = stack
            for (let i = 0; i < size; i++) {
                const next = new DisposableStack()
                next.adopt(undefined, () => {})
                current.use(next)
                current = next
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
