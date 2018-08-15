import * as React from 'react'
import { graphql } from 'react-apollo'

import { PERMISSIONS_QUERY } from '../../queries/account'

export class CanWritePresentation extends React.PureComponent {
  render () {
    const {
      children,
      data: { loading, error, permissions }
    } = this.props

    if (loading || error) {
      return null
    }

    if (permissions.canRead) {
      return children
    } else {
      return <p>You don't have write privileges.</p>
    }
  }
}

export const CanWrite = graphql(PERMISSIONS_QUERY)(CanWritePresentation)
