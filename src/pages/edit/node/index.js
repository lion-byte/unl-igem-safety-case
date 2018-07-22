import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components/ui'
import { ModifyNode } from './edit'

export class EditNode extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Edit Node'>
        <Link to='/view'>&laquo; View other nodes</Link>

        <ModifyNode
          // @ts-ignore
          id={id}
        />
      </Page>
    )
  }
}
