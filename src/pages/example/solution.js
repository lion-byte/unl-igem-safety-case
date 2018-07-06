import * as React from 'react'
import * as PropTypes from 'prop-types'

export class SolutionNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

    return (
      <React.Fragment>
        <circle
          r={Math.max(height, width) / 2}
          fill='#035155'
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

SolutionNode.propTypes = {
  height: PropTypes.number,
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired,
  width: PropTypes.number
}

SolutionNode.defaultProps = {
  height: 40,
  fontSize: 16,
  width: 60
}
