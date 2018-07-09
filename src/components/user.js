import * as React from 'react'
import { graphql } from 'react-apollo'

import { USERNAME_QUERY } from '../queries'

export class UserPresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, me }
    } = this.props

    if (loading) {
      return null
    } else if (error) {
      return <span>guest</span>
    } else {
      return <span>{me.username}</span>
    }
  }
}

export const User = graphql(USERNAME_QUERY)(UserPresentation)
