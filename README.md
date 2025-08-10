## Coding Style – Functions

To keep the codebase consistent and easy to navigate we follow these rules when
choosing between **function declarations** and **arrow functions**:

| Use this form            | When                                                                                                                 | Example |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------- |
| **Function declaration** | • Top-level utilities exported from a module <br/>• Need for hoisting <br/>• Functions likely to be `jest.mock()`-ed | ```ts   |

export async function fetchPhotoById(id: string) { // … }

````|
| **Arrow function** (`const fn = (…) => {}`) | • Callbacks inside React components (`onClick`, `map`, `filter`…) <br/>• Helpers created inside a `useEffect`/hook or component scope <br/>• When you want to prevent re-declaration in the same scope | ```ts
const handleClick = () => {
  setOpen(true)
}

useEffect(() => {
  const load = async () => {
    …
  }
  load()
}, [])
``` |

Rationale:
1. **Clarity** – Top-level API-style helpers read naturally as `function fetchX()`, whereas inline helpers inherit the surrounding lexical scope without hoisting.
2. **Consistency** – All callbacks in JSX/React hooks use the same arrow style, avoiding surprise hoisting.
````
