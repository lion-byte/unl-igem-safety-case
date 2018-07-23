import * as React from 'react'

import { Page } from '../../../components'
import { RemoveNode } from './removeNode'

export class DeleteNode extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='Delete Node'>
        <RemoveNode
          // @ts-ignore
          id={id}
        />
      </Page>
    )
  }
}
