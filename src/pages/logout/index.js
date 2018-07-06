import * as React from 'react'

import { client } from '../../apollo'
import { removeToken, getToken } from '../../utils'
import { Page } from '../../components/ui'

export default class Logout extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      signedOut: false
    }
  }

  async componentDidMount () {
    if (getToken()) {
      removeToken()
      await client.resetStore()
    }

    this.setState({ signedOut: true })
  }

  render () {
    return (
      <Page title='Logout'>
        <h2>{this.state.signedOut ? 'Signed out' : 'Signing out'}</h2>
      </Page>
    )
  }
}
