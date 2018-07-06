import * as React from 'react'

import { Page } from '../../components/ui'
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
