import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navigation = ({ userObj }) => {
  return (
    <nav className='navi__container' >
      <ul>
        <li><NavLink to="/" activeClassName='active'>Home</NavLink></li>
        <li><NavLink to="/chat" activeClassName='active'>Talk to B</NavLink></li>
        <li><NavLink to="/profile" activeClassName='active'>{userObj.displayName} Profile</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation