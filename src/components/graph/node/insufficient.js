import * as React from 'react'
import * as PropTypes from 'prop-types'

import { MultiLineText } from '../multiLineText'

export class InsufficientNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, statement, height = 120, width = 120 }
      }
    } = this.props

    const side = Math.max(height, width)
    const hypotenuse = Math.sqrt(2) * side

    return (
      <React.Fragment>
        <rect
          fill='#ffffff'
          height={side}
          width={side}
          stroke='#000000'
          strokeWidth={1}
          transform='rotate(45)'
          x={-side / 2}
          y={-side / 2}
        />

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fontSize={fontSize}
          fontWeight='bold'
          x={0}
          y={-hypotenuse / 3 + fontSize}
          fill='black'
        >
          {name}
        </text>

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fontSize={fontSize}
          x={0}
          y={fontSize}
          fill='black'
        >
          <MultiLineText text={statement} x={0} dy={fontSize} />
        </text>
      </React.Fragment>
    )
  }
}

InsufficientNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

InsufficientNode.defaultProps = {
  fontSize: 16
}
