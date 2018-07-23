import * as React from 'react'
import { navigate, Link } from '@reach/router'
import { compose, graphql } from 'react-apollo'

import { DELETE_DIAGRAM_MUTATION, DIAGRAM_QUERY } from '../../../queries'
import { Diagram } from '../../../components'

export class RemoveDiagramPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.confirmDelete = this.confirmDelete.bind(this)
  }

  async confirmDelete () {
    const { id, deleteDiagram } = this.props

    try {
      const {
        data: { deleteDiagram: deleteSuccess }
      } = await deleteDiagram({ variables: { id } })

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
      data: { loading, error, diagram }
    } = this.props

    if (loading) {
      return <h2>Loading...</h2>
    } else if (error || !diagram) {
      return null
    } else {
      return (
        <section>
          <h2>Are you sure you want to delete this diagram?</h2>

          <Diagram data={diagram} />

          <button className='warning' onClick={this.confirmDelete}>
            Delete Diagram
          </button>

          <Link className='pseudo button' to={`/view/diagram/${id}`}>
            Cancel
          </Link>
        </section>
      )
    }
  }
}

export const RemoveDiagram = compose(
  graphql(DIAGRAM_QUERY, {
    options: props => ({
      // @ts-ignore
      variables: { id: props.id },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(DELETE_DIAGRAM_MUTATION, {
    name: 'deleteDiagram'
  })
)(RemoveDiagramPresentation)
