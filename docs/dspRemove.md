# dspRemove

```ts
function dspRemove(disposer: Dsp, value: (() => void) | Dsp): void;
```

`O(n)`

Takes a `Dsp` instance and removes the last occurrence of `value` from it.

If you can, use [`dspUnlink`](./dspUnlink) as it is `O(1)`.

## Example

```ts
import {
    dspCreate,
    dspLink,
    dspRemove,
    dspIncludes,
} from "@monstermann/disposables";

const dsp = dspCreate();
const cb = () => {};
const link = dspLink(dsp, cb);
dspIncludes(dsp, cb); // true
dspRemove(dsp, cb);
dspIncludes(dsp, cb); // false
```
