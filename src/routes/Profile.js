import { collection, getDocs, query, where } from 'firebase/firestore';
import { authService, dbService } from 'myFirebase'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  }

  const getMyBees = async() => {
    const data = query(
      collection(dbService, "Bees"), where("creatorId", "==", userObj.uid)
    );

    const queryBees = await getDocs(data);
    queryBees.forEach((it) => {
      console.log(it.data());
    })
  }

  useEffect(() => {
    getMyBees();
  },[])

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile