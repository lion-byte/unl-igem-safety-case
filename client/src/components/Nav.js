import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledNav = styled.nav`
  font-size: 1.25em;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  button,
  a {
    display: inline-block;
    font-family: inherit;
    color: ${props => props.theme.black};
    border: none;
    background-color: transparent;
    padding: 1ch;
    text-decoration: none;
  }
`

const Nav = props => (
  <StyledNav>
    <Link to='/'>UNL iGEM Safety Case</Link>

    <div className='menu'>
      <Link to='/'>Home</Link>
      <Link to='/app'>App</Link>
      <Link to='/example'>Example Diagram</Link>
    </div>
  </StyledNav>
)

export default Nav
