import * as React from 'react'

/**
 * Render text into multiple lines for `svg`.
 *
 * Delimited by new line character: `\n`.
 */
export class MultiLineText extends React.PureComponent {
  render () {
    const { text, x, dy, ...tspanProps } = this.props

    const lines = text.split('\n').map((line, index) => (
      <tspan key={index} x={x} dy={index === 0 ? 0 : dy} {...tspanProps}>
        {line}
      </tspan>
    ))

    return <React.Fragment>{lines}</React.Fragment>
  }
}
