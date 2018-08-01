import * as React from 'react'
import * as PropTypes from 'prop-types'

import { MultiLineText } from '../multiLineText'

export class ContextNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, statement, height = 60, width = 180 }
      }
    } = this.props

    return (
      <React.Fragment>
        <rect
          fill='#550d04'
          height={height}
          stroke='#ffffff'
          strokeWidth={1}
          width={width}
          x={-width / 2}
          y={-height / 2}
        />

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fill='white'
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

ContextNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

ContextNode.defaultProps = {
  fontSize: 16
}
