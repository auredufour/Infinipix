import Color from 'color'

// =============================================================================
// PRIMITIVE COLORS
// =============================================================================

const SLATE = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
} as const

const EMERALD = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#54ca84',
  600: '#22c55e',
  700: '#16a34a',
  800: '#15803d',
  900: '#14532d',
} as const

export const PRIMITIVES = {
  SLATE,
  EMERALD,
} as const

// =============================================================================
// SEMANTIC TOKENS
// =============================================================================

const PRIMARY_PALETTE_LIGHT = {
  'app-bg': SLATE[50],
  'surface-bg': SLATE[50], // Changed from white to use primitive

  'emphasis-high-fg': SLATE[900],
  'emphasis-high-fg-inverted': SLATE[50],
  'emphasis-high-bg': SLATE[100],
  'emphasis-high-bg-active': SLATE[200],

  'emphasis-medium-fg': SLATE[600],
  'emphasis-medium-fg-inverted': SLATE[50],
  'emphasis-medium-bg': SLATE[200],
  'emphasis-medium-bg-active': SLATE[300],

  'emphasis-low-fg': SLATE[400],
  'emphasis-low-fg-inverted': SLATE[50],
  'emphasis-low-bg': SLATE[100],
  'emphasis-low-bg-active': SLATE[200],

  'highlight-fg': EMERALD[700],
  'highlight-fg-inverted': SLATE[50],
  'highlight-bg': EMERALD[500],
  'highlight-bg-active': EMERALD[600],

  outline: SLATE[200],
  'overlay-bg': Color(SLATE[900]).alpha(0.5).toString(),
} as const

/**
 * Dark theme semantic tokens
 */
const PRIMARY_PALETTE_DARK = {
  'app-bg': SLATE[900],
  'surface-bg': SLATE[800],

  'emphasis-high-fg': SLATE[50],
  'emphasis-high-fg-inverted': SLATE[900],
  'emphasis-high-bg': SLATE[700],
  'emphasis-high-bg-active': SLATE[600],

  'emphasis-medium-fg': SLATE[300],
  'emphasis-medium-fg-inverted': SLATE[800],
  'emphasis-medium-bg': SLATE[600],
  'emphasis-medium-bg-active': SLATE[500],

  'emphasis-low-fg': SLATE[500],
  'emphasis-low-fg-inverted': SLATE[800],
  'emphasis-low-bg': SLATE[800],
  'emphasis-low-bg-active': SLATE[700],

  'highlight-fg': EMERALD[400],
  'highlight-fg-inverted': SLATE[900],
  'highlight-bg': EMERALD[500],
  'highlight-bg-active': EMERALD[400],

  outline: SLATE[700],
  'overlay-bg': Color(SLATE[900]).alpha(0.7).toString(),
} as const

export const color = {
  light: PRIMARY_PALETTE_LIGHT,
  dark: PRIMARY_PALETTE_DARK,
} as const

export type SemanticToken = keyof typeof PRIMARY_PALETTE_LIGHT
export type ColorTheme = 'light' | 'dark'
