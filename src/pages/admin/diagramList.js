import * as React from 'react'
import { graphql } from 'react-apollo'

import { Diagram } from '../../components'
import { ADMIN_DIAGRAM_LIST_QUERY } from '../../queries'

export class DiagramListPresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, diagrams }
    } = this.props

    if (loading) {
      return <h3>Loading...</h3>
    } else if (error) {
      return null
    } else if (diagrams.length === 0) {
      return <h3>No diagrams have been made</h3>
    } else {
      return diagrams.map(info => <Diagram key={info.id} data={info} admin />)
    }
  }
}

export const DiagramList = graphql(ADMIN_DIAGRAM_LIST_QUERY, {
  options: { fetchPolicy: 'network-only' }
})(DiagramListPresentation)
