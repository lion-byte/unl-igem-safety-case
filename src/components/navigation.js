import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Link } from '@reach/router'

import { User } from './user'

export class Navigation extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = { checked: false }

    this.hideMenu = this.hideMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  hideMenu () {
    this.setState({ checked: false })
  }

  toggleMenu () {
    this.setState(prevState => ({ checked: !prevState.checked }))
  }

  render () {
    const { checked } = this.state
    const { routes } = this.props

    return (
      <nav>
        <Link className='brand' to='/'>
          <span>
            UNL iGEM Safety Case | <User />
          </span>
        </Link>

        <input
          id='nav'
          type='checkbox'
          className='show'
          checked={checked}
          onClick={this.toggleMenu}
        />
        <label htmlFor='nav' className='burger pseudo button'>
          &#9776;
        </label>

        <div className='menu'>
          {routes.map(route => (
            <Link
              key={route.to}
              className='pseudo button'
              onClick={this.hideMenu}
              to={route.to}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </nav>
    )
  }
}

Navigation.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  ).isRequired
}
