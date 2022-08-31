import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chat">Talk to B</Link></li>
        <li><Link to="/profile">Proflie</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation