import logo02 from '../../../assets/logo-02.png'
import { DSLink } from '../../shared/link/link.component'
import { SCContainer, SCHeader, SCLogo } from './header.styles'

export function Header() {
  return (
    <SCContainer>
      <SCHeader>
        <nav aria-label="Primary">
          <DSLink href="/" variant="plain">
            <SCLogo src={logo02} alt="Infinipix" />
          </DSLink>
        </nav>
      </SCHeader>
    </SCContainer>
  )
}
