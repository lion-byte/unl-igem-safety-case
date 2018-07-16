import * as React from 'react'
import * as PropTypes from 'prop-types'

export class AssumptionNode extends React.PureComponent {
  render () {
    const { height, fontSize, node, width } = this.props

    return (
      <React.Fragment>
        <ellipse
          fill='#54dfd5'
          stroke='#af95ff'
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

AssumptionNode.propTypes = {
  height: PropTypes.number,
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired,
  width: PropTypes.number
}

AssumptionNode.defaultProps = {
  height: 40,
  fontSize: 16,
  width: 160
}
