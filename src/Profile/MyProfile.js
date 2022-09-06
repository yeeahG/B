import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth';
import { authService } from 'myFirebase';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import './Profile.css'

const MyProfile = ({ userObj, refreshUser }) => {
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
    <div>
        <h2>Info</h2>
        <button className='button' onClick={onLogOutClick}>Log Out</button>
        <div className='profile__container'>
            <EditProfile userObj={userObj} />
            <label className='profile__info'>
                <h1>{userObj.displayName}</h1>
                dddd
            </label>
        </div>

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
  )
}

export default MyProfile