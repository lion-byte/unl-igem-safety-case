import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../components'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='Edit'>
        <section>
          <Link to='/create'>&laquo; Create</Link>
        </section>
      </Page>
    )
  }
}
