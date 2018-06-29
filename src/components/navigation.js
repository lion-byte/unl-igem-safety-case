import * as React from 'react'
import { Link } from '@reach/router'

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

    return (
      <nav>
        <Link className='brand' to='/'>
          <span>UNL iGEM Safety Case</span>
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
          <Link className='pseudo button' onClick={this.hideMenu} to='/'>
            Home
          </Link>
        </div>
      </nav>
    )
  }
}
