import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../../components'
import { GoalForm } from './form'

export class Goal extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Sub-Goal'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <section>
            <Link to='..'>&laquo; Back</Link>
          </section>

          <section>
            <GoalForm />
          </section>
        </UserOnly>
      </Page>
    )
  }
}
