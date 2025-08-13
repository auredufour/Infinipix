/**
 * MOTION TOKENS - Simplified Timing & Easing System
 * =============================================================================
 *
 * PHILOSOPHY: Tokens define WHAT (timing/easing), not WHERE (components)
 *
 * Use these tokens to build any animation by combining duration + easing
 * Example: `transition: ${theme.motions.fast} ${theme.motions.smooth}`
 *
 * =============================================================================
 */

export const motion = {
  // =============================================================================
  // DURATION SCALE
  // =============================================================================

  instant: '0ms', // No animation (accessibility)
  fast: '120ms', // Quick feedback (hover, focus)
  normal: '200ms', // Standard interactions
  slow: '300ms', // Content changes, fades

  // =============================================================================
  // EASING FUNCTIONS
  // =============================================================================

  smooth: 'cubic-bezier(0.2, 0, 0, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // =============================================================================
  // COMMON COMBINATIONS
  // =============================================================================

  'transition-fast': '120ms cubic-bezier(0.2, 0, 0, 1)',
  'transition-base': '200ms cubic-bezier(0.2, 0, 0, 1)',
  'transition-slow': '300ms ease-out',
} as const
