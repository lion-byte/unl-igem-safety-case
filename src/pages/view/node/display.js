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
          <Graph
            data={{ ...node, children: null }}
            height={node.height + 160}
            width={node.width + 80}
          />

          <div className='flex one two-1200'>
            <div>
              <h3>Name: {node.name}</h3>

              <p>
                Type: <span className='label'>{node.type}</span>
              </p>

              <p>Statement: {node.statement}</p>
            </div>

            {Array.isArray(node.children) ? (
              <div>
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
              </div>
            ) : null}

            <div className='clearfix full-1200'>
              <div className='float-right'>
                <Link className='button error' to={`/delete/node/${node.id}`}>
                  Delete
                </Link>

                <Link className='button edit' to={`/edit/node/${node.id}`}>
                  Edit
                </Link>

                {Array.isArray(node.children) ? (
                  <Link className='button' to={`/create/sub-node/${node.id}`}>
                    Add child node
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
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
