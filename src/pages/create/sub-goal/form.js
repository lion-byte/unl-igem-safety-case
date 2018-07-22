import * as React from 'react'
import { graphql } from 'react-apollo'
import { navigate } from '@reach/router'

import { CREATE_NODE_MUTATION } from '../../../queries'

export class GoalFormPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      statement: ''
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

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async handleSubmit (event) {
    event.preventDefault()

    const {
      props: { mutate },
      state: { name, statement }
    } = this

    if (name.trim() === '' || statement.trim() === '') {
      return
    }

    console.log('Submitting', { name, statement })

    try {
      const {
        data: { createNode: nodeId }
      } = await mutate({ variables: { type: 'GOAL', name, statement } })

      if (nodeId !== null) {
        navigate(`/edit/node/${nodeId}`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className='flex one four-800'>
          <label>
            Name
            <input
              type='text'
              name='name'
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>

          <label className='three-fourth-800'>
            Statement
            <input
              type='text'
              name='statement'
              onChange={this.handleChange}
              value={this.state.statement}
            />
          </label>
        </fieldset>

        <button>Save</button>
      </form>
    )
  }
}

export const GoalForm = graphql(CREATE_NODE_MUTATION)(GoalFormPresentation)
