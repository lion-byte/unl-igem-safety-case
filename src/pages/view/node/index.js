import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components/ui'
import { DisplayNode } from './display'

export class ViewNode extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='View Node'>
        <Link to='/view'>&laquo; View other nodes</Link>
        <DisplayNode id={id} />
      </Page>
    )
  }
}
