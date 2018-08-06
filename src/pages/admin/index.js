import * as React from 'react'
import { Router } from '@reach/router'

import { Menu } from './menu'
import { ViewDiagram } from './diagram'
import { ViewNode } from './node'

export default class Admin extends React.PureComponent {
  render () {
    return (
      <Router>
        <Menu path='/' />
        <ViewDiagram path='diagram/:id' />
        <ViewNode path='node/:id' />
      </Router>
    )
  }
}
