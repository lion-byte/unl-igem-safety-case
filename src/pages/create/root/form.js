import * as React from 'react'
import { navigate } from '@reach/router'

import { Input } from '../../../components'
import { createNode, createDiagram } from '../../../diagram/freeform'

export class RootForm extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
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
      state: { title, description, name, statement }
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
      const id = await createNode({ type: 'GOAL', name, statement })

      this.setState({ rootGoalId: id })

      const diagramId = await createDiagram({
        title,
        description,
        rootGoalId: id,
        height: 480,
        width: 800
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
