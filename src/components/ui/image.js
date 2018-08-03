import * as React from 'react'
import * as PropTypes from 'prop-types'

export class Image extends React.PureComponent {
  render () {
    const { className, style, src, alt, height, width } = this.props

    return (
      <img
        className={className}
        style={style}
        src={src}
        alt={alt}
        height={height}
        width={width}
      />
    )
  }
}

Image.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
}
