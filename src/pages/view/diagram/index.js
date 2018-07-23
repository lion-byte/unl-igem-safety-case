import * as React from 'react'
import { Link } from '@reach/router'

import { DisplayDiagram } from './display'
import { Page, GuestOnly, UserOnly } from '../../../components'

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

        <UserOnly>
          <Link to='/view'>&laquo; View other diagrams</Link>

          <DisplayDiagram id={id} />
        </UserOnly>
      </Page>
    )
  }
}
