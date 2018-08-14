import * as React from 'react'
import { Link } from '@reach/router'

import { Graph } from '../../../components'
import { adminFetchFullDiagram } from '../../../diagram'

export class DisplayDiagram extends React.PureComponent {
  constructor (props) {
    super(props)

    /**
     * @typedef {object} DiagramFetchState
     * @property {boolean} fetching
     * @property {Diagram} diagram
     * @property {Error} error
     */

    /**
     * @type {DiagramFetchState}
     */
    this.state = {
      fetching: false,
      diagram: null,
      error: null
    }
  }

  async componentDidMount () {
    const { id } = this.props

    if (!id) {
      return
    }

    this.setState({ error: null, fetching: true })

    try {
      const diagram = await adminFetchFullDiagram(id)

      this.setState({ diagram, fetching: false })
    } catch (error) {
      this.setState({ error, fetching: false })
    }
  }

  render () {
    const { fetching, error, diagram } = this.state

    if (fetching) {
      return <h2>Loading...</h2>
    } else if (error || !diagram || !diagram.rootGoal) {
      return <h2>Error</h2>
    } else {
      return (
        <section>
          <Graph
            data={diagram.rootGoal}
            height={diagram.height}
            width={diagram.width}
            style={{ maxHeight: '85vh' }}
            showExport
          />

          <div className='flex one two-1200'>
            <section>
              <h3>
                Title: {diagram.title}
                <span className='label success'>Made by {diagram.owner}</span>
              </h3>

              <p>Description: {diagram.description}</p>
            </section>

            <section>
              <h3>Root Goal</h3>

              <Link to={`/admin/node/${diagram.rootGoal.id}`}>
                {diagram.rootGoal.name}
              </Link>
            </section>
          </div>
        </section>
      )
    }
  }
}
