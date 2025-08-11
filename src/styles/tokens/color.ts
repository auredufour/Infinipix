const PRIMARY = {
  light: {
    'app-bg': '#ffffff',
    'surface-bg': '#f9fafb',
    'strong-fg': '#111213',
    'strong-fg-inverted': '#ffffff',
    'soft-fg': '#525866',
    'highlight-bg': '#54ca84',
    'overlay-bg': 'rgba(0,0,0,0.6)',
    outline: '#e5e7eb',
  },
  dark: {
    'app-bg': '#111213',
    'surface-bg': '#0b0c0e',
    'strong-fg-inverted': '#111213',
    'strong-fg': '#ffffff',
    'soft-fg': '#9ca3af',
    'highlight-bg': '#54ca84',
    'overlay-bg': 'rgba(0,0,0,0.6)',
    outline: '#e5e7eb',
  },
} as const

export const color = {
  ...PRIMARY,
}
