import * as React from 'react'

import { Page, GuestOnly, UserOnly } from '../../components'

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
