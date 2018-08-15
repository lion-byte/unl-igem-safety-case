import * as React from 'react'
import * as PropTypes from 'prop-types'

import { MultiLineText } from '../multiLineText'

export class GoalNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, statement, height = 80, width = 190 }
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
          y={-height / 3 + 2.5 * fontSize}
        >
          <MultiLineText text={statement} x={0} dy={fontSize} />
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
