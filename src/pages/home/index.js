import * as React from 'react'

import { Page } from '../../components'
import { GuestOnly, UserOnly } from '../../components/permissions'

export default class Home extends React.PureComponent {
  render () {
    return (
      <Page title='Home' useDefaultTitle>
        <h2>
          Welcome
          <GuestOnly>, esteemed guest</GuestOnly>
          <UserOnly>, dear user</UserOnly>
          !
        </h2>
      </Page>
    )
  }
}
