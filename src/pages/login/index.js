import * as React from 'react'

import { Page } from '../../components/ui'
import { Form } from './form'

export default class Login extends React.PureComponent {
  render () {
    return (
      <Page title='Login'>
        <div>
          <Form />
        </div>
      </Page>
    )
  }
}
