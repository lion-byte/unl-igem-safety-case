import React from 'react'

/**
 * @param {object} props
 * @param {string} props.text
 */
const SVGMultiLineText = props => {
  const { text, ...tspanProps } = props

  return text.split('\n').map((line, index) => (
    <tspan key={index} {...tspanProps}>
      {line}
    </tspan>
  ))
}

export default SVGMultiLineText
