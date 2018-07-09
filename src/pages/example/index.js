import * as React from 'react'

import Graph from '../../components/graph'
import { Page } from '../../components/ui'

/** @type {Goal} */
const data = {
  type: 'goal',
  name: 'Root goal',
  message: 'The product is safe',
  children: [
    {
      type: 'condition',
      name: 'Environment condition',
      message: 'Outside'
    },
    {
      type: 'condition',
      name: 'Operating condition',
      message: 'Lab'
    },
    {
      type: 'strategy',
      name: 'Root strategy',
      message: 'Argument over the safety of the product',
      children: [
        { type: 'justification', name: 'Justified', message: 'Something here' },
        { type: 'assumption', name: 'Assumed', message: 'Something here' },
        {
          type: 'goal',
          name: 'SG1',
          message: 'Subgoal 1',
          children: [
            {
              type: 'solution',
              name: 'Solution 1',
              message: 'Something'
            }
          ]
        },
        {
          type: 'goal',
          name: 'SG2',
          message: 'Subgoal 2',
          children: [
            {
              type: 'solution',
              name: 'Solution 2',
              message: 'Something'
            }
          ]
        },
        {
          type: 'goal',
          name: 'SG3',
          message: 'Subgoal 3',
          children: [
            {
              type: 'solution',
              name: 'Solution 3',
              message: 'Something'
            }
          ]
        }
      ]
    }
  ]
}

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
