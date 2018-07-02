import * as React from 'react'
import * as PropTypes from 'prop-types'

export class GoalNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

    console.log(node)

    return (
      <React.Fragment>
        <ellipse
          rx={width / 2}
          ry={height / 2}
          fill='#af52d1'
          stroke='#ffffff'
          strokeWidth={1}
        />

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fontSize={fontSize}
          x={0}
          y={fontSize / 3}
          fill='white'
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
