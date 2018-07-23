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

        <fieldset className='flex one four-800'>
          <Input
            label='Diagram Title'
            type='text'
            name='title'
            onChange={this.handleChange}
            value={this.state.title}
          />

          <Input
            className='three-fourth-800'
            label='Diagram Description'
            type='text'
            name='description'
            onChange={this.handleChange}
            value={this.state.description}
          />
        </fieldset>

        <hr />

        <fieldset className='flex one four-800'>
          <Input
            label='Root Goal Name'
            type='text'
            name='name'
            onChange={this.handleChange}
            value={this.state.name}
          />

          <Input
            className='three-fourth-800'
            label='Root Goal Statement'
            type='text'
            name='statement'
            onChange={this.handleChange}
            value={this.state.statement}
          />
        </fieldset>

        {/* <fieldset className='flex one two-800'>
          <label>
            Containment Facility
            <select>
              <option>Safety Level One Lab</option>
              <option>Safety Level Two Lab</option>
              <option>Safety Level Three Lab</option>
              <option>Safety Level Four Lab</option>
            </select>
          </label>

          <label>
            Risk Group
            <select>
              <option>Risk Group One</option>
              <option>Risk Group Two</option>
              <option>Risk Group Three</option>
              <option>Risk Group Four</option>
            </select>
          </label>
        </fieldset>

        <fieldset className='flex one two-800'>
          <label>
            Hazard Type
            <select>
              <option>Cannot cause disease in healthy adults</option>
              <option>
                Can cause treatable or preventable disease in humans
              </option>
              <option>
                Can cause serious disease in humans which might not have a
                treatment or vaccine
              </option>
              <option>
                Can cause serious disease in humans which has no known treatment
                or vaccine
              </option>
            </select>
          </label>
        </fieldset>

        <hr />

        <fieldset className='flex one two-800'>
          <label>
            Usage
            <select>
              <option>The SEBOs</option>
              <option>The SEBOs' outputs</option>
            </select>
          </label>
        </fieldset>

        <fieldset className='flex one two-800'>
          <label>
            Specific Environment
            <select>
              <option>...</option>
            </select>
          </label>

          <label>
            Specific Parameter
            <select>
              <option>...</option>
            </select>
          </label>
        </fieldset> */}

        <button>Save</button>
      </form>
    )
  }
}

export const RootForm = compose(
  graphql(UPDATE_NODE_MUTATION, { name: 'updateNode' }),
  graphql(CREATE_NODE_MUTATION, { name: 'createNode' }),
  graphql(CREATE_DIAGRAM_MUTATION, { name: 'createDiagram' })
)(RootFormPresentation)
