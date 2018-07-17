import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components/ui'
import { RootForm } from './form'

export class Root extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Root Goal'>
        <section>
          <Link to='..'>&laquo; Back</Link>
        </section>

        <section>
          <RootForm />
        </section>
      </Page>
    )
  }
}
