import * as React from 'react'
import { Link } from '@reach/router'

import { GuestOnly, Page, UserOnly, AdminOnly } from '../../components'

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
            <AdminOnly>
              <div>
                <Link className='button' to='/admin'>
                  Admin View
                </Link>
              </div>
            </AdminOnly>

            <div>
              <Link className='button warning' to='/logout'>
                Logout
              </Link>
            </div>
          </UserOnly>
        </section>
      </Page>
    )
  }
}
