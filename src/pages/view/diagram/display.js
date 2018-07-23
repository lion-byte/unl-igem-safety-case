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

    return (
      <section>
        {fetching && <h2>Fetching</h2>}

        {!fetching && error !== null && <h2>Error</h2>}

        {!fetching && data !== null ? (
          <React.Fragment>
            <section>
              <Graph
                data={data.rootGoal}
                height={data.height}
                width={data.width}
                showExport
              />
            </section>

            <div className='flex one'>
              <div className='clearfix'>
                <section className='float-right'>
                  <Link
                    className='button error'
                    to={`/delete/diagram/${data.id}`}
                  >
                    Delete
                  </Link>

                  <Link className='button edit' to={`/edit/diagram/${data.id}`}>
                    Edit
                  </Link>
                </section>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </section>
    )
  }
}
