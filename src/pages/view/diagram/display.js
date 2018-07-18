import * as React from 'react'

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
                style={{ width: '100%' }}
              />
            </section>

            <section>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </section>
          </React.Fragment>
        ) : null}
      </section>
    )
  }
}
