import * as React from 'react'
import { Redirect } from '@reach/router'
import { graphql } from 'react-apollo'

import { getClient } from '../../client'
import {
  LOGIN_MUTATION,
  USERNAME_QUERY,
  PERMISSIONS_QUERY
} from '../../queries'
import { setToken, getToken, removeToken } from '../../utils'

export class FormPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      success: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const {
      target: { value, name }
    } = event

    this.setState({ [name]: value })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const {
      props: { mutate },
      state: { email, password }
    } = this

    if (email.trim() === '' || password.trim() === '') {
      return
    }

    // If already signed in, quickly sign out
    if (getToken()) {
      removeToken()

      const client = await getClient()
      await client.resetStore()
    }

    try {
      await mutate({ variables: { email, password } })
      this.setState({ success: true })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {
      state: { email, password, success }
    } = this

    if (success) {
      return <Redirect to='/' noThrow />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className='flex center one two-1400'>
          <label>
            Email
            <input
              name='email'
              onChange={this.handleChange}
              required
              type='text'
              value={email}
            />
          </label>

          <label>
            Password
            <input
              name='password'
              onChange={this.handleChange}
              required
              type='password'
              value={password}
            />
          </label>
        </fieldset>

        <button>Login</button>
      </form>
    )
  }
}

export const Form = graphql(LOGIN_MUTATION, {
  options: {
    refetchQueries: ({ data: { login } }) => {
      setToken(login)

      return [{ query: USERNAME_QUERY }, { query: PERMISSIONS_QUERY }]
    }
  }
})(FormPresentation)
