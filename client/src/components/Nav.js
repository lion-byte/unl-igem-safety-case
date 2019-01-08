import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledNav = styled.nav``

const Nav = () => {
  return (
    <StyledNav>
      <Link to='/'>Home</Link>
    </StyledNav>
  )
}

export default Nav
