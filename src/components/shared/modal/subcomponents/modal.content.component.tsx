import {
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

import { DSModalContext } from '../modal.context'

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const SCModalOverlay = styled.div`
  animation: ${fadeIn} 150ms ease-out;
  background: ${({ theme }) => theme.colors['overlay-bg']};
  display: grid;
  inset: 0;
  place-items: center;
  position: fixed;
  z-index: 2000;
`

export const SCDialog = styled.div<{ $maxWidth?: string }>`
  background: ${({ theme }) => theme.colors['app-bg']};
  border-radius: ${({ theme }) => theme.radius.surface};
  box-shadow: ${({ theme }) => theme.shadows.overlay};
  height: calc(100vh - 160px);
  max-width: ${({ $maxWidth }) => $maxWidth || '1600px'};
  overflow: hidden;
  padding: ${({ theme }) => theme.spacings[24]};
  position: relative;
  width: 100%;
`

export interface DSModalContentProps extends PropsWithChildren {
  maxWidth?: string
}

export const DSModalContent = ({ children, maxWidth }: DSModalContentProps) => {
  const { isOpen, handleOnClose } = useContext(DSModalContext)
  const containerRef = useRef<HTMLDivElement>(null)

  // lock scroll when open
  useEffect(() => {
    if (!isOpen) return

    const { body } = document
    const prev = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = prev
    }
  }, [isOpen])

  const focusFirstElement = useCallback(() => {
    const dialogContainer = containerRef.current
    if (!dialogContainer) return

    const focusableElements =
      dialogContainer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)

    if (focusableElements.length > 0) {
      requestAnimationFrame(() => {
        const firstElement = focusableElements[0]
        if (firstElement instanceof HTMLElement) {
          firstElement.focus()
        }
      })
    } else {
      containerRef.current?.focus()
    }
  }, [])

  const setupFocusTrap = useCallback(() => {
    const dialogContainer = containerRef.current
    if (!dialogContainer) return

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key !== 'Tab') return

      const focusableElements =
        dialogContainer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)

      if (focusableElements.length === 0) {
        evt.preventDefault()
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (evt.shiftKey) {
        if (document.activeElement === first) {
          evt.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          evt.preventDefault()
          first.focus()
        }
      }
    }

    dialogContainer.addEventListener('keydown', handleKeyDown)
    return () => dialogContainer.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setupFocusTrap()
      focusFirstElement()
    }
  }, [isOpen, focusFirstElement])

  if (!isOpen) return null

  const dialog = (
    <SCModalOverlay
      role="dialog"
      aria-modal="true"
      aria-label="modal"
      onClick={handleOnClose}
    >
      <SCDialog $maxWidth={maxWidth} ref={containerRef}>
        {children}
      </SCDialog>
    </SCModalOverlay>
  )

  return ReactDOM.createPortal(dialog, document.body)
}
