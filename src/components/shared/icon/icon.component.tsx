import { DynamicIcon } from 'lucide-react/dynamic'
import styled from 'styled-components'

import type { AppTheme } from '../../../styles/themes/types'
import type { DSIconProps } from './icon.types'

const SCDynamicIcon = styled(DynamicIcon)<{
  $iconColor?: keyof AppTheme['colors']
}>`
  ${({ $iconColor, theme }) =>
    $iconColor && `color: ${theme.colors[$iconColor]};`}
`

export const DSIcon = ({
  name,
  size = 24,
  ariaLabel,
  color,
  ...props
}: DSIconProps) => {
  const label =
    ariaLabel ??
    ((props as Record<string, unknown>)['aria-label'] as string | undefined)
  const accessibilityProps = label
    ? { role: 'img', 'aria-label': label, 'aria-hidden': false }
    : { 'aria-hidden': true }

  return (
    <SCDynamicIcon
      name={name}
      width={size}
      height={size}
      // @ts-expect-error - color is not a valid prop for DynamicIcon
      $iconColor={color}
      {...props}
      {...accessibilityProps}
    />
  )
}

DSIcon.displayName = 'DSIcon'
