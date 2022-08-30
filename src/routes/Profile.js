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
    const bees = await dbService
      .collection("Bees")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "asc")
      .get();
      console.log(bees.docs.map((it) => it._delegate._document.data.value.mapValue.fields));
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