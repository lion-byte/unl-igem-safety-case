import * as React from 'react'
import { hierarchy } from 'd3-hierarchy'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Tree } from '@vx/hierarchy'
import { LinkVertical } from '@vx/shape'

import { Goal } from './goal'
import { Argument } from './argument'
import { Solution } from './solution'

/**
 * @augments {React.PureComponent<{ node:{ data: Assumption | Condition | Justification | Solution | Argument | Goal } }>}
 */
export class Node extends React.PureComponent {
  render () {
    const { node } = this.props

    const width = 50
    const height = 20

    let graphNode

    switch (node.data.type) {
      case 'argument':
        graphNode = (
          <Argument
            height={height}
            fill='#035155'
            node={node}
            stroke='#ffffff'
            strokeWidth={1}
            width={width}
          />
        )
        break

      case 'goal':
        graphNode = (
          <Goal
            height={height}
            fill='#035155'
            node={node}
            stroke='#ffffff'
            strokeWidth={1}
            width={width}
          />
        )
        break

      case 'solution':
        graphNode = (
          <Solution
            height={height}
            fill='#035155'
            node={node}
            stroke='#ffffff'
            strokeWidth={1}
            width={width}
          />
        )
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
      <LinkVertical data={link} stroke='#374469' strokeWidth='1' fill='none' />
    )
  }
}

export default class Graph extends React.PureComponent {
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
      <svg
        className={className}
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
        {...others}
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
    )
  }
}

Graph.defaultProps = {
  className: '',
  data: {},
  height: 100,
  width: 100
}
