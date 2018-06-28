import * as React from 'react'
import * as PropTypes from 'prop-types'

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
      return <div className={className}>Loading...</div>
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
