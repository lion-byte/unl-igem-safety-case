import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../components'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Model'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <section>
            <Link className='button' to='root'>
              Create Root Goal
            </Link>

            <Link className='button' to='sub-goal'>
              Create Sub-Goal
            </Link>
          </section>
        </UserOnly>
      </Page>
    )
  }
}
