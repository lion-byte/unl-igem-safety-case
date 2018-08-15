import * as React from 'react'

export class ErrorBoundary extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })

    console.error({ error, info })
  }

  render () {
    const {
      props: { children },
      state: { hasError }
    } = this

    if (hasError) {
      return <h3>Something went wrong</h3>
    } else {
      return children || null
    }
  }
}
