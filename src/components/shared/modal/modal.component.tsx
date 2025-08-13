import React, { memo, useCallback, useEffect, useRef } from 'react'

import { DSModalProvider } from './modal.context'
import { DSModalContent } from './subcomponents/modal.content.component'
import { DSModalHeader } from './subcomponents/modal.header.components'
import { DSModalTrigger } from './subcomponents/modal.trigger.component'

export interface DSModalRootProps {
  children?: React.ReactNode
  onClose?: () => void
  state?: 'active' | 'inactive'
}

export const DSModalRoot = memo(
  ({ children, onClose, state }: DSModalRootProps) => {
    const isOpen = state === 'active'
    const prevIsOpen = useRef(isOpen)
    const originalTriggerRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
      if (!prevIsOpen.current && isOpen) {
        originalTriggerRef.current = document.activeElement as HTMLElement
      }

      prevIsOpen.current = isOpen
    }, [isOpen])

    const handleOnClose = useCallback(() => {
      if (originalTriggerRef.current) {
        requestAnimationFrame(() => {
          originalTriggerRef.current?.focus()
        })
      }

      onClose?.()
    }, [onClose])

    return (
      <DSModalProvider isOpen={isOpen} handleOnClose={handleOnClose}>
        {children}
      </DSModalProvider>
    )
  },
)

DSModalRoot.displayName = 'DSModalRoot'

export const DSModal = Object.assign(DSModalRoot, {
  Trigger: DSModalTrigger,
  Content: DSModalContent,
  Header: DSModalHeader,
})
