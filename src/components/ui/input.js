import * as React from 'react'
import * as PropTypes from 'prop-types'

export class Input extends React.PureComponent {
  render () {
    const {
      className,
      label,
      min,
      max,
      step,
      name,
      onChange,
      required,
      type,
      value
    } = this.props

    switch (type) {
      case 'textarea':
        return (
          <label className={className}>
            {label}

            <textarea
              name={name}
              onChange={onChange}
              required={required}
              value={value}
              style={{ resize: 'vertical' }}
            />
          </label>
        )

      case 'checkbox':
        return (
          <label className={className}>
            <input
              type={type}
              name={name}
              onChange={onChange}
              required={required}
              checked={value}
            />

            <span className='checkable'>{label}</span>
          </label>
        )

      default:
        return (
          <label className={className}>
            {label}

            <input
              type={type}
              min={min}
              max={max}
              step={step}
              name={name}
              onChange={onChange}
              required={required}
              value={value}
            />
          </label>
        )
    }
  }
}

Input.defaultProps = {
  type: 'text'
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['textarea', 'text', 'number', 'password', 'checkbox']),
  value: PropTypes.any
}
