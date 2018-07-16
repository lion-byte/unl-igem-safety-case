import * as React from 'react'
import { graphql } from 'react-apollo'

import { NODE_LIST_QUERY } from '../../queries'
import { DiagramNode } from '../../components/DiagramNode'

export class NodeListPresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, nodes }
    } = this.props

    if (loading || error) {
      return null
    }

    return nodes.map(info => <DiagramNode key={info.id} {...info} />)
  }
}

export const NodeList = graphql(NODE_LIST_QUERY, {
  options: {
    fetchPolicy: 'network-only'
  }
})(NodeListPresentation)
