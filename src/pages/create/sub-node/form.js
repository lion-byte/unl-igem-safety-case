import * as React from 'react'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { Link, navigate } from '@reach/router'

import { DiagramNode, Input } from '../../../components'
import {
  createNode,
  generalAssumptions,
  specificAssumptions,
  generalJustifications,
  specificJustifications,
  generalEnvironments,
  safetyFeatures
} from '../../../diagram'
import { NODE_QUERY } from '../../../queries'

export class NodeFormPresentation extends React.PureComponent {
  constructor (props) {
    super(props)

    /**
     * @typedef {object} CreateNodeState
     * @property {boolean} useTemplate
     * @property {NodeType} type
     * @property {string} name
     * @property {string} statement
     */

    /**
     * @type {CreateNodeState}
     */
    this.state = {
      // @ts-ignore
      type: 'ASSUMPTION',
      useTemplate: false,
      name: '',
      statement: ''
    }

    this.setTemplate = this.setTemplate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setTemplate (options) {
    const { name, statement } = options

    this.setState({ name, statement })
  }

  handleChange (event) {
    const {
      target: { name, value, type, checked }
    } = event

    this.setState({ [name]: type === 'checkbox' ? checked : value })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async handleSubmit (event) {
    event.preventDefault()

    const {
      props: { id: parentId },
      state: { type, name, statement }
    } = this

    if (name.trim() === '' || statement.trim() === '') {
      return
    }

    try {
      const newId = await createNode({ type, name, statement, parentId })

      if (!newId) {
        throw Error('Node not created')
      } else {
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
      state: { type, name, statement, useTemplate }
    } = this

    if (loading) {
      return <h2>Loading</h2>
    } else if (error || !node) {
      return null
    } else {
      return (
        <section className='flex one two-1200'>
          <div>
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
              <hr />

              <Input
                label='Show Templates'
                name='useTemplate'
                type='checkbox'
                onChange={this.handleChange}
                value={useTemplate}
              />

              <hr />

              {useTemplate && (
                <TemplateTypeSwitch
                  type={type}
                  setTemplate={this.setTemplate}
                />
              )}
            </section>
          </div>

          <section>
            <h2>Parent Node</h2>

            <DiagramNode data={node} />
          </section>
        </section>
      )
    }
  }
}

export const NodeForm = graphql(NODE_QUERY, {
  options: props => ({
    // @ts-ignore
    variables: { id: props.id },
    fetchPolicy: 'network-only'
  }),
  name: 'parentNode'
})(NodeFormPresentation)

export class TemplateTypeSwitch extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      safetyFeature: 0
    }

    this.chooseFeature = this.chooseFeature.bind(this)
  }

  chooseFeature (event) {
    const {
      target: { value }
    } = event

    this.setState({ safetyFeature: value })
  }

  render () {
    const {
      props: { type, setTemplate },
      state: { safetyFeature }
    } = this

    const MainSafetyFeature = () => (
      <label>
        Safety Feature
        <select
          value={safetyFeature}
          name='safetyFeature'
          onChange={this.chooseFeature}
        >
          {safetyFeatures.map((feature, index) => (
            <option key={index} value={index}>
              {feature.label}
            </option>
          ))}
        </select>
      </label>
    )

    switch (type) {
      case 'ASSUMPTION':
        return (
          <div>
            <h3>General Assumptions</h3>

            {generalAssumptions.map(assumption => (
              <SetTemplateButton
                key={assumption.value}
                onClick={setTemplate}
                template={assumption}
                defaultName='General Assumption'
              />
            ))}

            <h3>Specific Assumptions</h3>

            {specificAssumptions.map(assumption => (
              <SetTemplateButton
                key={assumption.value}
                onClick={setTemplate}
                template={assumption}
                defaultName='Specific Assumption'
              />
            ))}
          </div>
        )

      case 'CONTEXT':
        return (
          <div>
            <h3>General Environment</h3>

            {generalEnvironments.map(env => (
              <SetTemplateButton
                key={env.value}
                onClick={setTemplate}
                template={env}
                defaultName='General Environment'
              />
            ))}
          </div>
        )

      case 'GOAL':
        return (
          <div>
            <MainSafetyFeature />

            <h3>Sub-Goal</h3>

            {safetyFeatures[safetyFeature].subGoals.map(goal => (
              <SetTemplateButton
                key={goal.value}
                onClick={setTemplate}
                template={goal}
                defaultName='Sub-Goal'
              />
            ))}
          </div>
        )

      // case 'INSUFFICIENT':
      case 'JUSTIFICATION':
        return (
          <div>
            <h3>General Justifications</h3>

            {generalJustifications.map(justification => (
              <SetTemplateButton
                key={justification.value}
                onClick={setTemplate}
                template={justification}
                defaultName='General Justification'
              />
            ))}

            <h3>Specific Justifications</h3>

            {specificJustifications.map(justification => (
              <SetTemplateButton
                key={justification.value}
                onClick={setTemplate}
                template={justification}
                defaultName='Specific Justification'
              />
            ))}
          </div>
        )

      // case 'SOLUTION':
      case 'STRATEGY':
        const { argument } = safetyFeatures[safetyFeature]

        return (
          <div>
            <MainSafetyFeature />

            <h3>Argument</h3>

            <SetTemplateButton
              onClick={setTemplate}
              template={argument}
              defaultName='Argument'
            />
          </div>
        )

      default:
        return (
          <div>
            <h3>None yet for: {type.toLowerCase()}</h3>
          </div>
        )
    }
  }
}

TemplateTypeSwitch.propTypes = {
  type: PropTypes.oneOf([
    'ASSUMPTION',
    'CONTEXT',
    'GOAL',
    'INSUFFICIENT',
    'JUSTIFICATION',
    'SOLUTION',
    'STRATEGY'
  ]),
  setTemplate: PropTypes.func.isRequired
}

export class SetTemplateButton extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { onClick, template, defaultName } = this.props

    onClick({
      name: template.label || defaultName,
      statement: template.value
    })
  }

  render () {
    const { template } = this.props

    return (
      <button className='success' onClick={this.handleClick}>
        {template.label || template.value}
      </button>
    )
  }
}

SetTemplateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  defaultName: PropTypes.string.isRequired,
  template: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any.isRequired
  }).isRequired
}
