import * as React from 'react'
import { graphql } from 'react-apollo'

import { PERMISSIONS_QUERY } from '../../queries/account'

export class AdminPresentation extends React.PureComponent {
  render () {
    const {
      children,
      data: { loading, error, permissions }
    } = this.props

    if (loading || error) {
      return null
    }

    if (permissions.level === 'ADMIN') {
      return children
    } else {
      return null
    }
  }
}

export const AdminOnly = graphql(PERMISSIONS_QUERY)(AdminPresentation)
