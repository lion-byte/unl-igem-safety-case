import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components'
import { GoalForm } from './form'

export class Goal extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Sub-Goal'>
        <section>
          <Link to='..'>&laquo; Back</Link>
        </section>

        <section>
          <GoalForm />
        </section>
      </Page>
    )
  }
}
