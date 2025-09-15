# dspLink

```ts
function dspLink(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined;
```

Takes a Dsp instance and attaches a callback or another Dsp.

Returns a data-structure that can be passed to [`dspUnlink`](./dspUnlink) for fast `O(1)` removals.

Returns undefined if:

- The target Dsp has already been disposed
- The provided Dsp has already been disposed
- The target Dsp is equal to the provided Dsp

If the target Dsp is already disposed, the provided value will be immediately disposed if possible.

```ts
import {
    dspCreate,
    dspLink,
    dspUnlink,
    dspDispose,
} from "@monstermann/disposables";

const dspA = dspCreate();
const dspB = dspCreate();

dspLink(dspA, () => console.log(1));
dspLink(dspB, () => console.log(2));
dspLink(dspA, dspB);

dspDispose(dspA); // Prints: 2, 1

dspLink(dspA, () => console.log(3)); // Prints: 3
dspLink(dspB, () => console.log(4)); // Prints: 4
```
