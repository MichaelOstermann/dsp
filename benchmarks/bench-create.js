/* eslint-disable no-new */
import { Dsp } from "@monstermann/dsp"
import { tinybenchPrinter } from "@monstermann/tinybench-pretty-printer"
import { Bench } from "tinybench"

const bench = new Bench()

bench
    .add("Dsp.create() x 1", () => {
        for (let i = 0; i < 1; i++) Dsp.create()
    })
    .add("Dsp.create() x 100", () => {
        for (let i = 0; i < 100; i++) Dsp.create()
    })
    .add("Dsp.create() x 1000", () => {
        for (let i = 0; i < 1000; i++) Dsp.create()
    })

    .add("new DisposableStack() x 1", () => {
        for (let i = 0; i < 1; i++) new DisposableStack()
    })
    .add("new DisposableStack() x 100", () => {
        for (let i = 0; i < 100; i++) new DisposableStack()
    })
    .add("new DisposableStack() x 1000", () => {
        for (let i = 0; i < 1000; i++) new DisposableStack()
    })

await bench.run()
console.log(tinybenchPrinter.order(["name", "ops", "time", "margin", "samples"]).sort(false).toMarkdown(bench))
