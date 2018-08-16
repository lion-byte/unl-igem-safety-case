import * as React from 'react'

import { Page, MD, Image, GuestOnly, UserOnly } from '../../components'
import { description, acknowledgment } from './description'

export default class Home extends React.PureComponent {
  render () {
    return (
      <Page title='Home' useDefaultTitle>
        <div>
          <h2>
            Welcome
            <GuestOnly
              // @ts-ignore
              loader={null}
            >
              , esteemed guest
            </GuestOnly>
            <UserOnly>, dear user</UserOnly>!
          </h2>
        </div>

        <section>
          <MD content={description} />

          <MD content={acknowledgment} />

          <Image
            src='/img/nsf-logo.png'
            alt='NSF Logo'
            height={128}
            width={128}
          />
        </section>
      </Page>
    )
  }
}
