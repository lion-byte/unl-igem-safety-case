import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
// @ts-ignore
import Loadable from 'react-loadable'

import './styles/main.less'
import { client } from './apollo'

const App = Loadable({
  loader: () =>
    import(/* webpackChunkName: "main", webpackPreload: true */ './app'),
  loading: () => null
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
)
