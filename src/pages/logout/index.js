import * as React from 'react'

import { Page } from '../../components/ui'
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
      const { client } = await import('../../client')
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
