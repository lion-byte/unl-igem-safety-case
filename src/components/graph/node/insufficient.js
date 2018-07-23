import * as React from 'react'
import * as PropTypes from 'prop-types'

export class InsufficientNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, height = 120, width = 120 }
      }
    } = this.props

    const max = Math.max(height, width)

    return (
      <React.Fragment>
        <rect
          fill='#ffffff'
          height={max}
          stroke='#000000'
          strokeWidth={1}
          width={max}
          transform='rotate(45)'
          x={-max / 2}
          y={-max / 2}
        />

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fontSize={fontSize}
          x={0}
          y={fontSize / 3}
          fill='black'
        >
          {name}
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
