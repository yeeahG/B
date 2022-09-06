import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navigation = ({ userObj }) => {
  return (
    <nav className='navi__container' >
      <ul>
        <li><NavLink to="/" activeclassname='active'>Home</NavLink></li>
        <li><NavLink to="/chat" activeclassname='active'>Talk to B</NavLink></li>
        <li><NavLink to="/profile" activeclassname='active'>{userObj.displayName} Profile</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation