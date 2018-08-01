import * as React from 'react'

import { Page, GuestOnly, UserOnly, MD } from '../../components'
import { description } from './description'

export default class Home extends React.PureComponent {
  render () {
    return (
      <Page title='Home' useDefaultTitle>
        <div>
          <h2>
            Welcome
            <GuestOnly>, esteemed guest</GuestOnly>
            <UserOnly>, dear user</UserOnly>
            !
          </h2>
        </div>

        <section>
          <MD content={description} />
        </section>
      </Page>
    )
  }
}
