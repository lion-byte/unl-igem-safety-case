import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components/ui'
import { DisplayDiagram } from './display'

export class ViewDiagram extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='View Diagram'>
        <Link to='/view'>&laquo; View other diagrams</Link>

        <DisplayDiagram id={id} />
      </Page>
    )
  }
}
