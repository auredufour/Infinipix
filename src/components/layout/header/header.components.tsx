import styled from 'styled-components'

import logo02 from '../../../assets/logo-02.png'
import { DSLink } from '../../shared/link/link.component'
import { DSMenu } from '../../shared/menu/menu.component'
import {
  headerCssRules,
  headerLogoCssRules,
  headerMenuCssRules,
  headerNavListCssRules,
} from './header.styles'

const StyledHeader = styled.header`
  ${headerCssRules}
`

const StyledLogo = styled.img`
  ${headerLogoCssRules}
`

const StyledList = styled.ul`
  ${headerNavListCssRules}
`

const StyledMenuContainer = styled.div`
  ${headerMenuCssRules}
`

export function Header() {
  return (
    <StyledHeader>
      <div>
        <a href="/">
          <StyledLogo src={logo02} alt="Infinipix" />
        </a>
      </div>
      <nav>
        <StyledList>
          <li role="none">
            <DSLink role="menuitem" tabIndex={-1} href="/">
              Home
            </DSLink>
          </li>
          <li role="none">
            <DSLink role="menuitem" tabIndex={-1} href="/">
              About
            </DSLink>
          </li>
        </StyledList>
        <StyledMenuContainer>
          <DSMenu>Menu</DSMenu>
        </StyledMenuContainer>
      </nav>
    </StyledHeader>
  )
}
