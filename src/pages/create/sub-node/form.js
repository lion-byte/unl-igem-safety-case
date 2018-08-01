import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { Link, navigate } from '@reach/router'

import { DiagramNode, Input } from '../../../components'
import {
  NODE_QUERY,
  CREATE_NODE_MUTATION,
  UPDATE_NODE_MUTATION,
  ADD_CHILD_NODE_MUTATION
} from '../../../queries'

export class NodeFormPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      nodeId: '',
      type: 'ASSUMPTION',
      name: '',
      statement: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const {
      target: { name, value }
    } = event

    this.setState({ [name]: value })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async handleSubmit (event) {
    event.preventDefault()

    const {
      props: { id, createNode, updateNode, addChildNode },
      state: { nodeId, type, name, statement }
    } = this

    if (name.trim() === '' || statement.trim() === '') {
      return
    }

    try {
      let newId = nodeId

      if (newId === '') {
        const {
          data: { createNode: result }
        } = await createNode({ variables: { type, name, statement } })

        newId = result
      } else {
        await updateNode({
          variables: { id: newId, name, statement }
        })
      }

      if (!newId) {
        throw Error('Node not created')
      }

      this.setState({ nodeId: newId })

      const {
        data: { addChildNode: addChildSuccess }
      } = await addChildNode({
        variables: { parentId: id, childId: newId }
      })

      if (addChildSuccess) {
        navigate(`/edit/node/${newId}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const {
      props: {
        parentNode: { loading, error, node }
      },
      state: { type, name, statement }
    } = this

    if (loading) {
      return <h2>Loading</h2>
    } else if (error || !node) {
      return null
    } else {
      return (
        <section className='flex one two-1200'>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>
                Type
                <select name='type' value={type} onChange={this.handleChange}>
                  <option value='ASSUMPTION'>Assumption</option>
                  <option value='CONTEXT'>Context</option>
                  <option value='GOAL'>Goal</option>
                  <option value='INSUFFICIENT'>Insufficient</option>
                  <option value='JUSTIFICATION'>Justification</option>
                  <option value='SOLUTION'>Solution</option>
                  <option value='STRATEGY'>Strategy</option>
                </select>
              </label>
            </fieldset>

            <fieldset>
              <Input
                label='Name'
                name='name'
                type='text'
                onChange={this.handleChange}
                value={name}
              />

              <Input
                label='Statement'
                name='statement'
                type='textarea'
                onChange={this.handleChange}
                value={statement}
              />
            </fieldset>

            <button>Save</button>

            <Link className='pseudo button' to={`/view/node/${node.id}`}>
              Cancel
            </Link>
          </form>

          <section>
            <h2>Parent Node</h2>
            <DiagramNode data={node} />
          </section>
        </section>
      )
    }
  }
}

export const NodeForm = compose(
  graphql(NODE_QUERY, {
    options: props => ({
      // @ts-ignore
      variables: { id: props.id },
      fetchPolicy: 'network-only'
    }),
    name: 'parentNode'
  }),
  graphql(CREATE_NODE_MUTATION, { name: 'createNode' }),
  graphql(UPDATE_NODE_MUTATION, { name: 'updateNode' }),
  graphql(ADD_CHILD_NODE_MUTATION, { name: 'addChildNode' })
)(NodeFormPresentation)
