import * as React from 'react'
import { navigate } from '@reach/router'

import { Input } from '../../../components'
import {
  safetyFeatures,
  generalAssumptions,
  generalEnvironments,
  generalJustifications,
  specificAssumptions,
  specificJustifications,
  createTemplate
} from '../../../diagram/template'

/**
 * @typedef {object} DiagramTemplateInfo
 * @property {string} title
 * @property {string} description

 * @property {number} safetyFeature
 * @property {number} generalAssumption
 * @property {number} generalJustification
 * @property {number} generalEnvironment

 * @property {number} subGoal
 * @property {number} specificAssumption
 * @property {number} specificJustification
 */

export class TemplateForm extends React.PureComponent {
  constructor (props) {
    super(props)

    /**
     * @type {DiagramTemplateInfo}
     */
    this.state = {
      title: '',
      description: '',
      safetyFeature: 0,
      generalAssumption: 0,
      generalJustification: 0,
      generalEnvironment: 0,
      subGoal: 0,
      specificAssumption: 0,
      specificJustification: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const {
      target: { value, name }
    } = event

    this.setState({
      [name]: value
    })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async handleSubmit (event) {
    event.preventDefault()

    const {
      title,
      description,
      safetyFeature,
      generalAssumption,
      generalJustification,
      generalEnvironment,
      subGoal,
      specificAssumption,
      specificJustification
    } = this.state

    if (!title.trim() || !description.trim()) {
      return
    }

    const diagramId = await createTemplate({
      title,
      description,
      safetyFeature,
      generalAssumption,
      generalJustification,
      generalEnvironment,
      subGoal,
      specificAssumption,
      specificJustification
    })

    if (diagramId) {
      navigate(`/edit/diagram/${diagramId}`)
    }
  }

  render () {
    const {
      title,
      description,
      safetyFeature,
      generalAssumption,
      generalJustification,
      generalEnvironment,
      subGoal,
      specificAssumption,
      specificJustification
    } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <fieldset>
              <Input
                type='text'
                label='Title'
                name='title'
                required
                value={title}
                onChange={this.handleChange}
              />

              <Input
                type='text'
                label='Description'
                name='description'
                required
                value={description}
                onChange={this.handleChange}
              />

              <label>
                Safety Feature
                <select
                  name='safetyFeature'
                  onChange={this.handleChange}
                  value={safetyFeature}
                >
                  {safetyFeatures.map((feature, index) => (
                    <option key={index} value={index}>
                      {feature.label}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>

            <hr />
          </div>

          <div>
            <hr />

            <fieldset>
              <label>
                General Assumption
                <select
                  name='generalAssumption'
                  onChange={this.handleChange}
                  value={generalAssumption}
                >
                  {generalAssumptions.map((assumption, index) => (
                    <option key={index} value={index}>
                      {assumption.label || assumption.value}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                General Environment
                <select
                  name='generalEnvironment'
                  onChange={this.handleChange}
                  value={generalEnvironment}
                >
                  {generalEnvironments.map((environment, index) => (
                    <option key={index} value={index}>
                      {environment.label || environment.value}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                General Justification
                <select
                  name='generalJustification'
                  onChange={this.handleChange}
                  value={generalJustification}
                >
                  {generalJustifications.map((justification, index) => (
                    <option key={index} value={index}>
                      {justification.label || justification.value}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>

            <hr />
          </div>

          <div>
            <hr />

            <fieldset>
              <label>
                Goal
                <select
                  name='subGoal'
                  onChange={this.handleChange}
                  value={subGoal}
                >
                  {safetyFeatures[safetyFeature].subGoals.map((goal, index) => (
                    <option key={index} value={index}>
                      {goal.label || goal.value}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Specific Assumption
                <select
                  name='specificAssumption'
                  onChange={this.handleChange}
                  value={specificAssumption}
                >
                  {specificAssumptions.map((assumption, index) => (
                    <option key={index} value={index}>
                      {assumption.label || assumption.value}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Specific Justification
                <select
                  name='specificJustification'
                  onChange={this.handleChange}
                  value={specificJustification}
                >
                  {specificJustifications.map((justification, index) => (
                    <option key={index} value={index}>
                      {justification.label || justification.value}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
          </div>

          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
    )
  }
}
