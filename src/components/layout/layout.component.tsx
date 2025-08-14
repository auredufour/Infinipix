import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { Header } from './header/header.component'

const StyledLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export function Layout() {
  return (
    <StyledLayoutContainer>
      <Header />
      <main>
        <Outlet />
      </main>
    </StyledLayoutContainer>
  )
}
