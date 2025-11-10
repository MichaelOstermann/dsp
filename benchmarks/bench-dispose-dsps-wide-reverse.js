import { Dsp } from "@monstermann/dsp"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

let dsp, stack
let dsps, stacks

function setupDsp(size) {
    return {
        beforeEach() {
            dsp = Dsp.create()
            dsps = []
            for (let i = 0; i < size; i++) {
                const inner = Dsp.create()
                Dsp.add(inner, () => {})
                Dsp.add(dsp, inner)
                dsps.push(inner)
            }
        },
    }
}

function setupDisposableStack(size) {
    return {
        beforeEach() {
            stack = new DisposableStack()
            stacks = []
            for (let i = 0; i < size; i++) {
                const inner = new DisposableStack()
                inner.adopt(undefined, () => {})
                stack.use(inner)
                stacks.push(inner)
            }
        },
    }
}

bench

    .add("Dsp.dispose(dsp) x 1", () => dsps.forEach(dsp => Dsp.dispose(dsp)), setupDsp(1))
    .add("Dsp.dispose(dsp) x 10", () => dsps.forEach(dsp => Dsp.dispose(dsp)), setupDsp(10))
    .add("Dsp.dispose(dsp) x 100", () => dsps.forEach(dsp => Dsp.dispose(dsp)), setupDsp(100))

    .add("DisposableStack.dispose() x 1", () => stacks.forEach(stack => stack.dispose()), setupDisposableStack(1))
    .add("DisposableStack.dispose() x 10", () => stacks.forEach(stack => stack.dispose()), setupDisposableStack(10))
    .add("DisposableStack.dispose() x 100", () => stacks.forEach(stack => stack.dispose()), setupDisposableStack(100))

await bench.run()
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
