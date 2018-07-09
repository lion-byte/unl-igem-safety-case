import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import './styles/main.less'
import { App } from './app'

import(/* webpackChunkName: "client", webpackPreload: true */ './client').then(
  ({ client }) => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById('app')
    )
  }
)
