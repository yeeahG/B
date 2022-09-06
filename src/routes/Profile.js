import React from 'react'
import MyProfile from 'Profile/MyProfile';
import MyBList from 'Profile/MyBList';

const Profile = ({ userObj, refreshUser }) => {

  return (
    <div className='container'>
      <MyProfile userObj={userObj} refreshUser={refreshUser} />
      <MyBList userObj={userObj} />
    </div>
  )
}

export default Profile