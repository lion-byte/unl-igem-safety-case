import * as React from 'react'

import { Page } from '../../components/ui'
import Graph from './graph'

/** @type {Goal} */
const data = {
  type: 'goal',
  name: 'test g',
  message: 'test goal',
  children: [
    {
      type: 'argument',
      name: 'test a',
      message: 'test argument',
      children: [
        {
          type: 'goal',
          message: 'test goal2',
          name: 'g2',
          children: [
            {
              name: 'solution 1',
              type: 'solution',
              message: 'hoi'
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
            width={960}
          />
        </section>
      </Page>
    )
  }
}
