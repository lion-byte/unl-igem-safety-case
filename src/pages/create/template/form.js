import * as React from 'react'

/**
 * @typedef {object} DiagramTemplateInfo
 * @property {} safetyFeature
 */

export class TemplateForm extends React.PureComponent {
  constructor (props) {
    super(props)

    /**
     * @type {DiagramTemplateInfo}
     */
    this.state = {
      safetyFeature: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return <form onSubmit={this.handleSubmit} />
  }
}
