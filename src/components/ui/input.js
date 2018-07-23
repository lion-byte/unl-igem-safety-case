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

Input.defaultProps = {
  type: 'text'
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  value: PropTypes.any
}
