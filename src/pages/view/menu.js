import * as React from 'react'
import { Link } from '@reach/router'

import { Page, UserOnly, GuestOnly } from '../../components'
import { DiagramList } from './diagramList'
import { NodeList } from './nodeList'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='View'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
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
        </UserOnly>
      </Page>
    )
  }
}
