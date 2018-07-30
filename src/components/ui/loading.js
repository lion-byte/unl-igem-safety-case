import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Page } from './page'
import { LoaderEllipsis } from './spinners'

export class Loading extends React.PureComponent {
  render () {
    const { className, error, pastDelay, retry, timedOut } = this.props

    if (error) {
      return (
        <div className={className}>
          Error!
          <button onClick={retry}>Retry</button>
        </div>
      )
    } else if (timedOut) {
      return (
        <div className={className}>
          Taking a while...
          <button onClick={retry}>Retry</button>
        </div>
      )
    } else if (pastDelay) {
      return (
        <div className={className}>
          Loading...
          <LoaderEllipsis />
        </div>
      )
    } else {
      return null
    }
  }
}

Loading.propTypes = {
  className: PropTypes.string
}

Loading.defaultProps = {
  className: ''
}

export class LoadingPage extends React.PureComponent {
  render () {
    const { error, pastDelay, retry, timedOut } = this.props

    if (error) {
      return (
        <Page useDefaultTitle>
          <h2>Error!</h2>

          <button onClick={retry}>Retry</button>
        </Page>
      )
    } else if (timedOut) {
      return (
        <Page useDefaultTitle>
          <h2>Taking a while...</h2>

          <button onClick={retry}>Retry</button>
        </Page>
      )
    } else if (pastDelay) {
      return (
        <Page useDefaultTitle>
          <h2>Loading...</h2>
        </Page>
      )
    } else {
      return null
    }
  }
}
