import * as React from 'react'
import { Router } from '@reach/router'

import { EditDiagram } from './diagram'
import { Menu } from './menu'
import { EditNode } from './node'

export default class Edit extends React.PureComponent {
  render () {
    return (
      <Router>
        <Menu path='/' />
        <EditDiagram path='diagram/:id' />
        <EditNode path='node/:id' />
      </Router>
    )
  }
}
