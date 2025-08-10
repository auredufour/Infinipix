import { css } from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSButtonProps } from './button.types'

const getBackgroundColor = (
  theme: AppTheme,
  variant: DSButtonProps['variant'] = 'plain',
) => {
  const map = {
    plain: 'transparent',
    'high-emphasis': theme.colors['highlight-bg'],
  } as const

  return map[variant as keyof typeof map] ?? map.plain
}

export const buttonCssRules = css<DSButtonProps>`
  background-color: ${({ theme, variant }) =>
    getBackgroundColor(theme, variant)};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 0;
  color: ${({ theme }) => theme.colors['strong-fg']};
  font-weight: 500;
  outline: none;
  padding: ${({ theme }) => `${theme.spacings[12]} ${theme.spacings[16]}`};
  transition: background-color 0.25s ease;

  &:hover,
  &:focus-visible {
    background-color: #f7f7f7;
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid ${({ theme }) => theme.colors['strong-fg']};
  }
`
