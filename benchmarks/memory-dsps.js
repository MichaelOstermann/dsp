import { dspCreate, dspDispose, dspLink } from "@monstermann/disposables"

const a = dspCreate()

const m1 = process.memoryUsage().heapUsed

for (let i = 0; i < 1_000_000; i++) {
    const b = dspCreate()
    dspLink(b, () => {})
    dspLink(a, b)
}

const m2 = process.memoryUsage().heapUsed

dspDispose(a)
gc()

const m3 = process.memoryUsage().heapUsed

console.log(`
M1: ${m1 / 1024 / 1024} MB
M2: ${m2 / 1024 / 1024} MB
M3: ${m3 / 1024 / 1024} MB
`)
