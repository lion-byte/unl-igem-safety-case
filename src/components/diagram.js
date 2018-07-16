import * as React from 'react'

export class Diagram extends React.PureComponent {
  render () {
    const { title, description, rootGoal, status, height, width } = this.props

    return (
      <section>
        <h3>
          {title}
          <span className='label warning'>{status}</span>
          <span className='label'>
            {width} x {height}
          </span>
        </h3>

        <p>{description}</p>

        {rootGoal ? (
          <p>
            Root goal ID: <u>{rootGoal.name}</u>
          </p>
        ) : null}
      </section>
    )
  }
}
