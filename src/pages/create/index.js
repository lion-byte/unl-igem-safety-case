import * as React from 'react'
import { Router } from '@reach/router'

import { Root } from './root'
import { Goal } from './sub-goal'
import { Menu } from './menu'

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
