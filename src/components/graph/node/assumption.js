import * as React from 'react'
import * as PropTypes from 'prop-types'

export class AssumptionNode extends React.PureComponent {
  render () {
    const {
      fontSize,
      node: {
        data: { name, height = 40, width = 160 }
      }
    } = this.props

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
          {name}
        </text>
      </React.Fragment>
    )
  }
}

AssumptionNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

AssumptionNode.defaultProps = {
  fontSize: 16
}
