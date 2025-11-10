import { Dsp } from "@monstermann/dsp"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack

function setupDsp(size) {
    return {
        beforeEach() {
            dsp = Dsp.create()
            for (let i = 0; i < size; i++) {
                const inner = Dsp.create()
                Dsp.add(inner, () => {})
                Dsp.add(dsp, inner)
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

    .add("Dsp.dispose(dsp) x 1", () => Dsp.dispose(dsp), setupDsp(1))
    .add("Dsp.dispose(dsp) x 10", () => Dsp.dispose(dsp), setupDsp(10))
    .add("Dsp.dispose(dsp) x 100", () => Dsp.dispose(dsp), setupDsp(100))

    .add("DisposableStack.dispose() x 1", () => stack.dispose(), setupDisposableStack(1))
    .add("DisposableStack.dispose() x 10", () => stack.dispose(), setupDisposableStack(10))
    .add("DisposableStack.dispose() x 100", () => stack.dispose(), setupDisposableStack(100))

await bench.run()
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
