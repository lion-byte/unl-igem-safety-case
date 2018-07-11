import * as React from 'react'
import { hierarchy } from 'd3-hierarchy'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Tree } from '@vx/hierarchy'
import { LinkVertical } from '@vx/shape'

import { exportAsPNG, exportAsSVG } from '../../utils'
import { GoalNode } from './goal'
import { StrategyNode } from './strategy'
import { SolutionNode } from './solution'
import { ContextNode } from './context'
import { AssumptionNode } from './assumption'
import { JustificationNode } from './justification'

export class Node extends React.PureComponent {
  render () {
    const { node } = this.props

    let graphNode

    switch (node.data.type) {
      case 'assumption':
        graphNode = <AssumptionNode node={node} />
        break

      case 'context':
        graphNode = <ContextNode node={node} />
        break

      case 'goal':
        graphNode = <GoalNode node={node} />
        break

      case 'justification':
        graphNode = <JustificationNode node={node} />
        break

      case 'solution':
        graphNode = <SolutionNode node={node} width={100} />
        break

      case 'strategy':
        graphNode = <StrategyNode node={node} />
        break
    }

    return (
      <Group top={node.y} left={node.x}>
        {graphNode}
      </Group>
    )
  }
}

export class Link extends React.PureComponent {
  render () {
    const { link } = this.props

    return (
      <LinkVertical data={link} stroke='#374469' strokeWidth={2} fill='none' />
    )
  }
}

export default class Graph extends React.PureComponent {
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
        top: 80,
        left: 30,
        right: 40,
        bottom: 80
      },
      width,
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
          {...others}
          ref={diagram => (this.diagram = diagram)}
        >
          <LinearGradient id='lg' from='#fd9b93' to='#fe6e9e' />

          <rect width={width} height={height} rx={14} fill='#272b4d' />

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

        <button onClick={this.saveSVG}>Save as SVG</button>
        <button onClick={this.savePNG}>Save as PNG</button>
      </React.Fragment>
    )
  }
}

Graph.defaultProps = {
  className: '',
  data: {},
  height: 100,
  width: 100
}
