import * as React from 'react'

import { Page } from '../../components/ui'
import { User } from '../../components/user'

export default class Home extends React.PureComponent {
  render () {
    return (
      <Page title='Home' useDefaultTitle>
        <h2>
          Welcome, <User />
        </h2>
      </Page>
    )
  }
}
