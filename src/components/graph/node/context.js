import * as React from 'react'
import * as PropTypes from 'prop-types'

export class ContextNode extends React.PureComponent {
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
          x={0}
          y={fontSize / 3}
        >
          {name}
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
