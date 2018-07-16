import * as React from 'react'
import { graphql } from 'react-apollo'

import { DIAGRAM_LIST_QUERY } from '../../queries'
import { Diagram } from '../../components/diagram'

export class DiagramListPresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, diagrams }
    } = this.props

    if (loading || error) {
      return null
    }

    return diagrams.map(info => <Diagram key={info.id} {...info} />)
  }
}

export const DiagramList = graphql(DIAGRAM_LIST_QUERY, {
  options: {
    fetchPolicy: 'network-only'
  }
})(DiagramListPresentation)
