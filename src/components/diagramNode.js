import * as React from 'react'
import { Link } from '@reach/router'

export class DiagramNode extends React.PureComponent {
  render () {
    const {
      data: { id, type, name, children, statement }
    } = this.props

    return (
      <section>
        <h3>
          <Link to={`/view/node/${id}`}>{name}</Link>

          <span className='label'>{type}</span>
        </h3>

        <p>{statement}</p>

        {Array.isArray(children) ? (
          <p>
            Children: [
            <span className='link-list-separation'>
              {children.map(node => (
                <Link key={node.id} to={`/view/node/${node.id}`}>
                  {node.name}
                </Link>
              ))}
            </span>
            ]
          </p>
        ) : null}
      </section>
    )
  }
}
