import * as React from 'react'
import { Router } from '@reach/router'

import { DeleteDiagram } from './diagram'
import { DeleteNode } from './node'

export default class Delete extends React.PureComponent {
  render () {
    return (
      <Router>
        <DeleteDiagram path='diagram/:id' />
        <DeleteNode path='node/:id' />
      </Router>
    )
  }
}
