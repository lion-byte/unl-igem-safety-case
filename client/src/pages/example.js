import React from 'react'

import Graph from '../components/Graph'

const data = {
  type: 'GOAL',
  name: 'Root goal',
  statement: 'The product is safe',
  children: [
    {
      type: 'CONTEXT',
      name: 'Environment context',
      statement: 'Outside',
      height: 70,
      width: 180
    },
    {
      type: 'CONTEXT',
      name: 'Operating Context',
      statement: 'Lab',
      height: 70,
      width: 180
    },
    {
      type: 'STRATEGY',
      name: 'Root Strategy',
      statement: 'Argument over the\nsafety of the product',
      height: 90,
      width: 170,
      children: [
        {
          type: 'JUSTIFICATION',
          name: 'Justified',
          statement: 'Something here'
        },
        { type: 'ASSUMPTION', name: 'Assumed', statement: 'Something here' },
        {
          type: 'GOAL',
          name: 'SG1',
          statement: 'Subgoal 1',
          children: [
            {
              type: 'SOLUTION',
              name: 'Solution 1',
              statement: 'Something',
              height: 110,
              width: 110
            }
          ]
        },
        {
          type: 'GOAL',
          name: 'SG2',
          statement: 'Subgoal 2',
          children: [
            {
              type: 'SOLUTION',
              name: 'Solution 2',
              statement: 'Something',
              height: 110,
              width: 110
            }
          ]
        },
        {
          type: 'GOAL',
          name: 'SG3',
          statement: 'Subgoal 3',
          children: [
            {
              type: 'INSUFFICIENT',
              name: 'No Solution',
              statement: 'Nothing',
              height: 110,
              width: 110
            }
          ]
        }
      ]
    }
  ]
}

const Example = props => (
  <div>
    <h1>Example Diagram</h1>

    <Graph data={data} padding={100} showExport />
  </div>
)

export default Example
