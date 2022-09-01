import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile';

const MyBList = ({ userObj }) => {
  const [myList, setMyList] = useState([]);
  const [myPhoto, setMyPhoto] = useState("");

  const getMyBees = async() => {
    const data = query(
      collection(dbService, "Bees"), where("creatorId", "==", userObj.uid)
    );

    const queryBees = await getDocs(data);
    queryBees.forEach((it) => {
      //console.log(it.data());
      setMyList(it.data().text);
    })
  }

  useEffect(() => {
    getMyBees();

    dbService.collection("Profile").onSnapshot(snapshot => {
      const ProfilePotoArray = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }))
      setMyPhoto(ProfilePotoArray);
    })

  },[])

  return (
    <>

      {/* {userObj.fileUrl && <img src={bObj.fileUrl} width='50px' height='50px' />} */}
      <EditProfile />
      
      <div>
        <h3>내 글 목록</h3>
        {myList}
      </div>
    </>
  )
}

export default MyBList