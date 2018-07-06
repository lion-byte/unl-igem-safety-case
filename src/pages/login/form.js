import * as React from 'react'
import { graphql } from 'react-apollo'

import { LOGIN_MUTATION, USERNAME_QUERY } from '../../queries'
import { setToken } from '../../utils'

export class FormPresentation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmail (event) {
    const {
      target: { value }
    } = event

    this.setState({ email: value })
  }

  handlePassword (event) {
    const {
      target: { value }
    } = event

    this.setState({ password: value })
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

    try {
      await mutate({ variables: { email, password } })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const {
      state: { email, password }
    } = this

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className='flex one two-1400'>
          <label>
            Email
            <input
              name='email'
              onChange={this.handleEmail}
              required
              type='text'
              value={email}
            />
          </label>

          <label>
            Password
            <input
              name='password'
              onChange={this.handlePassword}
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

      return [{ query: USERNAME_QUERY }]
    }
  }
})(FormPresentation)
