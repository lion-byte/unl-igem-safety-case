import * as React from 'react'
import { Link } from '@reach/router'

import { Page } from '../../components/ui'

export class RootGoal extends React.PureComponent {
  render () {
    return (
      <Page title='Create a Root Goal'>
        <section>
          <Link to='..'>&laquo; Back</Link>
        </section>

        <section>
          <form onSubmit={e => e.preventDefault}>
            <fieldset className='flex one two-800'>
              <label>
                Containment Facility
                <select>
                  <option>Safety Level One Lab</option>
                  <option>Safety Level Two Lab</option>
                  <option>Safety Level Three Lab</option>
                  <option>Safety Level Four Lab</option>
                </select>
              </label>

              <label>
                Risk Group
                <select>
                  <option>Risk Group One</option>
                  <option>Risk Group Two</option>
                  <option>Risk Group Three</option>
                  <option>Risk Group Four</option>
                </select>
              </label>
            </fieldset>

            <fieldset className='flex one two-800'>
              <label>
                Hazard Type
                <select>
                  <option>Cannot cause disease in healthy adults</option>
                  <option>
                    Can cause treatable or preventable disease in humans
                  </option>
                  <option>
                    Can cause serious disease in humans which might not have a
                    treatment or vaccine
                  </option>
                  <option>
                    Can cause serious disease in humans which has no known
                    treatment or vaccine
                  </option>
                </select>
              </label>
            </fieldset>

            <hr />

            <fieldset className='flex one two-800'>
              <label>
                Usage
                <select>
                  <option>The SEBOs</option>
                  <option>The SEBOs' outputs</option>
                </select>
              </label>
            </fieldset>

            <fieldset className='flex one two-800'>
              <label>
                Specific Environment
                <select>
                  <option>...</option>
                </select>
              </label>

              <label>
                Specific Parameter
                <select>
                  <option>...</option>
                </select>
              </label>
            </fieldset>
          </form>
        </section>
      </Page>
    )
  }
}
