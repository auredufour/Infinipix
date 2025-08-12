import React from 'react'

import { DSModalProvider } from './modal.context'
import { DSModalContent } from './subcomponents/modal.content.component'
import { DSModalHeader } from './subcomponents/modal.header.components'
import { DSModalTrigger } from './subcomponents/modal.trigger.component'

export interface DSModalRootProps {
  children?: React.ReactNode
  onClose?: () => void
  state?: 'active' | 'inactive'
}

export const DSModalRoot = ({ children, onClose, state }: DSModalRootProps) => {
  const isOpen = state === 'active'

  const handleOnClose = () => {
    onClose?.()
  }

  return (
    <DSModalProvider isOpen={isOpen} handleOnClose={handleOnClose}>
      {children}
    </DSModalProvider>
  )
}

export const DSModal = Object.assign(DSModalRoot, {
  Trigger: DSModalTrigger,
  Content: DSModalContent,
  Header: DSModalHeader,
})
