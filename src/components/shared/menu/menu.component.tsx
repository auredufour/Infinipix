import { memo, useId, useRef, useState } from 'react'
import { styled } from 'styled-components'

import { DSButton } from '../button/button.component'
import { DSLink } from '../link/link.component'
import { menuListCssRules } from './menu.styles'
import type {
  DSMenuItemProps,
  DSMenuListProps,
  DSMenuProps,
} from './menu.types'

const StyledButton = styled(DSButton)``

const StyledMenuList = styled.ul`
  ${menuListCssRules}
`

const DSMenuList = ({ children, menuId }: DSMenuListProps) => {
  return (
    <StyledMenuList id={menuId} role="menu" aria-labelledby={menuId}>
      {children}
    </StyledMenuList>
  )
}

const DSMenuItem = ({ children, href }: DSMenuItemProps) => {
  return (
    <li>
      <DSLink href={href}>{children}</DSLink>
    </li>
  )
}

export const DSMenu = memo(({ children, onClick }: DSMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  const handleOnClick = () => {
    setIsOpen(!isOpen)
    onClick?.()
  }

  return (
    <>
      <StyledButton
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={handleOnClick}
        onKeyDown={handleOnClick}
        ref={buttonRef}
      >
        {children}
      </StyledButton>
      {isOpen && (
        <DSMenuList menuId={menuId}>
          <DSMenuItem href="/">Home</DSMenuItem>
          <DSMenuItem href="/">About</DSMenuItem>
        </DSMenuList>
      )}
    </>
  )
})

DSMenu.displayName = 'DSMenu'
