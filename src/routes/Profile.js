import { authService } from 'myFirebase'
import MyBList from 'Profile/MyBList';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
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

    if(userObj.displayName !== newDisplayName){
      await updateProfile(authService.currentUser, { 
        displayName: newDisplayName,
      });
      refreshUser();
      }
  }

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }

  return (
    <div className='container'>

      <div>
        <h2>Info</h2>
        <div>
          <button className='button' onClick={onLogOutClick}>Log Out</button>
        </div>
      </div>

      <div>
        <form onSubmit={onSubmit}>
          <label className='input__border'>
            <input 
              type="text" 
              placeholder="Display name" 
              onChange={onChange}
              value={newDisplayName}
              className='input'
            />
          </label>
          <input className='button' type="submit" value="Update" />
        </form>
      </div>

      <div>
        <MyBList userObj={userObj} />
      </div>

    </div>
  )
}

export default Profile