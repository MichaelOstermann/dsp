# dspFind

```ts
function dspFind(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined;
```

`O(n)`

Takes a `Dsp` instance and finds the last occurrence of `value`, the result can be passed to [`dspUnlink`](./dspUnlink) to remove it.

## Example

```ts
import {
    dspCreate,
    dspLink,
    dspUnlink,
    dspIncludes,
} from "@monstermann/disposables";

const dsp = dspCreate();

const cb1 = () => {};
const cb2 = () => {};

dspLink(dsp, cb1);

dspIncludes(dsp, cb1); // true
dspIncludes(dsp, cb2); // false

const l1 = dspFind(dsp, cb1); // link
const l2 = dspFind(dsp, cb2); // undefined

dspUnlink(l1);
dspUnlink(l2);

dspIncludes(dsp, cb1); // false
dspIncludes(dsp, cb2); // false
```
