import * as React from 'react'
import { Router } from '@reach/router'

import { Menu } from './menu'
import { RootGoal } from './rootGoal'
import { SubGoal } from './subGoal'

export default class Create extends React.PureComponent {
  render () {
    return (
      <Router>
        <Menu path='/' />
        <RootGoal path='root' />
        <SubGoal path='sub-goal' />
      </Router>
    )
  }
}
