import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import './styles/main.less'
import { client } from './client'
import { App } from './app'

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
)
