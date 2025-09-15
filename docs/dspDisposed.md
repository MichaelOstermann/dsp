# dspDisposed

```ts
function dspDisposed(disposer: Dsp): boolean;
```

Returns a boolean indicating whether the provided `Dsp` instance has been disposed.

## Example

```ts
import { dspCreate, dspDisposed, dspDispose } from "@monstermann/disposables";

const dsp = dspCreate();
dspDisposed(dsp); // false
dspDispose(dsp);
dspDisposed(dsp); // true
```
