import styled from 'styled-components'

import logo02 from '../../../assets/logo-02.png'
import { DSLink } from '../../shared/link/link.component'
import { DSMenu } from '../../shared/menu/menu.component'
import {
  headerContainerCssRules,
  headerCssRules,
  headerLogoCssRules,
  headerMenuCssRules,
  headerNavListCssRules,
} from './header.styles'

const StyledContainer = styled.div`
  ${headerContainerCssRules}
`

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
    <StyledContainer>
      <StyledHeader>
        <a href="/">
          <StyledLogo src={logo02} alt="Infinipix" />
        </a>
        <nav aria-label="Primary">
          <StyledList>
            <li>
              <DSLink role="menuitem" href="/">
                Home
              </DSLink>
            </li>
            <li>
              <DSLink role="menuitem" href="/">
                About
              </DSLink>
            </li>
          </StyledList>
          <StyledMenuContainer>
            <DSMenu>Menu</DSMenu>
          </StyledMenuContainer>
        </nav>
      </StyledHeader>
    </StyledContainer>
  )
}
