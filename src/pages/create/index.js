import * as React from 'react'
import { Router } from '@reach/router'

import { Menu } from './menu'
import { Root } from './root'
import { Goal } from './sub-goal'

export default class Create extends React.PureComponent {
  render () {
    return (
      <Router>
        <Menu path='/' />
        <Root path='root' />
        <Goal path='sub-goal' />
      </Router>
    )
  }
}
