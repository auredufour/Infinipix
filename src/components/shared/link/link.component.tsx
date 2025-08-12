import { SCLink } from './link.styles'
import type { DSLinkProps } from './link.types'

export const DSLink = ({
  children,
  variant = 'plain',
  ...props
}: DSLinkProps) => (
  <SCLink $variant={variant} {...props}>
    {children}
  </SCLink>
)

DSLink.displayName = 'DSLink'
