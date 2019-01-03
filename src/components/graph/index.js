import * as React from 'react'
import * as PropTypes from 'prop-types'
import { hierarchy } from 'd3-hierarchy'
import { Tree } from '@vx/hierarchy'

import { exportAsPNG, exportAsSVG } from '../../utils'
import { Link } from './link'
import { Node } from './node'
import { MultiLineText } from './multiLineText'

export class Graph extends React.PureComponent {
  constructor (props) {
    super(props)

    this.diagram = null

    this.saveSVG = this.saveSVG.bind(this)
    this.savePNG = this.savePNG.bind(this)
  }

  async saveSVG () {
    const { diagram } = this

    exportAsSVG(diagram, 'diagram.svg')
  }

  async savePNG () {
    const { diagram } = this

    exportAsPNG(diagram, 'diagram.png')
  }

  render () {
    const {
      className,
      title,
      description,
      data: raw,
      height,
      margin = {
        top: 120,
        left: 40,
        right: 40,
        bottom: 120
      },
      style,
      width,
      middle,
      showExport
    } = this.props

    const data = hierarchy(raw)

    return (
      <div>
        <svg
          className={className}
          height={height}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: '100%', ...style }}
          ref={diagram => (this.diagram = diagram)}
        >
          <rect width={width} height={height} rx={16} fill='#272b4d' />

          {title && description && (
            <g transform={`translate(${width / 4}, 72)`}>
              <text
                style={{ pointerEvents: 'none' }}
                textAnchor='middle'
                fill='white'
                fontWeight='bolder'
                x={0}
                y={0}
                fontSize={24}
              >
                {title}
              </text>
              <text
                style={{ pointerEvents: 'none' }}
                textAnchor='middle'
                fill='white'
                fontWeight='bold'
                x={0}
                y={27}
                fontSize={14}
              >
                <MultiLineText text={description} />
              </text>
            </g>
          )}

          <Tree
            top={middle ? height / 2 : margin.top}
            left={margin.left}
            root={data}
            size={[
              width - (margin.left + margin.right),
              height - (margin.top + margin.bottom)
            ]}
            nodeComponent={Node}
            linkComponent={Link}
          />
        </svg>

        {showExport ? (
          <React.Fragment>
            <button onClick={this.saveSVG}>Save as SVG</button>
            <button onClick={this.savePNG}>Save as PNG</button>
          </React.Fragment>
        ) : null}
      </div>
    )
  }
}

Graph.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.any.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  middle: PropTypes.bool,
  showExport: PropTypes.bool
}

Graph.defaultProps = {
  height: 100,
  width: 100,
  middle: false,
  showExport: false
}

export default Graph
