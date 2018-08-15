import * as React from 'react'
import { Router, Link } from '@reach/router'

import { Page } from '../../components'
import { Node } from './sub-node'
import { Root } from './root'
import { Template } from './template'

class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='Create'>
        <section>
          <Link className='button' to='root'>
            Create Root Goal
          </Link>

          <Link className='button' to='template'>
            Create from Template
          </Link>
        </section>
      </Page>
    )
  }
}

export default class Create extends React.PureComponent {
  render () {
    return (
      <Router>
        <Menu default />
        <Root path='root' />
        <Template path='template' />
        <Node path='sub-node/:id' />
      </Router>
    )
  }
}
