# remove

```ts
function Dsp.remove(disposer: Dsp, value: (() => void) | Dsp): void;
```

`O(n)`

Takes a `Dsp` instance and removes the last occurrence of `value` from it.

If you can, use [`unlink`](./unlink) as it is `O(1)`.

## Example

```ts
import { Dsp } from "@monstermann/dsp";

const dsp = Dsp.create();
const cb = () => {};
const link = Dsp.add(dsp, cb);
Dsp.includes(dsp, cb); // true
Dsp.remove(dsp, cb);
Dsp.includes(dsp, cb); // false
```
