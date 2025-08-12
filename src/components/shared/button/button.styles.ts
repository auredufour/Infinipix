import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSButtonProps } from './button.types'

type StyledProps = { $variant?: DSButtonProps['variant'] }

const getBackgroundColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => {
  const map = {
    plain: 'transparent',
    'low-emphasis': theme.colors['app-bg'],
    'high-emphasis': theme.colors['highlight-bg'],
  } as const

  return map[variant as keyof typeof map] ?? map.plain
}

const getColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => {
  const map = {
    plain: theme.colors['strong-fg'],
    'low-emphasis': theme.colors['strong-fg'],
    'high-emphasis': theme.colors['strong-fg-inverted'],
  } as const

  return map[variant as keyof typeof map] ?? map.plain
}

const getBorderColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => {
  const map = {
    plain: 'transparent',
    'low-emphasis': theme.colors['outline'],
    'high-emphasis': theme.colors['highlight-bg'],
  } as const
  return map[variant as keyof typeof map] ?? map.plain
}

export const SCButton = styled.button<{ $variant: DSButtonProps['variant'] }>`
  ${({ theme, $variant }) => `
--backgroundColor: ${getBackgroundColor(theme, $variant)};
--borderColor: ${getBorderColor(theme, $variant)};
--color: ${getColor(theme, $variant)};
`}

  background-color: var(--backgroundColor);
  border-radius: ${({ theme }) => theme.radius.surface};
  border: 1px solid var(--borderColor);
  color: var(--color);
  font-weight: 500;
  outline: none;
  padding: ${({ theme }) => `${theme.spacings[12]} ${theme.spacings[24]}`};
  transition: background-color 0.25s ease;
  display: flex;
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings[8]};

  &:hover,
  &:focus-visible {
    background-color: color-mix(in srgb, var(--backgroundColor) 80%, black);
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid ${({ theme }) => theme.colors['strong-fg']};
  }
`
