import React from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../routes/Home'
import Auth from '../routes/Auth'
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import Chat from 'routes/Chat';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ?
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/chat" element={<Chat userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
          </>
        :
          <>
            <Route path="/" element={<Auth />} />
          </>
        }
      </Routes>

    </Router>
  )
}

export default AppRouter