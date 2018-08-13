import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { navigate } from '@reach/router'

import {
  CREATE_NODE_MUTATION,
  CREATE_DIAGRAM_MUTATION,
  UPDATE_NODE_MUTATION
} from '../../../queries'
import { Input } from '../../../components'

export class RootFormPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      rootGoalId: '',
      name: '',
      statement: '',
      sending: false
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
      props: { createNode, createDiagram, updateNode },
      state: { title, description, name, statement, rootGoalId }
    } = this

    if (
      title.trim() === '' ||
      description.trim() === '' ||
      name.trim() === '' ||
      statement.trim() === ''
    ) {
      return
    }

    this.setState({ sending: true })

    try {
      let id = rootGoalId

      if (id === '') {
        const {
          data: { createNode: result }
        } = await createNode({
          variables: { type: 'GOAL', name, statement }
        })

        id = result
      } else {
        await updateNode({
          variables: { id, name, statement }
        })
      }

      this.setState({ rootGoalId: id })

      const {
        data: { createDiagram: diagramId }
      } = await createDiagram({
        variables: { title, description, rootGoalId: id }
      })

      if (diagramId !== null) {
        navigate(`/edit/diagram/${diagramId}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.sending ? <h2>Sending</h2> : null}

        <div className='flex one two-800'>
          <div className='half-800'>
            <fieldset>
              <Input
                label='Diagram Title'
                type='text'
                name='title'
                onChange={this.handleChange}
                value={this.state.title}
              />

              <Input
                label='Diagram Description'
                type='textarea'
                name='description'
                onChange={this.handleChange}
                value={this.state.description}
              />
            </fieldset>
          </div>

          <div className='half-800'>
            <fieldset>
              <Input
                label='Root Goal Name'
                type='text'
                name='name'
                onChange={this.handleChange}
                value={this.state.name}
              />

              <Input
                label='Root Goal Statement'
                type='textarea'
                name='statement'
                onChange={this.handleChange}
                value={this.state.statement}
              />
            </fieldset>
          </div>
        </div>

        <div>
          <button>Save</button>
        </div>
      </form>
    )
  }
}

export const RootForm = compose(
  graphql(UPDATE_NODE_MUTATION, { name: 'updateNode' }),
  graphql(CREATE_NODE_MUTATION, { name: 'createNode' }),
  graphql(CREATE_DIAGRAM_MUTATION, { name: 'createDiagram' })
)(RootFormPresentation)
