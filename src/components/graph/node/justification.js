import * as React from 'react'
import * as PropTypes from 'prop-types'

export class JustificationNode extends React.PureComponent {
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
          {name}
        </text>
      </React.Fragment>
    )
  }
}

JustificationNode.propTypes = {
  fontSize: PropTypes.number,
  node: PropTypes.any.isRequired
}

JustificationNode.defaultProps = {
  fontSize: 16
}
