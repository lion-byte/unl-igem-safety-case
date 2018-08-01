import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import './styles/main.less'
import { getClient } from './client'
import { asyncComponent } from './utils/lazyload'

const App = asyncComponent(() =>
  import(/* webpackChunkName: "app-router", webpackPreload: true */ './app')
)

getClient().then(client => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app')
  )
})
