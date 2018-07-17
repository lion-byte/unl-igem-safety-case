import * as React from 'react'

export class Diagram extends React.PureComponent {
  render () {
    const { title, description, rootGoal, height, width } = this.props

    return (
      <section>
        <h3>
          {title}
          <span className='label'>
            {width} x {height}
          </span>
        </h3>

        <p>{description}</p>

        {rootGoal ? (
          <p>
            Root goal name: <u>{rootGoal.name}</u>
          </p>
        ) : null}
      </section>
    )
  }
}
