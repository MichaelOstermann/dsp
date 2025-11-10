# Dispose

```ts
function Dsp.dispose(disposer: Dsp): void;
```

Takes a `Dsp` instance and disposes it, walking through all added values in reverse order (LIFO).

Disposed `Dsp`s will dereference themselves from other `Dsp`s.

Every added value is wrapped with a `try/catch` and errors are accumulated in an `AggregateError`.

## Example

```ts
import { Dsp } from "@monstermann/dsp";

const dspA = Dsp.create();
Dsp.add(dspA, () => console.log(1));
Dsp.add(dspA, () => console.log(2));

Dsp.dispose(dspA); // Prints: 2, 1
```

```ts
import { Dsp } from "@monstermann/dsp";

const dspA = Dsp.create();
const dspB = Dsp.create();

Dsp.add(dspA, () => console.log(1));
Dsp.add(dspA, () => console.log(2));
Dsp.add(dspB, () => console.log(3));
Dsp.add(dspB, () => console.log(4));
Dsp.add(dspA, dspB);

Dsp.dispose(dspA); // Prints: 4, 3, 2, 1
```

```ts
import { Dsp } from "@monstermann/dsp";

const dspA = Dsp.create();
const dspB = Dsp.create();

Dsp.add(dspA, () => console.log(1));
Dsp.add(dspA, () => console.log(2));
Dsp.add(dspB, () => console.log(3));
Dsp.add(dspB, () => console.log(4));
Dsp.add(dspA, dspB);

Dsp.dispose(dspB); // Prints: 4, 3
Dsp.dispose(dspA); // Prints: 2, 1
```

```ts
import { Dsp } from "@monstermann/dsp";

const dspA = Dsp.create();

Dsp.add(dspA, () => console.log(1));
Dsp.add(dspA, () => console.log(2));
Dsp.add(dspA, () => {
    throw new Error();
});

Dsp.dispose(dspA); // Prints: 2, 1, then rethrows above error
```

```ts
import { Dsp } from "@monstermann/dsp";

const dspA = Dsp.create();

Dsp.add(dspA, () => console.log(1));
Dsp.add(dspA, () => console.log(2));
Dsp.add(dspA, () => {
    throw new Error();
});
Dsp.add(dspA, () => {
    throw new Error();
});

Dsp.dispose(dspA); // Prints: 2, 1, then throws AggregateError
```
