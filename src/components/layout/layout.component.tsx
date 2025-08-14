import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { Body } from './body/body.component'
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
      <Body>
        <Outlet />
      </Body>
    </SCLayoutContainer>
  )
}

Layout.displayName = 'Layout'
