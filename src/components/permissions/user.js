import * as React from 'react'
import { graphql } from 'react-apollo'

import { PERMISSIONS_QUERY } from '../../queries'

export class UserPresentation extends React.PureComponent {
  render () {
    const {
      children,
      data: { loading, error, permissions }
    } = this.props

    if (loading || error) {
      return null
    }

    if (permissions.level === 'USER' || permissions.level === 'ADMIN') {
      return children
    } else {
      return null
    }
  }
}

export const UserOnly = graphql(PERMISSIONS_QUERY)(UserPresentation)
