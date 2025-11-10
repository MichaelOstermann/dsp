# add

```ts
function Dsp.add(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined;
```

Takes a Dsp instance and attaches a callback or another Dsp.

Returns a data-structure that can be passed to [`unlink`](./unlink) for fast `O(1)` removals.

Returns undefined if:

- The target Dsp has already been disposed
- The provided Dsp has already been disposed
- The target Dsp is equal to the provided Dsp

If the target Dsp is already disposed, the provided value will be immediately disposed if possible.

```ts
import { Dsp } from "@monstermann/dsp";

const dspA = Dsp.create();
const dspB = Dsp.create();

Dsp.add(dspA, () => console.log(1));
Dsp.add(dspB, () => console.log(2));
Dsp.add(dspA, dspB);

Dsp.dispose(dspA); // Prints: 2, 1

Dsp.add(dspA, () => console.log(3)); // Prints: 3
Dsp.add(dspB, () => console.log(4)); // Prints: 4
```
