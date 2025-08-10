const PRIMARY = {
  light: {
    'app-bg': '#ffffff',
    'surface-bg': '#f9fafb',
    'strong-fg': '#111213',
    'soft-fg': '#525866',
    'highlight-bg': '#0ea5e9',
    'overlay-bg': 'rgba(0,0,0,0.6)',
    outline: '#e5e7eb',
  },
  dark: {
    'app-bg': '#111213',
    'surface-bg': '#0b0c0e',
    'strong-fg': '#ffffff',
    'soft-fg': '#9ca3af',
    'highlight-bg': '#0ea5e9',
    'overlay-bg': 'rgba(0,0,0,0.6)',
    outline: '#e5e7eb',
  },
} as const

export const color = {
  ...PRIMARY,
}
