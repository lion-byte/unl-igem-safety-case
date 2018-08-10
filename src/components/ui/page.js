import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { ErrorBoundary } from './error'

export class Page extends React.PureComponent {
  render () {
    const { children, title, useDefaultTitle } = this.props

    return (
      <main className='flex one center'>
        {useDefaultTitle ? null : (
          <Helmet title={`${title} | UNL iGEM Safety Case`} />
        )}

        <h1>{title}</h1>

        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    )
  }
}

Page.propTypes = {
  title: PropTypes.string,
  useDefaultTitle: PropTypes.bool
}

Page.defaultProps = {
  title: '',
  useDefaultTitle: false
}
