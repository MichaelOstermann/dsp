# dspIncludes

```ts
function dspIncludes(disposer: Dsp, value: (() => void) | Dsp): boolean;
```

`O(n)`

Returns a boolean indicating whether the provided `Dsp` instance includes `value`.

By default [`dspLink`](./dspLink) does not check for duplicates, you can use this or [`dspFind`](./dspFind) if you need to make sure there are none.

## Example

```ts
import {
    dspCreate,
    dspLink,
    dspUnlink,
    dspIncludes,
} from "@monstermann/disposables";

const dsp = dspCreate();
const cb = () => {};

dspIncludes(dsp, cb); // false
const link = dspLink(dsp, cb);
dspIncludes(dsp, cb); // true
dspUnlink(dsp, link);
dspIncludes(dsp, cb); // false
```
