import { memo, useCallback, useContext, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

import { DSModalContext } from '../modal.context'
import type { DSModalContentProps } from '../modal.types'

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const SCModalOverlay = styled.div`
  animation: ${fadeIn} 150ms ease-out;
  background: ${({ theme }) => theme.colors['overlay-bg']};
  display: flex;
  inset: 0;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2000;
`

export const SCDialog = styled.div<{ $maxWidth?: string }>`
  background: ${({ theme }) => theme.colors['surface-bg']};
  border-radius: ${({ theme }) => theme.radius.surface};
  box-shadow: ${({ theme }) => theme.shadows.modal};
  height: ${({ theme }) => `calc(100vh - ${theme.spacings['64']} * 2)`};
  max-width: ${({ $maxWidth, theme }) =>
    $maxWidth || theme.spacings['content-max-width']};
  overflow: hidden;
  padding: ${({ theme }) => theme.spacings['24']};
  position: relative;
  width: 100%;
  margin: ${({ theme }) => theme.spacings['24']};

  @media (min-width: 768px) {
    height: ${({ theme }) => `calc(100vh - ${theme.spacings['80']} * 2)`};
  }
`

export const DSModalContent = memo(
  ({ ariaLabel, children, maxWidth }: DSModalContentProps) => {
    const { isOpen, handleOnClose } = useContext(DSModalContext)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleOnClick = useCallback(
      (evt: React.MouseEvent) => {
        if (evt.target === evt.currentTarget) {
          handleOnClose()
        }
      },
      [handleOnClose],
    )

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
        if (evt.key === 'Escape') {
          handleOnClose()
          return
        }

        if (evt.key !== 'Tab') return

        const focusableElements =
          dialogContainer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)

        if (focusableElements.length === 0) {
          evt.preventDefault()
          return
        }

        const first = focusableElements[0]!
        const last = focusableElements[focusableElements.length - 1]!

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
    }, [handleOnClose])

    useEffect(() => {
      if (isOpen) {
        const cleanup = setupFocusTrap()
        focusFirstElement()

        return cleanup
      }
    }, [isOpen, focusFirstElement, setupFocusTrap])

    if (!isOpen) return null

    const dialog = (
      <SCModalOverlay
        aria-label={ariaLabel}
        aria-modal="true"
        onClick={handleOnClick}
        role="dialog"
      >
        <SCDialog $maxWidth={maxWidth} ref={containerRef}>
          {children}
        </SCDialog>
      </SCModalOverlay>
    )

    return ReactDOM.createPortal(dialog, document.body)
  },
)

DSModalContent.displayName = 'DSModalContent'
