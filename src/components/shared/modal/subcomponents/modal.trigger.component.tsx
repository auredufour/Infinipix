import { memo, useContext } from 'react'
import { styled } from 'styled-components'

import { DSModalContext } from '../modal.context'

type DSModalTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const SCModalTrigger = styled.button`
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors['app-bg']};
    border-radius: ${({ theme }) => theme.radius.surface};
    outline-offset: ${({ theme }) =>
      `calc(-${theme.spacings['element-gap-md']} / 2)`};
  }
`

export const DSModalTrigger = memo(
  ({ onClick, ...props }: DSModalTriggerProps) => {
    const { isOpen } = useContext(DSModalContext)

    return (
      <SCModalTrigger
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={onClick}
        {...props}
      />
    )
  },
)

DSModalTrigger.displayName = 'DSModalTrigger'
