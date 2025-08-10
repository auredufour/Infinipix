# Theme & Design Tokens

This folder defines the **design language** for Infinipix.  
All visual-related primitives (colors, spacing, radii…) live in `tokens/`, while
composable _themes_ live in `themes/`.

---

## 1. 📦 Design Tokens (`tokens/`)

Design tokens are the single source of truth for style values. They are plain
TypeScript objects (no runtime dependencies) so they can be autocompleted and
tree-shaken.

| Token file   | What it contains                                   | Example keys                                                   |
| ------------ | -------------------------------------------------- | -------------------------------------------------------------- |
| `color.ts`   | Brand & UI colors for **light** and **dark** modes | `app-bg`, `surface-bg`, `strong-fg`, `highlight-bg`, `outline` |
| `spacing.ts` | 8-point spacing **scale** + semantic `space` map   | `spacing[3] // 12` & `space.component // 12`                   |
| `radius.ts`  | Border-radius values                               | `interactive (6)`, `surface (8)`, `full (9999)`                |
| `shadow.ts`  | Elevation shadows                                  | `surface`, `overlay`                                           |
| `motion.ts`  | Timing functions and durations                     | `transition-fast`, `transition-base`, `transition-slow`        |

All files export **named constants**, e.g.

```ts
import { spacing } from '@/styles/tokens/spacing'
```

### Color token typing

`color.ts` exports a nested object:

```ts
const PRIMARY = {
  light: { … },
  dark : { … }
} as const
```

The keys inside `light`/`dark` are called **color intents** and are
strongly-typed throughout the app via `ColorIntent`.

---

## 2. 🎨 Themes (`themes/`)

A theme bundles tokens into a shape consumed by `styled-components`.

```ts
export type AppTheme = {
  color: Record<ColorIntent, string>
  spacing: typeof spacing
  radius: typeof radius
  shadow: typeof shadow
  motion: typeof motion
}
```

Current themes:

- **Light** – `light.ts`
- **Dark** – `dark.ts`

> **Heads-up**: the variables are intentionally named `lightTheme` in `dark.ts`
> and `darkTheme` in `light.ts` so that we can import both in one line and swap
> them based on the UI mode (see example below).

### Using a theme

A high-level provider wraps the app:

```tsx
import { ThemeProvider } from '@/app/providers/ThemeProvider.component'

;<ThemeProvider mode="light">
  <App />
</ThemeProvider>
```

Inside styled-components you can access tokens via `props.theme`:

```tsx
const Button = styled.button`
  background: ${({ theme }) => theme.color['surface-bg']};
  padding: ${({ theme }) => theme.spacing[3]}px;
  border-radius: ${({ theme }) => theme.radius.interactive}px;
  transition: background ${({ theme }) => theme.motion['transition-fast']};
`
```

---

## 3. 🛠️ Adding / Updating tokens

1. Edit or create a file under `tokens/`.
2. Export **named** constant(s) using `as const` to retain literal types.
3. If you add a new token family, wire it into `AppTheme` (types.ts) and the
   existing themes.

## 4. 🌓 Creating a new theme

1. Decide which token values change per mode (usually `color`).
2. Create `<mode>.ts` in `themes/` and export an `AppTheme` object.
3. Register it in your app’s `ThemeProvider` switch logic.

---

Happy theming! 🎉
