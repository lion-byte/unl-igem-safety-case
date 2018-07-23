import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../components'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='Edit'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <section>
            <Link to='/create'>&laquo; Create</Link>
          </section>
        </UserOnly>
      </Page>
    )
  }
}
