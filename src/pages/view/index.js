import * as React from 'react'
import { Router } from '@reach/router'

import { ViewDiagram } from './diagram'
import { Menu } from './menu'
import { ViewNode } from './node'

export default class Edit extends React.PureComponent {
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
