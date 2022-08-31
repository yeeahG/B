import { authService } from 'myFirebase'
import MyBList from 'Profile/MyBList';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  }

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Display name" 
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>

      <div>
        <MyBList userObj={userObj} />
      </div>
    </>
  )
}

export default Profile