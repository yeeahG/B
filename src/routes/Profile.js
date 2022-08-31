import { authService } from 'myFirebase'
import MyBe from 'Profile/MyBe';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }

  return (
    <>
      <form>
        <input type="text" placeholder="Display name" />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>

      <div>
        <MyBe userObj={userObj} />
      </div>
    </>
  )
}

export default Profile