import * as React from 'react'

import { getClient } from '../../client'
import { Page } from '../../components'
import { removeToken, getToken } from '../../utils'

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
      const client = await getClient()
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
