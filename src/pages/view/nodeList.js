import * as React from 'react'
import { graphql } from 'react-apollo'

import { NODE_LIST_QUERY } from '../../queries'
import { DiagramNode } from '../../components'

export class NodeListPresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, nodes }
    } = this.props

    if (loading) {
      return <h3>Loading...</h3>
    } else if (error) {
      return null
    } else if (nodes.length === 0) {
      return <h3>No nodes have been made</h3>
    } else {
      return nodes.map(info => <DiagramNode key={info.id} data={info} />)
    }
  }
}

export const NodeList = graphql(NODE_LIST_QUERY, {
  options: { fetchPolicy: 'network-only' }
})(NodeListPresentation)
