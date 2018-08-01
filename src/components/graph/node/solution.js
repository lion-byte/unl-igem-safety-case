import * as React from 'react'
import * as PropTypes from 'prop-types'

import { MultiLineText } from '../multiLineText'

export class SolutionNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, statement, height = 120, width = 120 }
      }
    } = this.props

    const diameter = Math.max(height, width)

    return (
      <React.Fragment>
        <circle
          r={diameter / 2}
          fill='#035155'
          stroke='#ffffff'
          strokeWidth={1}
        />

        <text
          style={{ pointerEvents: 'none' }}
          fill='white'
          textAnchor='middle'
          fontSize={fontSize}
          fontWeight='bold'
          x={0}
          y={-diameter / 3 + fontSize}
        >
          {name}
        </text>

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fill='white'
          fontSize={fontSize}
          x={0}
          y={fontSize}
        >
          <MultiLineText text={statement} x={0} dy={fontSize} />
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
