import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'typeface-exo-2'

const theme = {
  fontBase: `'Exo 2', Arial, Helvetica, sans-serif`,
  colorPrimary: '#f30aae',
  black: '#535353'
}

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fontBase};
    margin: 0;
    padding: 0;
    line-height: 1.5;
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
