import * as React from 'react'
import { Link } from '@reach/router'

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

          <section>
            <h2>Example Diagram</h2>

            <p>
              View the <Link to='/example'>example diagram</Link> for the format
              described above.
            </p>
          </section>

          <MD content={acknowledgment} />

          <div>
            <Image
              src='/img/nsf-logo.png'
              alt='National Science Foundation Logo'
              height={128}
              width={128}
            />

            <Image
              src='/img/nij-logo.png'
              alt='National Institute of Justice Logo'
              height={128}
              width={128}
            />
          </div>
        </section>

        <section>
          <h2>Collaboration</h2>

          <p>
            If your team chooses to create a safety case, place this badge in
            your wiki along with an image of your safety case.
          </p>

          <Image
            src='/img/badge.png'
            alt='UNL iGEM Collaboration 2018 Badge'
            height={256}
            width={256}
          />
        </section>

        <section>
          <h2>Privacy and Storage</h2>

          <p>
            This site stores data in the browser solely for authentication
            purposes. Continued use of the web application means that you
            consent to our use of storage.
          </p>
        </section>
      </Page>
    )
  }
}
