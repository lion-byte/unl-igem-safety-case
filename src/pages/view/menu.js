import * as React from 'react'

import { Page } from '../../components'
import { DiagramList } from './diagramList'
import { NodeList } from './nodeList'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='View'>
        <h2>Diagrams</h2>
        <section>
          <DiagramList />
        </section>

        <section>
          <hr />
        </section>

        <h2>Nodes</h2>
        <section>
          <NodeList />
        </section>
      </Page>
    )
  }
}
