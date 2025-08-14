import type { PropsWithChildren } from 'react'

export interface DSModalProps extends PropsWithChildren {
  state: 'active' | 'inactive'
  onClose?: () => void
}

export interface DSModalContentProps extends PropsWithChildren {
  maxWidth?: string
  ariaLabel?: string
}
