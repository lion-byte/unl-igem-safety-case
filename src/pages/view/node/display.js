import * as React from 'react'
import { Link } from '@reach/router'
import { graphql } from 'react-apollo'

import { Graph } from '../../../components'
import { NODE_QUERY } from '../../../queries'

export class DisplayNodePresentation extends React.PureComponent {
  render () {
    const {
      loading,
      error,
      data: { node }
    } = this.props

    if (loading || error || !node) {
      return null
    } else {
      return (
        <section>
          <Link className='pseudo button' to={`/edit/node/${node.id}`}>
            Edit
          </Link>

          <Graph
            data={node}
            height={node.height + 160}
            width={node.width + 80}
          />
        </section>
      )
    }
  }
}

export const DisplayNode = graphql(NODE_QUERY, {
  options: props => ({
    // @ts-ignore
    variables: { id: props.id },
    fetchPolicy: 'network-only'
  })
})(DisplayNodePresentation)
