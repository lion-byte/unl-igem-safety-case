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
            style={{ height: undefined }}
          />

          <div className='flex one two-1200'>
            <div>
              <h3>Name: {node.name}</h3>

              <p>
                Type: <span className='label'>{node.type}</span>
              </p>

              <p>Statement: {node.statement}</p>
            </div>

            <div>
              {node.parent ? (
                <React.Fragment>
                  <h3>Parent</h3>

                  <Link to={`/view/node/${node.parent.id}`}>
                    {node.parent.name}
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
                          <Link to={`/view/node/${subNode.id}`}>
                            {subNode.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ) : null}
            </div>

            <div className='clearfix full-1200'>
              <div className='float-right'>
                <Link className='button error' to={`/delete/node/${node.id}`}>
                  Delete
                </Link>

                <Link className='button warning' to={`/edit/node/${node.id}`}>
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
