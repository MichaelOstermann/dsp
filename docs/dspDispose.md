# dspDispose

```ts
function dspDispose(disposer: Dsp): void;
```

Takes a `Dsp` instance and disposes it, walking through all added values in reverse order (LIFO).

Disposed `Dsp`s will dereference themselves from other `Dsp`s.

Every added value is wrapped with a `try/catch` and errors are accumulated in an `AggregateError`.

## Example

```ts
import { dspCreate, dspLink, dspDispose } from "@monstermann/disposables";

const dspA = dspCreate();
dspLink(dspA, () => console.log(1));
dspLink(dspA, () => console.log(2));

dspDispose(dspA); // Prints: 2, 1
```

```ts
import { dspCreate, dspLink, dspDispose } from "@monstermann/disposables";

const dspA = dspCreate();
const dspB = dspCreate();

dspLink(dspA, () => console.log(1));
dspLink(dspA, () => console.log(2));
dspLink(dspB, () => console.log(3));
dspLink(dspB, () => console.log(4));
dspLink(dspA, dspB);

dspDispose(dspA); // Prints: 4, 3, 2, 1
```

```ts
import { dspCreate, dspLink, dspDispose } from "@monstermann/disposables";

const dspA = dspCreate();
const dspB = dspCreate();

dspLink(dspA, () => console.log(1));
dspLink(dspA, () => console.log(2));
dspLink(dspB, () => console.log(3));
dspLink(dspB, () => console.log(4));
dspLink(dspA, dspB);

dspDispose(dspB); // Prints: 4, 3
dspDispose(dspA); // Prints: 2, 1
```

```ts
import { dspCreate, dspLink, dspDispose } from "@monstermann/disposables";

const dspA = dspCreate();

dspLink(dspA, () => console.log(1));
dspLink(dspA, () => console.log(2));
dspLink(dspA, () => {
    throw new Error();
});

dspDispose(dspA); // Prints: 2, 1, then rethrows above error
```

```ts
import { dspCreate, dspLink, dspDispose } from "@monstermann/disposables";

const dspA = dspCreate();

dspLink(dspA, () => console.log(1));
dspLink(dspA, () => console.log(2));
dspLink(dspA, () => {
    throw new Error();
});
dspLink(dspA, () => {
    throw new Error();
});

dspDispose(dspA); // Prints: 2, 1, then throws AggregateError
```
