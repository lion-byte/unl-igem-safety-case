import * as React from 'react'
import { graphql } from 'react-apollo'

import { DIAGRAM_LIST_QUERY } from '../../queries'
import { Diagram } from '../../components'

export class DiagramListPresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, diagrams }
    } = this.props

    if (loading || error) {
      return null
    }

    if (diagrams.length === 0) {
      return <h3>No diagrams have been made</h3>
    }

    return diagrams.map(info => <Diagram key={info.id} {...info} />)
  }
}

export const DiagramList = graphql(DIAGRAM_LIST_QUERY, {
  options: {
    fetchPolicy: 'network-only'
  }
})(DiagramListPresentation)
