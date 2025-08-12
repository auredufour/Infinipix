import {
  createContext,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'

interface ModalContextValue {
  isOpen: boolean
  handleOnClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}

const DSModalContext = createContext<ModalContextValue>({
  isOpen: false,
  handleOnClose: () => {},
  triggerRef: { current: null },
})

export const DSModalProvider = ({
  children,
  handleOnClose,
  isOpen,
}: PropsWithChildren<Omit<ModalContextValue, 'triggerRef'>>) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const value = useMemo(
    () => ({ isOpen, handleOnClose, triggerRef }),
    [isOpen, handleOnClose],
  )

  const captureFocusedElement = () => {
    triggerRef.current = document.activeElement as HTMLButtonElement | null
  }

  const restoreFocusToTrigger = () => {
    if (triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.focus()
      }, 0)
    }
  }

  useEffect(() => {
    if (isOpen) {
      captureFocusedElement()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      restoreFocusToTrigger()
    }
  }, [isOpen])

  return (
    <DSModalContext.Provider value={value}>{children}</DSModalContext.Provider>
  )
}

export { DSModalContext }
