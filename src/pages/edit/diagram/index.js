import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../../components'
import { ModifyDiagram } from './edit'

export class EditDiagram extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Edit Diagram'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <Link to='/view'>&laquo; View other diagrams</Link>

          <ModifyDiagram
            // @ts-ignore
            id={id}
          />
        </UserOnly>
      </Page>
    )
  }
}
