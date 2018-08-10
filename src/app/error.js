import * as React from 'react'

export class AppErrorBoundary extends React.PureComponent {
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
      return <h1>Error</h1>
    } else {
      return children
    }
  }
}
