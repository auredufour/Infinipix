import type { ReactNode } from 'react'

import { SCBodyContainer } from './body.styles'

interface BodyProps {
  children: ReactNode
}

export const Body = ({ children }: BodyProps) => {
  return <SCBodyContainer>{children}</SCBodyContainer>
}

Body.displayName = 'Body'
