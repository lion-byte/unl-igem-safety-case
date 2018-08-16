import * as React from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { PERMISSIONS_QUERY } from '../../queries/account'
import { LoaderEllipsis } from '../ui/spinners'

export class GuestPresentation extends React.PureComponent {
  render () {
    const {
      loader: Loader,
      children,
      data: { loading, error, permissions }
    } = this.props

    if (loading) {
      return Loader ? <Loader /> : null
    }

    if (error || permissions.level === 'GUEST') {
      return children
    } else {
      return null
    }
  }
}

GuestPresentation.propTypes = {
  loader: PropTypes.any,
  children: PropTypes.node
}

GuestPresentation.defaultProps = {
  loader: LoaderEllipsis,
  children: null
}

// @ts-ignore
export const GuestOnly = graphql(PERMISSIONS_QUERY)(GuestPresentation)
