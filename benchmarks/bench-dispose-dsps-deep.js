import { Dsp } from "@monstermann/dsp"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack

function setupDsp(size) {
    return {
        beforeEach() {
            dsp = Dsp.create()
            let current = dsp
            for (let i = 0; i < size; i++) {
                const next = Dsp.create()
                Dsp.add(next, () => {})
                Dsp.add(current, next)
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

    .add("Dsp.dispose(dsp) x 1", () => Dsp.dispose(dsp), setupDsp(1))
    .add("Dsp.dispose(dsp) x 10", () => Dsp.dispose(dsp), setupDsp(10))
    .add("Dsp.dispose(dsp) x 100", () => Dsp.dispose(dsp), setupDsp(100))

    .add("DisposableStack.dispose() x 1", () => stack.dispose(), setupDisposableStack(1))
    .add("DisposableStack.dispose() x 10", () => stack.dispose(), setupDisposableStack(10))
    .add("DisposableStack.dispose() x 100", () => stack.dispose(), setupDisposableStack(100))

await bench.run()
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
