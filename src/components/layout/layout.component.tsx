import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { Header } from './header/header.component'

const SCLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Layout = () => {
  return (
    <SCLayoutContainer>
      <Header />
      <main>
        <Outlet />
      </main>
    </SCLayoutContainer>
  )
}

Layout.displayName = 'Layout'
