import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../components/ui'

export class SubGoal extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Sub-Goal'>
        <section>
          <Link to='..'>&laquo; Back</Link>
        </section>

        <section>
          <form onSubmit={e => e.preventDefault()}>
            <fieldset className='flex one two-800'>
              <label>
                Safety Environment type
                <select>
                  <option>Containment</option>
                  <option>Kill-switch</option>
                  <option>Auxotrophy</option>
                  <option>Degradation</option>
                </select>
              </label>
            </fieldset>
          </form>
        </section>
      </Page>
    )
  }
}
