import * as React from 'react'
import { navigate, Link } from '@reach/router'
import { compose, graphql } from 'react-apollo'

import { DELETE_NODE_DIAGRAM, NODE_QUERY } from '../../../queries'
import { DiagramNode } from '../../../components'

export class RemoveNodePresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.confirmDelete = this.confirmDelete.bind(this)
  }

  async confirmDelete () {
    const { id, deleteNode } = this.props

    try {
      const {
        data: { deleteNode: deleteSuccess }
      } = await deleteNode({ variables: { id } })

      if (deleteSuccess) {
        navigate('/view')
      }
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const {
      id,
      data: { loading, error, node }
    } = this.props

    if (loading) {
      return <h2>Loading...</h2>
    } else if (error || !node) {
      return null
    } else {
      return (
        <section>
          <h2>Are you sure you want to delete this node?</h2>

          <DiagramNode data={node} />

          <button className='danger' onClick={this.confirmDelete}>
            Delete Node
          </button>

          <Link className='pseudo button' to={`/view/node/${id}`}>
            Cancel
          </Link>
        </section>
      )
    }
  }
}

export const RemoveNode = compose(
  graphql(NODE_QUERY, {
    options: props => ({
      // @ts-ignore
      variables: { id: props.id },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(DELETE_NODE_DIAGRAM, {
    name: 'deleteNode'
  })
)(RemoveNodePresentation)
