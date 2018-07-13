import * as React from 'react'
import * as PropTypes from 'prop-types'

export class ContextNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

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
          {node.data.name}
        </text>
      </React.Fragment>
    )
  }
}

ContextNode.propTypes = {
  height: PropTypes.number,
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired,
  width: PropTypes.number
}

ContextNode.defaultProps = {
  height: 40,
  fontSize: 16,
  width: 160
}
