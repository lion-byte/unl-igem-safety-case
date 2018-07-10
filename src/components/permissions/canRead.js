import * as React from 'react'
import { graphql } from 'react-apollo'

import { PERMISSIONS_QUERY } from '../../queries'

export class CanReadPresentation extends React.PureComponent {
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
      return <p>You don't have permission to view this.</p>
    }
  }
}

export const CanRead = graphql(PERMISSIONS_QUERY)(CanReadPresentation)
