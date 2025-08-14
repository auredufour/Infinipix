import { memo } from 'react'

import { DSIcon } from '../icon/icon.component'
import { SCButtonIcon } from './button-icon.styles'
import type { DSButtoniconProps } from './button-icon.types'

export const DSButtonIcon = memo(
  ({
    ariaLabel,
    name,
    size = 'medium',
    type = 'button',
    variant = 'low',
    ...props
  }: DSButtoniconProps) => (
    <SCButtonIcon
      $size={size}
      $variant={variant}
      aria-label={ariaLabel}
      type={type}
      {...props}
    >
      <DSIcon name={name} />
    </SCButtonIcon>
  ),
)

DSButtonIcon.displayName = 'DSButtonIcon'
