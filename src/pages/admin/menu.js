import * as React from 'react'
import { Link } from '@reach/router'

import { Page, GuestOnly, AdminOnly } from '../../components'
import { DiagramList } from './diagramList'
import { NodeList } from './nodeList'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='Admin'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <AdminOnly>
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
        </AdminOnly>
      </Page>
    )
  }
}
