import { memo } from 'react'

import { DSIcon } from '../icon/icon.component'
import { SCButtonIcon } from './button-icon.styles'
import type { DSButtoniconProps } from './button-icon.types'

export const DSButtonIcon = memo(
  ({
    type = 'button',
    variant = 'plain',
    size = 'medium',
    name,
    ariaLabel,
    ...props
  }: DSButtoniconProps) => (
    <SCButtonIcon
      type={type}
      $variant={variant}
      $size={size}
      aria-label={ariaLabel ?? name}
      {...props}
    >
      <DSIcon name={name} ariaLabel={ariaLabel ?? name} />
    </SCButtonIcon>
  ),
)

DSButtonIcon.displayName = 'DSButtonIcon'
