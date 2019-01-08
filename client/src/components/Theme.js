import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const theme = {
  colorPrimary: '#f30aae'
}

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  a {
    color: ${props => props.theme.colorPrimary};
  }
`

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />

      {children}
    </React.Fragment>
  </ThemeProvider>
)

export default Theme
