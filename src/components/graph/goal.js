import * as React from 'react'
import * as PropTypes from 'prop-types'

export class GoalNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

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
          {node.data.name}
        </text>
      </React.Fragment>
    )
  }
}

GoalNode.propTypes = {
  height: PropTypes.number,
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired,
  width: PropTypes.number
}

GoalNode.defaultProps = {
  height: 40,
  fontSize: 16,
  width: 60
}
