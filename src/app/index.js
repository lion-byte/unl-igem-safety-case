import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
// @ts-ignore
import Loadable from 'react-loadable'
import { Loading } from '../components/ui'
import { Navigation } from '../components/navigation'

const Home = Loadable({
  loader: () =>
    import(/* webpackChunkName: "main", webpackPrefetch: true */ '../pages/home'),
  loading: Loading
})

export class App extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Helmet defaultTitle='UNL iGEM Safety Case' />

        <Navigation />

        <Router>
          <Home path='/' />
        </Router>
      </React.Fragment>
    )
  }
}
