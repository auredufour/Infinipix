import { createGlobalStyle } from 'styled-components'

import CanvaSansBold from '../fonts/canva-sans/CanvaSans-Bold.woff2'
import CanvaSansBoldItalic from '../fonts/canva-sans/CanvaSans-BoldItalic.woff2'
import CanvaSansMedium from '../fonts/canva-sans/CanvaSans-Medium.woff2'
import CanvaSansMediumItalic from '../fonts/canva-sans/CanvaSans-MediumItalic.woff2'
import CanvaSansRegular from '../fonts/canva-sans/CanvaSans-Regular.woff2'
import CanvaSansRegularItalic from '../fonts/canva-sans/CanvaSans-RegularItalic.woff2'
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
    font-family: 'Canva Sans','Helvetica Neue', Roboto, -apple-system, blinkmacsystemfont, sans-serifsystem-ui, sans-serif;
    background: ${({ theme }) => theme.colors['app-bg']};
    color: ${({ theme }) => theme.colors['emphasis-low-fg']};
  }

  a {
    text-decoration: none;
    outline: none;
    color: inherit;
  }

  button {
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansRegularItalic}) format('woff2');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansMediumItalic}) format('woff2');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansBoldItalic}) format('woff2');
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }
`
