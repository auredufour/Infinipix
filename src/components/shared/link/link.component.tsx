import styled from 'styled-components'

import { linkCssRules } from './link.styles'
import type { DSLinkProps } from './link.types'

// block style-only props so they don’t hit <a>
const StyledLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop as string),
})<DSLinkProps>`
  ${linkCssRules}
`

export const DSLink = ({
  children,
  variant = 'plain',
  ...rest
}: DSLinkProps) => (
  <StyledLink variant={variant} {...rest}>
    {children}
  </StyledLink>
)

DSLink.displayName = 'DSLink'
