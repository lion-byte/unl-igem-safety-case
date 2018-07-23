import * as React from 'react'
import { Link } from '@reach/router'

import { DisplayNode } from './display'
import { Page, UserOnly, GuestOnly } from '../../../components'

export class ViewNode extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='View Node'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <Link to='/view'>&laquo; View other nodes</Link>
          <DisplayNode
            // @ts-ignore
            id={id}
          />
        </UserOnly>
      </Page>
    )
  }
}
