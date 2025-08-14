import styled from 'styled-components'

import { interactiveElementStyles } from '../../../shared/utils/style.utils'
import type { AppTheme } from '../../../styles/themes/types'
import {
  getActiveColor,
  getBackgroundColor,
  getColor,
} from '../button/button.styles'
import type { DSButtoniconProps } from './button-icon.types'

type StyledProps = {
  $size?: DSButtoniconProps['size']
  $variant?: DSButtoniconProps['variant']
}

const SIZE_MAP = {
  small: (theme: AppTheme) => theme.spacings['16'],
  medium: (theme: AppTheme) => theme.spacings['24'],
} as const

const getSize = (size: StyledProps['$size'] = 'medium', theme: AppTheme) =>
  SIZE_MAP[size](theme)

export const SCButtonIcon = styled.button<{
  $variant: DSButtoniconProps['variant']
  $size: DSButtoniconProps['size']
}>`
  ${({ theme, $variant, $size }) => `
  --colorBg: ${getBackgroundColor(theme, $variant)};
  --colorFg: ${getColor(theme, $variant)};
  --size: ${getSize($size, theme)};
  `}

  align-items: center;
  background-color: var(--colorBg);
  border-radius: ${({ theme }) => theme.radius.full};
  border: 0;
  color: var(--colorFg);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: ${({ theme, $variant }) =>
    $variant === 'plain' ? 0 : theme.spacings['element-gap-sm']};
  transition: ${({ theme }) => theme.motions['transition-base']};

  svg {
    stroke: var(--colorFg);
    color: var(--colorFg);
  }

  ${({ theme, $variant }) =>
    interactiveElementStyles({
      colorBg: getActiveColor(theme, $variant),
      colorOutline: theme.colors['emphasis-low-fg'],
    })}
`
