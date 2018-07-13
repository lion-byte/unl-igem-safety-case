import * as React from 'react'
import * as PropTypes from 'prop-types'

export class JustificationNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

    return (
      <React.Fragment>
        <ellipse
          fill='#afd456'
          stroke='#ffffff'
          rx={width / 2}
          ry={height / 2}
          strokeWidth={1}
        />

        <text
          style={{ pointerEvents: 'none' }}
          textAnchor='middle'
          fill='black'
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

JustificationNode.propTypes = {
  height: PropTypes.number,
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired,
  width: PropTypes.number
}

JustificationNode.defaultProps = {
  height: 40,
  fontSize: 16,
  width: 160
}
