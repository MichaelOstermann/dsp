# unlink

```ts
function Dsp.unlink(link: DspLink | undefined): void;
```

`O(1)`

Takes a value constructed by [`add`](./add) and destroys all references.

## Example

```ts
import { Dsp } from "@monstermann/dsp";

const cb = () => {};

const dsp = Dsp.create();
const link = Dsp.add(dsp, cb);

Dsp.includes(dsp, cb); // true
Dsp.unlink(link);
Dsp.includes(dsp, cb); // false
```
