import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, UserOnly } from '../../../components'
import { NodeForm } from './form'

export class Node extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Add a Sub-Node'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <NodeForm
            // @ts-ignore
            id={id}
          />
        </UserOnly>
      </Page>
    )
  }
}
