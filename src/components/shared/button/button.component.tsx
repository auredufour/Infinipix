import { forwardRef, memo } from 'react'
import styled from 'styled-components'

import { buttonCssRules } from './button.styles'
import type { DSButtonProps } from './button.types'

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<DSButtonProps>`
  ${buttonCssRules}
`

export const DSButton = memo(
  forwardRef<HTMLButtonElement, DSButtonProps>(
    ({ children, type = 'button', variant = 'plain', ...rest }, ref) => (
      <StyledButton ref={ref} type={type} variant={variant} {...rest}>
        {children}
      </StyledButton>
    ),
  ),
)

DSButton.displayName = 'DSButton'
