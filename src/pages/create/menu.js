import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../components/ui'

export class Menu extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Model'>
        <section>
          <Link className='button' to='root'>
            Create Root Goal
          </Link>

          <Link className='button' to='sub-goal'>
            Create Sub-Goal
          </Link>
        </section>
      </Page>
    )
  }
}
