import * as React from 'react'
import { Link } from '@reach/router'

import { adminFetchFullDiagram } from '../../../utils'
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
      const diagram = await adminFetchFullDiagram(id)

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
            style={{ maxHeight: '60vh' }}
            showExport
          />

          <div className='flex one two-1200'>
            <section>
              <h3>
                Title: {data.title}
                <span className='label success'>Made by {data.owner}</span>
              </h3>

              <p>Description: {data.description}</p>
            </section>

            <section>
              <h3>Root Goal</h3>

              <Link to={`/admin/node/${data.rootGoal.id}`}>
                {data.rootGoal.name}
              </Link>
            </section>
          </div>
        </section>
      )
    }
  }
}
