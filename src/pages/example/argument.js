import * as React from 'react'
import * as PropTypes from 'prop-types'

export class ArgumentNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

    console.log(node)

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
          {node.data.name}
        </text>
      </React.Fragment>
    )
  }
}

ArgumentNode.propTypes = {
  height: PropTypes.number,
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired,
  width: PropTypes.number
}

ArgumentNode.defaultProps = {
  height: 40,
  fontSize: 16,
  width: 60
}
