import * as React from 'react'
import { hierarchy } from 'd3-hierarchy'
import { Tree } from '@vx/hierarchy'

import { exportAsPNG, exportAsSVG } from '../../utils'
import { Link } from './link'
import { Node } from './node'

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
      data: raw,
      height,
      margin = {
        top: 60,
        left: 40,
        right: 40,
        bottom: 80
      },
      style,
      width,
      showExport,
      ...others
    } = this.props

    const data = hierarchy(raw)

    return (
      <React.Fragment>
        <svg
          className={className}
          height={height}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: '100%', ...style }}
          {...others}
          ref={diagram => (this.diagram = diagram)}
        >
          <rect width={width} height={height} rx={16} fill='#272b4d' />

          <Tree
            top={margin.top}
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
      </React.Fragment>
    )
  }
}

Graph.defaultProps = {
  data: {},
  height: 100,
  width: 100,
  showExport: false
}

export default Graph
