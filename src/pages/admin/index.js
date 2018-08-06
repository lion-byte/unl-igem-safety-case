import * as React from 'react'
import { Router } from '@reach/router'

import { Menu } from './menu'

export default class Admin extends React.PureComponent {
  render () {
    return (
      <Router>
        <Menu path='/' />
      </Router>
    )
  }
}
