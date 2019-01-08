import React from 'react'
import styled from 'styled-components'

import Theme from './Theme'
import Nav from './Nav'

const Page = styled.div``

const Main = styled.main``

const Layout = ({ children }) => {
  return (
    <Theme>
      <Page>
        <Nav />

        <Main>{children}</Main>
      </Page>
    </Theme>
  )
}

export default Layout
