import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../components'
import { Form } from './form'

export default class Login extends React.PureComponent {
  render () {
    return (
      <Page title='Login'>
        <div>
          <Form />
        </div>
        <div>
          <p>
            New to the site? <Link to='/register'> Register an account.</Link>
          </p>

          <p>This website does not store sensitive data.</p>
        </div>
      </Page>
    )
  }
}
