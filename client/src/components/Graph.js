import React from 'react'
import styled from 'styled-components'

import { hierarchy } from 'd3-hierarchy'
import { Tree } from '@vx/hierarchy'
import { LinkVertical } from '@vx/shape'

import { exportAsPNG, exportAsSVG } from '../lib/diagram'
import Button from './styles/Button'
import GraphNode from './GraphNode'

const StyledGraph = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-gap: 0.75em;

  svg {
    font-family: inherit;
  }

  .export-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
    grid-gap: 0.75em;
  }
`
/**
 * @typedef {object} GraphProps
 * @property {object} data
 * @property {number} [height]
 * @property {number} [padding]
 * @property {number} [width]
 * @property {boolean} [showExport]
 */

/** @augments {React.PureComponent<GraphProps>} */
export class Graph extends React.PureComponent {
  /** @param {SVGSVGElement} svg */
  setRef = svg => {
    this.svg = svg
  }

  exportPNG = () => exportAsPNG(this.svg)

  exportSVG = () => exportAsSVG(this.svg)

  render () {
    const { data, height, padding, showExport, width } = this.props

    const innerHeight = height - 2 * padding
    const innerWidth = width - 2 * padding

    const treeData = hierarchy(data)

    return (
      <StyledGraph>
        <svg viewBox={`0 0 ${width} ${height}`} ref={this.setRef}>
          <rect x='0' y='0' height='100%' width='100%' rx='16' fill='#041370' />

          <Tree
            top={padding}
            left={padding}
            size={[innerWidth, innerHeight]}
            root={treeData}
            linkComponent={GraphLink}
            nodeComponent={GraphNode}
          />
        </svg>

        {showExport && (
          <div className='export-options'>
            <Button onClick={this.exportPNG}>Export as PNG</Button>
            <Button onClick={this.exportSVG}>Export as SVG</Button>
          </div>
        )}
      </StyledGraph>
    )
  }
}

Graph.defaultProps = {
  height: 900,
  padding: 60,
  showExport: false,
  width: 1600
}

export default Graph

export const GraphLink = props => {
  const { link } = props

  return (
    <LinkVertical data={link} stroke='#f7d4e9' strokeWidth='2' fill='none' />
  )
}
