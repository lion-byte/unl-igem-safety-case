import * as React from 'react'
import { Link } from '@reach/router'
import { graphql } from 'react-apollo'

import { Graph } from '../../../components'
import { ADMIN_NODE_QUERY } from '../../../queries'

export class DisplayNodePresentation extends React.PureComponent {
  render () {
    const {
      data: { loading, error, node }
    } = this.props

    if (loading) {
      return <h2>Loading...</h2>
    } else if (error || !node) {
      return null
    } else {
      return (
        <section>
          <Graph
            data={{ ...node, children: null }}
            height={node.height + 160}
            width={node.width + 80}
            middle
            style={{ height: undefined }}
          />

          <div className='flex one two-1200'>
            <div>
              <h3>
                Name: {node.name}
                <span className='label success'>Made by {node.owner}</span>
              </h3>

              <p>
                Type: <span className='label'>{node.type}</span>
              </p>

              <p>Statement: {node.statement}</p>
            </div>

            <div>
              {node.parent ? (
                <React.Fragment>
                  <h3>Parent</h3>

                  <Link to={`/admin/node/${node.parent.id}`}>
                    {node.parent.name}
                    <span className='label'>{node.parent.type}</span>
                  </Link>
                </React.Fragment>
              ) : null}

              {Array.isArray(node.children) ? (
                <React.Fragment>
                  <h3>Child nodes</h3>

                  {node.children.length === 0 ? (
                    <p>None yet</p>
                  ) : (
                    <ul>
                      {node.children.map(subNode => (
                        <li key={subNode.id}>
                          <Link to={`/admin/node/${subNode.id}`}>
                            {subNode.name}
                            <span className='label'>{subNode.type}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </section>
      )
    }
  }
}

export const DisplayNode = graphql(ADMIN_NODE_QUERY, {
  options: props => ({
    // @ts-ignore
    variables: { id: props.id },
    fetchPolicy: 'network-only'
  })
})(DisplayNodePresentation)
