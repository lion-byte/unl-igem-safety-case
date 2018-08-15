import * as React from 'react'
import * as PropTypes from 'prop-types'

import { MultiLineText } from '../multiLineText'

export class StrategyNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, statement, height = 100, width = 190 }
      }
    } = this.props

    return (
      <React.Fragment>
        <rect
          height={height}
          fill='#ff611f'
          stroke='#ffffff'
          strokeWidth={1}
          width={width}
          x={-width / 2}
          y={-height / 2}
        />

        <text
          style={{ pointerEvents: 'none' }}
          fill='white'
          textAnchor='middle'
          fontSize={fontSize}
          fontWeight='bold'
          x={0}
          y={-height / 3 + fontSize}
        >
          {name}
        </text>

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fontSize={fontSize}
          x={0}
          y={-height / 3 + 2.5 * fontSize}
          fill='white'
        >
          <MultiLineText text={statement} x={0} dy={fontSize} />
        </text>
      </React.Fragment>
    )
  }
}

StrategyNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

StrategyNode.defaultProps = {
  fontSize: 16
}
