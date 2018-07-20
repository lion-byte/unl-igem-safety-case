import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components/ui'
import { ModifyDiagram } from './edit'

export class EditDiagram extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Edit Diagram'>
        <Link to='/view'>&laquo; View other diagrams</Link>

        <ModifyDiagram
          // @ts-ignore
          id={id}
        />
      </Page>
    )
  }
}
