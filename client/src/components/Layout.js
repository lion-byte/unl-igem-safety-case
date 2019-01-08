import React from 'react'
import styled from 'styled-components'

import Theme from './Theme'
import Nav from './Nav'

const Page = styled.div`
  background-color: white;
  color: ${props => props.theme.black};
`

const Main = styled.main`
  margin: 0 auto;
  max-width: 1000px;
  min-height: 70vh;
  padding: 2em;
`

const Layout = ({ children }) => (
  <Theme>
    <Page>
      <Nav />

      <Main>{children}</Main>
    </Page>
  </Theme>
)

export default Layout
