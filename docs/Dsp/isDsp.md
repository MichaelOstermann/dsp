# isDsp

```ts
function Dsp.isDsp(value: unknown): value is Dsp;
```

Checks whether the provided `value` is a `Dsp` instance.

## Example

```ts
import { Dsp } from "@monstermann/dsp";

const dsp = Dsp.create();
Dsp.isDsp(dsp); // true
```
