import { DynamicIcon } from 'lucide-react/dynamic'
import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSIconProps } from './icon.types'

const SCDynamicIcon = styled(DynamicIcon)<{
  $iconColor?: keyof AppTheme['colors']
}>`
  ${({ $iconColor, theme }) =>
    $iconColor ? `color: ${theme.colors[$iconColor]};` : 'color: currentColor;'}
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
      height={size}
      name={name}
      width={size}
      // @ts-expect-error - color is not a valid prop for DynamicIcon
      $iconColor={color}
      {...accessibilityProps}
      {...props}
    />
  )
}

DSIcon.displayName = 'DSIcon'
