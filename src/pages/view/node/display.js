import * as React from 'react'
import { Link } from '@reach/router'
import { graphql } from 'react-apollo'

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

          <pre>{JSON.stringify(node, null, 2)}</pre>
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
