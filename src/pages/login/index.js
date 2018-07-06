import * as React from 'react'

import { Page } from '../../components/ui'
import { Form } from './form'
import { Link } from '@reach/router'

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
        </div>
      </Page>
    )
  }
}
