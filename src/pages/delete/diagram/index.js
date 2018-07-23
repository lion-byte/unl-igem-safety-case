import * as React from 'react'

import { Page } from '../../../components'
import { RemoveDiagram } from './removeDiagram'

export class DeleteDiagram extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Delete Diagram'>
        <RemoveDiagram
          // @ts-ignore
          id={id}
        />
      </Page>
    )
  }
}
