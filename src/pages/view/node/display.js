import * as React from 'react'
import { graphql } from 'react-apollo'

import { NODE_QUERY } from '../../../queries'

export class DisplayNodePresentation extends React.PureComponent {
  render () {
    const {
      loading,
      error,
      data: { node }
    } = this.props

    if (loading || error) {
      return null
    }

    return <pre>{JSON.stringify(node, null, 2)}</pre>
  }
}

export const DisplayNode = graphql(NODE_QUERY, {
  options: props => ({
    // @ts-ignore
    variables: { id: props.id },
    fetchPolicy: 'network-only'
  })
})(DisplayNodePresentation)
