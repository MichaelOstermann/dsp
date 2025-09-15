const a = new DisposableStack()

const m1 = process.memoryUsage().heapUsed

for (let i = 0; i < 1_000_000; i++) {
    const b = new DisposableStack()
    b.adopt(undefined, () => {})
    a.use(b)
}

const m2 = process.memoryUsage().heapUsed

a.dispose()
gc()

const m3 = process.memoryUsage().heapUsed

console.log(`
M1: ${m1 / 1024 / 1024} MB
M2: ${m2 / 1024 / 1024} MB
M3: ${m3 / 1024 / 1024} MB
`)
