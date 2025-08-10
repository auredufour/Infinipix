import { createGlobalStyle } from 'styled-components'

import type { AppTheme } from './themes/types'

export const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
  /* Josh Comeau's Modern CSS Reset
     Source: https://www.joshwcomeau.com/css/custom-css-reset/ */

  /* 1. Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin */
  * {
    margin: 0;
  }

  /* 3. Allow percentage-based heights in the application */
  html, body, #root {
    height: 100%;
  }

  /* 4. Add accessible line-height and 5. Improve text rendering */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* 6. Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* 7. Inherit fonts for form controls */
  input, button, textarea, select {
    font: inherit;
  }

  /* 8. Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* 9. Improve line wrapping */
  p {
    text-wrap: pretty;
  }
  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  /* 10. Create a root stacking context */
  #root, #__next {
    isolation: isolate;
  }

  /*
    Application theme overrides
  */
  :root {
    color-scheme: light;
  }

  body {
    font-family: system-ui, sans-serif;
    background: ${({ theme }) => theme.color['app-bg']};
    color: ${({ theme }) => theme.color['strong-fg']};
  }

  a {
    color: ${({ theme }) => theme.color['highlight-bg']};
    text-decoration: none;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color['highlight-bg']};
    outline-offset: 2px;
  }
`
