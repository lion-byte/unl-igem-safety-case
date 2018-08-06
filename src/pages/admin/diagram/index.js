import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, AdminOnly } from '../../../components'
import { DisplayDiagram } from './display'

export class ViewDiagram extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='View Diagram'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <AdminOnly>
          <section>
            <Link to='/admin'>&laquo; View other diagrams</Link>
          </section>

          <DisplayDiagram id={id} />
        </AdminOnly>
      </Page>
    )
  }
}
