import * as React from 'react'

import { Page } from '../../components'
import { Form } from './form'

export default class Register extends React.PureComponent {
  render () {
    return (
      <Page title='Register'>
        <Form />
      </Page>
    )
  }
}
