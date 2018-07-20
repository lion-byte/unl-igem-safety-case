import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../../components/ui'

export class EditNode extends React.PureComponent {
  render () {
    const { id } = this.props

    console.log({ id })

    return (
      <Page title='Edit Node'>
        <Link to='/view'>&laquo; View other nodes</Link>
      </Page>
    )
  }
}
