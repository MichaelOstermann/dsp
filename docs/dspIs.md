# dspIs

```ts
function dspIs(value: unknown): value is Dsp;
```

Checks whether the provided `value` is a `Dsp` instance.

## Example

```ts
import { dspCreate, dspIs } from "@monstermann/disposables";

const dsp = dspCreate();
dspIs(dsp); // true
```
