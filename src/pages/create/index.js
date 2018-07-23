import * as React from 'react'
import { Router } from '@reach/router'

import { Root } from './root'
import { Node } from './sub-node'

export default class Create extends React.PureComponent {
  render () {
    return (
      <Router>
        <Root path='/' />
        <Node path='sub-node/:id' />
      </Router>
    )
  }
}
