import * as React from 'react'
import * as PropTypes from 'prop-types'

export class Solution extends React.PureComponent {
  render () {
    const { height, fill, node, stroke, strokeWidth, width } = this.props

    console.log(node)

    return (
      <React.Fragment>
        <rect
          height={height}
          fill={fill}
          width={width}
          x={-width / 2}
          y={-height / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />

        <text style={{ pointerEvents: 'none' }} fill='white'>
          {node.data.name}
        </text>
      </React.Fragment>
    )
  }
}

Solution.propTypes = {
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
  node: PropTypes.any.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number,
  width: PropTypes.number.isRequired
}

Solution.defaultProps = {
  fill: '',
  strokeWidth: 0
}
