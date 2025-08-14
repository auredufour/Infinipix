import type { ReactNode } from 'react'

import { SCBodyContainer } from './body.styles'

interface BodyProps {
  children: ReactNode
}

/* ---------- main body ---------- */
export function Body({ children }: BodyProps) {
  return <SCBodyContainer>{children}</SCBodyContainer>
}
