import { Dsp } from "@monstermann/dsp"

const a = Dsp.create()

const m1 = process.memoryUsage().heapUsed

for (let i = 0; i < 1_000_000; i++) {
    const b = Dsp.create()
    Dsp.add(b, () => {})
    Dsp.add(a, b)
}

const m2 = process.memoryUsage().heapUsed

Dsp.dispose(a)
gc()

const m3 = process.memoryUsage().heapUsed

console.log(`
M1: ${m1 / 1024 / 1024} MB
M2: ${m2 / 1024 / 1024} MB
M3: ${m3 / 1024 / 1024} MB
`)
