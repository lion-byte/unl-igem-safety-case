import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
// @ts-ignore
import Loadable from 'react-loadable'
import { Loading } from '../components/ui'
import { Navigation } from '../components/navigation'

const Main = Loadable({
  loader: () =>
    import(/* webpackChunkName: "main", webpackPrefetch: true */ '../pages/main'),
  loading: Loading
})

export class App extends React.PureComponent {
  render () {
    return (
      <main>
        <Helmet defaultTitle='UNL iGEM Safety Case' />

        <Navigation />

        <Router>
          <Main path='/' />
        </Router>
      </main>
    )
  }
}
