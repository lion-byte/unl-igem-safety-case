import * as React from 'react'
import * as PropTypes from 'prop-types'

export class GoalNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, height = 40, width = 160 }
      }
    } = this.props

    return (
      <React.Fragment>
        <ellipse
          fill='#af52d1'
          rx={width / 2}
          ry={height / 2}
          stroke='#ffffff'
          strokeWidth={1}
        />

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fill='white'
          fontSize={fontSize}
          x={0}
          y={fontSize / 3}
        >
          {name}
        </text>
      </React.Fragment>
    )
  }
}

GoalNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

GoalNode.defaultProps = {
  fontSize: 16
}
