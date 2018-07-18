import * as React from 'react'
import { Link } from '@reach/router'

export class Diagram extends React.PureComponent {
  render () {
    const { id, title, description, rootGoal, height, width } = this.props

    return (
      <section>
        <h3>
          <Link to={`/view/diagram/${id}`}>{title}</Link>
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
