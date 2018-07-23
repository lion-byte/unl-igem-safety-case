import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../../components'
import { RootForm } from './form'

export class Root extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Root Goal'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <section>
            <Link to='/view'>&laquo; View other diagrams</Link>
          </section>

          <section>
            <RootForm />
          </section>
        </UserOnly>
      </Page>
    )
  }
}
