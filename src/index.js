import * as React from 'react'
import { render } from 'react-dom'
import ApolloProvider from 'react-apollo/ApolloProvider'

import './styles/main.less'
import { App } from './app'
import { getClient } from './client'

getClient().then(client => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app')
  )
})
