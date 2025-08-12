import { type PropsWithChildren, useContext } from 'react'
import { styled } from 'styled-components'

import { DSButtonIcon } from '../../button-icon/button-icon.component'
import { DSModalContext } from '../modal.context'

export const SCModalHeader = styled.div`
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings[12]};
  display: flex;
  justify-content: space-between;
`

export const DSModalHeader = ({ children }: PropsWithChildren) => {
  const { handleOnClose } = useContext(DSModalContext)

  return (
    <SCModalHeader>
      {children}
      <DSButtonIcon
        name="x"
        onClick={handleOnClose}
        aria-label="close"
        variant="medium-emphasis"
      />
    </SCModalHeader>
  )
}
