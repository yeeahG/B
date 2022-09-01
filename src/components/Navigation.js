import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ userObj }) => {
  return (
    <nav className='navi__container' >
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chat">Talk to B</Link></li>
        <li><Link to="/profile">{userObj.displayName} Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation