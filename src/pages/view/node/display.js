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
          {Array.isArray(node.children) ? (
            <Link className='button' to={`/create/sub-node/${node.id}`}>
              Add child node
            </Link>
          ) : null}

          <Link className='pseudo button' to={`/edit/node/${node.id}`}>
            Edit
          </Link>

          <h3>Name: {node.name}</h3>

          <p>
            Type: <span className='label'>{node.type}</span>
          </p>

          <p>Statement: {node.statement}</p>

          <Graph
            data={{ ...node, children: null }}
            height={node.height + 160}
            width={node.width + 80}
          />

          {Array.isArray(node.children) ? (
            <React.Fragment>
              <h3>Child nodes</h3>

              {node.children.length === 0 ? (
                <p>None yet</p>
              ) : (
                <ul>
                  {node.children.map(subNode => (
                    <li key={subNode.id}>
                      <Link to={`/view/node/${subNode.id}`}>
                        {subNode.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ) : null}
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
