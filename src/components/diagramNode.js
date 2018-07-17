import * as React from 'react'

export class DiagramNode extends React.PureComponent {
  render () {
    const { type, name, subNodes, statement } = this.props

    return (
      <section>
        <h3>
          {name}
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
