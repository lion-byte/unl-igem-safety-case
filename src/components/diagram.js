import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from '@reach/router'

export class Diagram extends React.PureComponent {
  render () {
    const {
      admin,
      data: { id, owner, title, description, rootGoal, height, width }
    } = this.props

    return (
      <section>
        <h3>
          <Link to={`/view/diagram/${id}`}>{title}</Link>

          <span className='label'>
            {width} x {height}
          </span>

          {admin ? (
            <span className='label success'>Made by {owner}</span>
          ) : null}
        </h3>

        <p>{description}</p>

        {rootGoal ? (
          <p>
            Root goal:{' '}
            <Link to={`/view/node/${rootGoal.id}`}>{rootGoal.name}</Link>
          </p>
        ) : null}
      </section>
    )
  }
}

Diagram.propTypes = {
  admin: PropTypes.bool
}

Diagram.defaultProps = {
  admin: false
}
