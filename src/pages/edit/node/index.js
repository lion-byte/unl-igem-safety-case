import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../../components'
import { ModifyNode } from './edit'

export class EditNode extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Edit Node'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <Link to='/view'>&laquo; View other nodes</Link>

          <ModifyNode
            // @ts-ignore
            id={id}
          />
        </UserOnly>
      </Page>
    )
  }
}
