import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
// @ts-ignore
import Loadable from 'react-loadable'
import { LoadingPage } from '../components/ui'
import { Navigation } from '../components/navigation'

const routes = [
  { label: 'Home', to: '/' },
  { label: 'Example', to: '/example' },
  { label: 'Login', to: '/login' }
]

const Home = Loadable({
  loader: () =>
    import(/* webpackChunkName: "home", webpackPrefetch: true */ '../pages/home'),
  loading: LoadingPage
})

const Example = Loadable({
  loader: () =>
    import(/* webpackChunkName: "example", webpackPrefetch: true */ '../pages/example'),
  loading: LoadingPage
})

const Login = Loadable({
  loader: () =>
    import(/* webpackChunkName: "login", webpackPrefetch: true */ '../pages/login'),
  loading: LoadingPage
})

export class App extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Helmet defaultTitle='UNL iGEM Safety Case' />

        <Navigation routes={routes} />

        <section className='container'>
          <Router>
            <Home path='/' />
            <Example path='/example' />
            <Login path='/login' />
          </Router>
        </section>
      </React.Fragment>
    )
  }
}
