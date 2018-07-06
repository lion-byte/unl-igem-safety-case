import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Router } from '@reach/router'
// @ts-ignore
import Loadable from 'react-loadable'
import { LoadingPage } from '../components/ui'
import { Navigation } from '../components/navigation'

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

const Logout = Loadable({
  loader: () =>
    import(/* webpackChunkName: "logout", webpackPrefetch: true */ '../pages/logout'),
  loading: LoadingPage
})

const Register = Loadable({
  loader: () =>
    import(/* webpackChunkName: "register", webpackPrefetch: true */ '../pages/register'),
  loading: LoadingPage
})

export class App extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Helmet defaultTitle='UNL iGEM Safety Case' />

        <Navigation>
          <Link className='pseudo button' to='/'>
            Home
          </Link>

          <Link className='pseudo button' to='/example'>
            Example
          </Link>

          <Link className='pseudo button' to='/login'>
            Login
          </Link>

          <Link className='pseudo button' to='/logout'>
            Logout
          </Link>
        </Navigation>

        <section className='container'>
          <Router>
            <Home path='/' />
            <Example path='/example' />
            <Login path='/login' />
            <Logout path='/logout' />
            <Register path='/register' />
          </Router>
        </section>
      </React.Fragment>
    )
  }
}

export default App
