import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from '@reach/router'

export class DiagramNode extends React.PureComponent {
  render () {
    const {
      admin,
      data: { id, owner, type, name, children, statement }
    } = this.props

    return (
      <section>
        <h3>
          <Link to={admin ? `/admin/node/${id}` : `/view/node/${id}`}>
            {name}
          </Link>

          <span className='label'>{type}</span>

          {admin ? (
            <span className='label success'>Made by {owner}</span>
          ) : null}
        </h3>

        <p>{statement}</p>

        {Array.isArray(children) && children.length !== 0 && (
          <p>
            Children: [
            <span className='link-list-separation'>
              {children.map(node => (
                <Link
                  key={node.id}
                  to={
                    admin ? `/admin/node/${node.id}` : `/view/node/${node.id}`
                  }
                >
                  {node.name}
                </Link>
              ))}
            </span>
            ]
          </p>
        )}

        {Array.isArray(children) && children.length === 0 && (
          <p>Children: None yet</p>
        )}
      </section>
    )
  }
}

DiagramNode.propTypes = {
  admin: PropTypes.bool
}

DiagramNode.defaultProps = {
  admin: false
}
