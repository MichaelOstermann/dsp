# find

```ts
function Dsp.find(disposer: Dsp, value: (() => void) | Dsp): DspLink | undefined;
```

`O(n)`

Takes a `Dsp` instance and finds the last occurrence of `value`, the result can be passed to [`unlink`](./unlink) to remove it.

## Example

```ts
import { Dsp } from "@monstermann/dsp";

const dsp = Dsp.create();

const cb1 = () => {};
const cb2 = () => {};

Dsp.add(dsp, cb1);

Dsp.includes(dsp, cb1); // true
Dsp.includes(dsp, cb2); // false

const l1 = Dsp.find(dsp, cb1); // link
const l2 = Dsp.find(dsp, cb2); // undefined

Dsp.unlink(l1);
Dsp.unlink(l2);

Dsp.includes(dsp, cb1); // false
Dsp.includes(dsp, cb2); // false
```
