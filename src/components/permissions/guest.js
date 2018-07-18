import * as React from 'react'
import { graphql } from 'react-apollo'

import { PERMISSIONS_QUERY } from '../../queries'

export class GuestPresentation extends React.PureComponent {
  render () {
    const {
      children,
      data: { loading, error, permissions }
    } = this.props

    if (loading) {
      return null
    }

    if (error || permissions.level === 'GUEST') {
      return children
    } else {
      return null
    }
  }
}

export const GuestOnly = graphql(PERMISSIONS_QUERY)(GuestPresentation)
