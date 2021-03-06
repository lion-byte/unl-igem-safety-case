import * as React from 'react'
import { LinkVertical } from '@vx/shape'

export class Link extends React.PureComponent {
  render () {
    const { link } = this.props

    return (
      <LinkVertical data={link} stroke='#8794a9' strokeWidth={2} fill='none' />
    )
  }
}
