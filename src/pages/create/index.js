import * as React from 'react'
import { Router } from '@reach/router'

import { Page } from '../../components/ui'
import { RootGoal } from './rootGoal'

export default class Create extends React.PureComponent {
  render () {
    return (
      <Page title='Create'>
        <Router>
          <RootGoal path='root' />
        </Router>
      </Page>
    )
  }
}
