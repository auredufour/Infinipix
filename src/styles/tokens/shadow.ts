export const shadow = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
  md: '0 2px 4px rgba(0, 0, 0, 0.10)',
  lg: '0 4px 8px rgba(0, 0, 0, 0.12)',
  xl: '0 8px 16px rgba(0, 0, 0, 0.15)',

  surface: '0 1px 2px rgba(0, 0, 0, 0.08)', // Cards, surfaces - subtle depth
  overlay: '0 4px 8px rgba(0, 0, 0, 0.12)', // Dropdowns, menus - floating above
  modal: '0 8px 16px rgba(0, 0, 0, 0.15)', // Modals, dialogs - highest priority
} as const
