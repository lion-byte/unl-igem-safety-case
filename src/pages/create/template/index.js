import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../../components'
import { TemplateForm } from './form'

export class Template extends React.PureComponent {
  render () {
    return (
      <Page title='Create From Template'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <section>
            <Link to='/create'>&laquo; Back</Link>
          </section>

          <section>
            <TemplateForm />
          </section>
        </UserOnly>
      </Page>
    )
  }
}
