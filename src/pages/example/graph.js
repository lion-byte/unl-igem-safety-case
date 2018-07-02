import * as React from 'react'
import { hierarchy } from 'd3-hierarchy'
import { LinearGradient } from '@vx/gradient'
import { Group } from '@vx/group'
import { Tree } from '@vx/hierarchy'
import { LinkVertical } from '@vx/shape'

import { GoalNode } from './goal'
import { ArgumentNode } from './argument'
import { SolutionNode } from './solution'

export class Node extends React.PureComponent {
  render () {
    const { node } = this.props

    let graphNode

    switch (node.data.type) {
      case 'argument':
        graphNode = <ArgumentNode node={node} />
        break

      case 'goal':
        graphNode = <GoalNode node={node} />
        break

      case 'solution':
        graphNode = <SolutionNode node={node} width={100} />
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
