import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../components/ui'
import { UserOnly, GuestOnly } from '../../components/permissions'

export default class Account extends React.PureComponent {
  render () {
    return (
      <Page title='Account'>
        <section>
          <GuestOnly>
            <Link className='button' to='/login'>
              Login
            </Link>
          </GuestOnly>

          <UserOnly>
            <Link className='button warning' to='/logout'>
              Logout
            </Link>
          </UserOnly>
        </section>
      </Page>
    )
  }
}
