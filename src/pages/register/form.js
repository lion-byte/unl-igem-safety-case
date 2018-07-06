import * as React from 'react'
import { Redirect } from '@reach/router'
import { graphql } from 'react-apollo'

import { REGISTER_MUTATION, USERNAME_QUERY } from '../../queries'
import { setToken } from '../../utils'

export class FormPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
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
      state: { email, password, confirmPassword, username }
    } = this

    if (
      email.trim() === '' ||
      password.trim() === '' ||
      username.trim() === '' ||
      password !== confirmPassword
    ) {
      return
    }

    try {
      await mutate({ variables: { email, password, username } })
      this.setState({ success: true })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const { email, password, confirmPassword, username, success } = this.state

    if (success) {
      return <Redirect to='/' noThrow />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className='flex one two-1400'>
          <label className='full-1400'>
            Username
            <input
              name='username'
              onChange={this.handleChange}
              required
              type='text'
              value={username}
            />
          </label>

          <label className='full-1400'>
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

          <label>
            Confirm Password
            <input
              name='confirmPassword'
              onChange={this.handleChange}
              required
              type='password'
              value={confirmPassword}
            />
          </label>
        </fieldset>

        <button>Register</button>
      </form>
    )
  }
}

export const Form = graphql(REGISTER_MUTATION, {
  options: {
    refetchQueries: ({ data: { register } }) => {
      setToken(register)

      return [{ query: USERNAME_QUERY }]
    }
  }
})(FormPresentation)
