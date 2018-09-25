import * as React from 'react'
import { Link } from '@reach/router'

import { DisplayDiagram } from './display'
import { Image, Page, GuestOnly, UserOnly } from '../../../components'

export class ViewDiagram extends React.PureComponent {
  render () {
    const { id } = this.props

    return (
      <Page title='View Diagram'>
        <GuestOnly>
          <h2>
            Please <Link to='/login'>log in</Link>
          </h2>
        </GuestOnly>

        <UserOnly>
          <section>
            <Link to='/view'>&laquo; View other diagrams</Link>
          </section>

          <DisplayDiagram id={id} />

          <section>
            <Image
              src='/img/badge.png'
              alt='UNL iGEM Collaboration 2018 Badge'
              height={256}
              width={256}
            />
          </section>
        </UserOnly>
      </Page>
    )
  }
}
