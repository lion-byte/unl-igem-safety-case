import * as React from 'react'
import { graphql } from 'react-apollo'

import { DiagramNode } from '../../components'
import { ADMIN_NODE_LIST_QUERY } from '../../queries'

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
      return nodes.map(info => <DiagramNode key={info.id} data={info} admin />)
    }
  }
}

export const NodeList = graphql(ADMIN_NODE_LIST_QUERY, {
  options: { fetchPolicy: 'network-only' }
})(NodeListPresentation)
