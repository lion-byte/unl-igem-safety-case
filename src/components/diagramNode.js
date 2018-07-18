import * as React from 'react'
import { Link } from '@reach/router'

export class DiagramNode extends React.PureComponent {
  render () {
    const { id, type, name, subNodes, statement } = this.props

    return (
      <section>
        <h3>
          <Link to={`/view/node/${id}`}>{name}</Link>

          <span className='label'>{type}</span>
        </h3>

        <p>{statement}</p>

        {Array.isArray(subNodes) ? (
          <p>
            Children: [{subNodes.map(node => (
              <React.Fragment key={node.id}>
                <u>{node.name}</u>
              </React.Fragment>
            ))}]
          </p>
        ) : null}
      </section>
    )
  }
}
