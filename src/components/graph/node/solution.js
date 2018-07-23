import * as React from 'react'
import * as PropTypes from 'prop-types'

export class SolutionNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, height = 120, width = 120 }
      }
    } = this.props

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
          {name}
        </text>
      </React.Fragment>
    )
  }
}

SolutionNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

SolutionNode.defaultProps = {
  fontSize: 16
}
