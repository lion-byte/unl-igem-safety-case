import * as React from 'react'
import { Link } from '@reach/router'

import { fetchFullDiagram } from '../../../utils'
import { Graph } from '../../../components'

export class DisplayDiagram extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      fetching: false,
      data: null,
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
      const diagram = await fetchFullDiagram(id)

      this.setState({ data: diagram, fetching: false })
    } catch (error) {
      this.setState({ error, fetching: false })
    }
  }

  render () {
    const { fetching, error, data } = this.state

    if (fetching) {
      return <h2>Loading...</h2>
    } else if (error || !data || !data.rootGoal) {
      return <h2>Error</h2>
    } else {
      return (
        <section>
          <Graph
            data={data.rootGoal}
            height={data.height}
            width={data.width}
            style={{ maxHeight: '85vh' }}
            showExport
          />

          <div className='flex one two-1200'>
            <section>
              <h3>Title: {data.title}</h3>

              <p>Description: {data.description}</p>
            </section>

            <section>
              <h3>Root Goal</h3>

              <Link to={`/view/node/${data.rootGoal.id}`}>
                {data.rootGoal.name}
              </Link>
            </section>
          </div>

          <div className='flex one'>
            <div className='clearfix'>
              <section className='float-right'>
                <Link
                  className='button error'
                  to={`/delete/diagram/${data.id}`}
                >
                  Delete
                </Link>

                <Link
                  className='button warning'
                  to={`/edit/diagram/${data.id}`}
                >
                  Edit
                </Link>
              </section>
            </div>
          </div>
        </section>
      )
    }
  }
}
