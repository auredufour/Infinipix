import { type PropsWithChildren, useContext } from 'react'
import { styled } from 'styled-components'

import { DSButtonIcon } from '../../button-icon/button-icon.component'
import { DSModalContext } from '../modal.context'

const SCModalHeader = styled.div`
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings['element-gap-md']};
  display: flex;
  justify-content: space-between;
`

const SCButtonClose = styled(DSButtonIcon)`
  position: relative;
  right: ${({ theme }) => `-${theme.spacings['12']}`};
  top: ${({ theme }) => `-${theme.spacings['16']}`};
`

export const DSModalHeader = ({ children }: PropsWithChildren) => {
  const { handleOnClose } = useContext(DSModalContext)

  return (
    <SCModalHeader>
      {children}

      <SCButtonClose
        name="x"
        onClick={handleOnClose}
        ariaLabel="Close"
        variant="low"
      />
    </SCModalHeader>
  )
}
