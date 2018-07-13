import * as React from 'react'

import { Page } from '../../components/ui'
import { asyncComponent } from '../../utils'

const data = {
  type: 'goal',
  name: 'Root goal',
  statement: 'The product is safe',
  children: [
    {
      type: 'context',
      name: 'Environment context',
      statement: 'Outside'
    },
    {
      type: 'context',
      name: 'Operating context',
      statement: 'Lab'
    },
    {
      type: 'strategy',
      name: 'Root strategy',
      statement: 'Argument over the safety of the product',
      children: [
        {
          type: 'justification',
          name: 'Justified',
          statement: 'Something here'
        },
        { type: 'assumption', name: 'Assumed', statement: 'Something here' },
        {
          type: 'goal',
          name: 'SG1',
          statement: 'Subgoal 1',
          children: [
            {
              type: 'solution',
              name: 'Solution 1',
              statement: 'Something'
            }
          ]
        },
        {
          type: 'goal',
          name: 'SG2',
          statement: 'Subgoal 2',
          children: [
            {
              type: 'solution',
              name: 'Solution 2',
              statement: 'Something'
            }
          ]
        },
        {
          type: 'goal',
          name: 'SG3',
          statement: 'Subgoal 3',
          children: [
            {
              type: 'solution',
              name: 'Solution 3',
              statement: 'Something'
            }
          ]
        }
      ]
    }
  ]
}

const Graph = asyncComponent(() =>
  import(/* webpackChunkName: "graph" */ '../../components/graph')
)

export default class Example extends React.PureComponent {
  render () {
    return (
      <Page title='Example'>
        <section>
          <Graph
            data={data}
            height={640}
            style={{ width: '100%' }}
            width={1260}
          />
        </section>
      </Page>
    )
  }
}
