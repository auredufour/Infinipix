import { DynamicIcon } from 'lucide-react/dynamic'
import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSIconProps } from './icon.types'

const SIZES_MAP = (theme: AppTheme) => ({
  small: theme.spacings['16'],
  medium: theme.spacings['24'],
  large: theme.spacings['32'],
})

const SCDynamicIcon = styled(DynamicIcon)<{
  $iconColor?: keyof AppTheme['colors']
  $size: 'small' | 'medium' | 'large'
}>`
  --size: ${({ $size, theme }) => SIZES_MAP(theme)[$size]};

  ${({ $iconColor, theme }) =>
    $iconColor ? `color: ${theme.colors[$iconColor]};` : 'color: currentColor;'}
  height: var(--size);
  width: var(--size);
`

export const DSIcon = ({
  ariaLabel,
  color,
  name,
  size = 'medium',
  ...props
}: DSIconProps) => {
  const accessibilityProps = ariaLabel
    ? { role: 'img', 'aria-label': ariaLabel }
    : { role: 'presentation' }

  return (
    <SCDynamicIcon
      name={name}
      $iconColor={color as keyof AppTheme['colors'] | undefined}
      $size={size as 'small' | 'medium' | 'large'}
      {...accessibilityProps}
      {...props}
    />
  )
}

DSIcon.displayName = 'DSIcon'
