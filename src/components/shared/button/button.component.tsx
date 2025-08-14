import { forwardRef, memo } from 'react'

import { SCButton } from './button.styles'
import type { DSButtonProps } from './button.types'

export const DSButton = memo(
  forwardRef<HTMLButtonElement, DSButtonProps>(
    (
      {
        accessoryLeft,
        accessoryRight,
        children,
        type = 'button',
        variant = 'plain',
        ...props
      },
      ref,
    ) => (
      <SCButton ref={ref} type={type} $variant={variant} {...props}>
        {accessoryLeft && accessoryLeft}

        {children}

        {accessoryRight && accessoryRight}
      </SCButton>
    ),
  ),
)

DSButton.displayName = 'DSButton'
