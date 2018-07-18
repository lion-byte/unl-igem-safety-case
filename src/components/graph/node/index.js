import * as React from 'react'
import { Group } from '@vx/group'

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
      case 'ASSUMPTION':
      case 'assumption':
        graphNode = <AssumptionNode node={node} />
        break

      case 'CONTEXT':
      case 'context':
        graphNode = <ContextNode node={node} />
        break

      case 'GOAL':
      case 'goal':
        graphNode = <GoalNode node={node} />
        break

      case 'INSUFFICIENT':
      case 'insufficient':
        // TODO: Make InsufficientNode
        break

      case 'JUSTIFICATION':
      case 'justification':
        graphNode = <JustificationNode node={node} />
        break

      case 'SOLUTION':
      case 'solution':
        graphNode = <SolutionNode node={node} width={100} />
        break

      case 'STRATEGY':
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
