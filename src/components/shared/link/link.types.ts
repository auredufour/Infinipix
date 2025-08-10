import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

export interface DSLinkProps
  extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
  variant?: 'plain' | 'high-emphasis' | 'low-emphasis'
}
