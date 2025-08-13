import styled, { css } from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSButtonProps } from './button.types'

type StyledProps = { $variant?: DSButtonProps['variant'] }

const BACKGROUND_COLOR_MAP = {
  plain: () => 'transparent',
  low: () => 'transparent',
  medium: (theme: AppTheme) => theme.colors['emphasis-medium-bg'],
  high: (theme: AppTheme) => theme.colors['emphasis-high-bg'],
  highlight: (theme: AppTheme) => theme.colors['highlight-bg'],
} as const

const COLOR_MAP = {
  plain: (theme: AppTheme) => theme.colors['emphasis-medium-fg'],
  low: (theme: AppTheme) => theme.colors['emphasis-low-fg'],
  medium: (theme: AppTheme) => theme.colors['emphasis-medium-fg'],
  high: (theme: AppTheme) => theme.colors['emphasis-high-fg'],
  highlight: (theme: AppTheme) => theme.colors['highlight-fg'],
} as const

const ACTIVE_COLOR_MAP = {
  plain: () => 'transparent',
  low: (theme: AppTheme) => theme.colors['emphasis-low-bg-active'],
  medium: (theme: AppTheme) => theme.colors['emphasis-medium-bg-active'],
  high: (theme: AppTheme) => theme.colors['emphasis-high-bg-active'],
  highlight: (theme: AppTheme) => theme.colors['highlight-bg-active'],
} as const

const BORDER_COLOR_MAP = {
  plain: () => 'transparent',
  low: (theme: AppTheme) => theme.colors['outline'],
  medium: (theme: AppTheme) => theme.colors['emphasis-medium-bg'],
  high: (theme: AppTheme) => theme.colors['emphasis-high-bg'],
  highlight: (theme: AppTheme) => theme.colors['highlight-bg'],
} as const

export const getBackgroundColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => BACKGROUND_COLOR_MAP[variant || 'plain'](theme)

export const getColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => COLOR_MAP[variant || 'plain'](theme)

export const getActiveColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => ACTIVE_COLOR_MAP[variant || 'plain'](theme)

const getBorderColor = (
  theme: AppTheme,
  variant: StyledProps['$variant'] = 'plain',
) => BORDER_COLOR_MAP[variant || 'plain'](theme)

export const buttonHover = css`
  &:hover {
    background-color: var(--colorBgActive);
  }
`

export const buttonFocusVisible = css`
  &:focus-visible {
    background-color: var(--colorBgActive);
    outline-offset: 2px;
    outline: 2px solid var(--colorFg);
  }
`

export const SCButton = styled.button<{ $variant: DSButtonProps['variant'] }>`
  ${({ theme, $variant }) => `
  --colorBg: ${getBackgroundColor(theme, $variant)};
  --colorBgActive: ${getActiveColor(theme, $variant)};
  --colorFg: ${getColor(theme, $variant)};
  --colorBorder: ${getBorderColor(theme, $variant)};
`}

  align-items: center;
  background-color: var(--colorBorder);
  border-radius: ${({ theme }) => theme.radius.interactive};
  border: 1px solid var(--colorBg);
  color: var(--colorFg);
  column-gap: ${({ theme }) => theme.spacings['element-gap-sm']};
  display: flex;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  outline: none;
  padding: ${({ theme, $variant }) =>
    $variant === 'plain'
      ? 0
      : `${theme.spacings['12']} ${theme.spacings['24']}`};
  transition: ${({ theme }) => theme.motions['transition-base']};

  ${buttonHover}
  ${buttonFocusVisible}
`
