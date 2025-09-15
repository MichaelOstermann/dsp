# dspUnlink

```ts
function dspUnlink(link: DspLink | undefined): void;
```

`O(1)`

Takes a value constructed by [`dspLink`](./dspLink) and destroys all references.

## Example

```ts
import {
    dspCreate,
    dspLink,
    dspUnlink,
    dspIncludes,
} from "@monstermann/disposables";

const cb = () => {};

const dsp = dspCreate();
const link = dspLink(dsp, cb);

dspIncludes(dsp, cb); // true
dspUnlink(link);
dspIncludes(dsp, cb); // false
```
