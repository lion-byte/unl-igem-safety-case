import * as React from 'react'

import { Page } from '../../components'
import { Form } from './form'

export default class Register extends React.PureComponent {
  render () {
    return (
      <Page title='Register'>
        <Form />

        <section>
          <p>
            It's advised to not re-use a password and to create a new unique
            password.
          </p>
        </section>
      </Page>
    )
  }
}
