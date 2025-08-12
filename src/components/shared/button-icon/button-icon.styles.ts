import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSButtoniconProps } from './button-icon.types'

// Internal props that won't reach the DOM
type StyledProps = {
  $variant?: DSButtoniconProps['variant']
  $size?: DSButtoniconProps['size']
}

const getSize = (size: StyledProps['$size'] = 'medium') => {
  const map = {
    small: '32px',
    medium: '40px',
    large: '48px',
  } as const
  return map[size]
}

const getBackgroundColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => {
  const map = {
    plain: 'transparent',
    'medium-emphasis': theme.colors['soft-bg'],
    'high-emphasis': theme.colors['highlight-bg'],
  } as const
  return map[variant as keyof typeof map]
}

const getColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => {
  const map = {
    plain: theme.colors['strong-fg'],
    'high-emphasis': theme.colors['strong-fg-inverted'],
  } as const
  return map[variant as keyof typeof map]
}

export const SCButtonIcon = styled.button<{
  $variant: DSButtoniconProps['variant']
  $size: DSButtoniconProps['size']
}>`
  ${({ theme, $variant, $size }) => `
  --buttonSize: ${getSize($size)};
  --backgroundColor: ${getBackgroundColor(theme, $variant)};
  --color: ${getColor(theme, $variant)};
  `}

  align-items: center;
  background-color: var(--backgroundColor);
  border: 0;
  border-radius: ${({ theme }) => theme.radius.full};
  color: var(--color);
  cursor: pointer;
  display: inline-flex;
  height: var(--buttonSize);
  justify-content: center;
  outline: none;
  padding: 0;
  width: var(--buttonSize);
  transition: background-color 0.25s ease;

  &:hover,
  &:focus-visible {
    background-color: color-mix(in srgb, var(--backgroundColor) 80%, black);
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid ${({ theme }) => theme.colors['strong-fg']};
  }
`
