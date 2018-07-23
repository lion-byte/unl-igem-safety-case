import * as React from 'react'
import * as PropTypes from 'prop-types'

export class StrategyNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, height = 40, width = 160 }
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

StrategyNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

StrategyNode.defaultProps = {
  fontSize: 16
}
