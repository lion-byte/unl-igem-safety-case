import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, Router } from '@reach/router'

import { asyncPage } from '../utils/lazyload'
import { AppErrorBoundary } from './error'
import { Navigation } from './navigation'

const Home = asyncPage(() =>
  import(/* webpackChunkName: "home", webpackPrefetch: true */ '../pages/home')
)

const Admin = asyncPage(() =>
  import(/* webpackChunkName: "admin", webpackPrefetch: true */ '../pages/admin')
)

const Account = asyncPage(() =>
  import(/* webpackChunkName: "account", webpackPrefetch: true */ '../pages/account')
)

const Create = asyncPage(() =>
  import(/* webpackChunkName: "create", webpackPrefetch: true */ '../pages/create')
)

const Delete = asyncPage(() =>
  import(/* webpackChunkName: "delete", webpackPrefetch: true */ '../pages/delete')
)

const Edit = asyncPage(() =>
  import(/* webpackChunkName: "edit", webpackPrefetch: true */ '../pages/edit')
)

const Example = asyncPage(() =>
  import(/* webpackChunkName: "example", webpackPrefetch: true */ '../pages/example')
)

const Login = asyncPage(() =>
  import(/* webpackChunkName: "login", webpackPrefetch: true */ '../pages/login')
)

const Logout = asyncPage(() =>
  import(/* webpackChunkName: "logout", webpackPrefetch: true */ '../pages/logout')
)

const PageNotFound = asyncPage(() =>
  import(/* webpackChunkName: "404", webpackPrefetch: true */ '../pages/404')
)

const Register = asyncPage(() =>
  import(/* webpackChunkName: "register", webpackPrefetch: true */ '../pages/register')
)

const View = asyncPage(() =>
  import(/* webpackChunkName: "view", webpackPrefetch: true */ '../pages/view')
)

export class App extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <Helmet defaultTitle='UNL iGEM Safety Case' />

        <Navigation>
          <Link className='pseudo button' to='/'>
            Home
          </Link>

          <Link className='pseudo button' to='/create'>
            Create
          </Link>

          <Link className='pseudo button' to='/view'>
            View
          </Link>

          <Link className='pseudo button' to='/example'>
            Example
          </Link>

          <Link className='pseudo button' to='/account'>
            Account
          </Link>
        </Navigation>

        <section className='container'>
          <AppErrorBoundary>
            <Router>
              <Home path='/' />
              <Admin path='/admin/*' />
              <Account path='/account' />
              <Create path='/create/*' />
              <Edit path='/edit/*' />
              <Example path='/example' />
              <Delete path='/delete/*' />
              <Login path='/login' />
              <Logout path='/logout' />
              <Register path='/register' />
              <View path='/view/*' />
              <PageNotFound path='*' />
            </Router>
          </AppErrorBoundary>
        </section>
      </React.Fragment>
    )
  }
}

export default App
