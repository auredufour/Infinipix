import { createGlobalStyle } from 'styled-components'

import CanvaSansBold from '../fonts/canva-sans/CanvaSans-Bold.woff2'
import CanvaSansBoldItalic from '../fonts/canva-sans/CanvaSans-BoldItalic.woff2'
import CanvaSansMedium from '../fonts/canva-sans/CanvaSans-Medium.woff2'
import CanvaSansMediumItalic from '../fonts/canva-sans/CanvaSans-MediumItalic.woff2'
import CanvaSansRegular from '../fonts/canva-sans/CanvaSans-Regular.woff2'
import CanvaSansRegularItalic from '../fonts/canva-sans/CanvaSans-RegularItalic.woff2'
import type { AppTheme } from './themes/types'

export const GlobalStyle = createGlobalStyle<{ theme: AppTheme }>`
  /* Critical font preloading - load most important font first */
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Fastest text rendering */
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
    src: url(${CanvaSansBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  /* Load italic fonts after main fonts */
  @font-face {
    font-family: 'Canva Sans';
    src: url(${CanvaSansRegularItalic}) format('woff2');
    font-weight: 400;
    font-style: italic;
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
    src: url(${CanvaSansBoldItalic}) format('woff2');
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }

  /* Critical CSS first - minimize render blocking */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Canva Sans', system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background: ${({ theme }) => theme.colors['app-bg']};
    color: ${({ theme }) => theme.colors['emphasis-low-fg']};
  }

  /* CSS custom properties for runtime performance */
  :root {
    color-scheme: light;
    --app-bg: ${({ theme }) => theme.colors['app-bg']};
    --surface-bg: ${({ theme }) => theme.colors['surface-bg']};
    --emphasis-low-fg: ${({ theme }) => theme.colors['emphasis-low-fg']};
    --emphasis-high-fg: ${({ theme }) => theme.colors['emphasis-high-fg']};
    --page-gutter: ${({ theme }) => theme.spacings['page-gutter']};
    --section-gap: ${({ theme }) => theme.spacings['section-gap']};
    --content-max-width: ${({ theme }) => theme.spacings['content-max-width']};
    
    /* Optimize font loading */
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Non-critical styles */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  p {
    text-wrap: pretty;
  }
  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  #root, #__next {
    isolation: isolate;
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

  /* Reduced motion optimizations */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Performance optimizations */
  * {
    will-change: auto;
  }
  
  img {
    content-visibility: auto;
  }
`
