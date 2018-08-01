import * as React from 'react'
import * as PropTypes from 'prop-types'

import { renderMd } from '../utils'
import { LoaderEllipsis } from './ui'

export class MD extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      parsing: false,
      html: ''
    }

    this.convertMd = this.convertMd.bind(this)
  }

  componentDidMount () {
    this.convertMd()
  }

  async convertMd () {
    const { content } = this.props

    this.setState({ parsing: true })

    try {
      const html = await renderMd(content)

      this.setState({ parsing: false, html })
    } catch (error) {
      console.error(error)

      this.setState({ parsing: false })
    }
  }

  render () {
    const { parsing, html } = this.state

    if (parsing) {
      return (
        <div>
          <LoaderEllipsis />
        </div>
      )
    } else {
      return <section dangerouslySetInnerHTML={{ __html: html }} />
    }
  }
}

MD.defaultProps = {
  content: ''
}

MD.propTypes = {
  content: PropTypes.string
}
