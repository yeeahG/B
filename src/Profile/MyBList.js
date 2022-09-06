import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile';

const MyBList = ({ userObj }) => {
  const [myList, setMyList] = useState([]);
  const [myListDate, setMyListDate] = useState([]);

  const getMyBees = async() => {
    const data = query(
      collection(dbService, "Bees"), where("creatorId", "==", userObj.uid)
    );

    const queryBees = await getDocs(data);
    queryBees.forEach((it) => {
      setMyList(it.data().text);
      setMyListDate(it.data().createdAt);
    })
    console.log(queryBees);
  }

  useEffect(() => {
    getMyBees();
  },[])

  return (
    <>
      <EditProfile userObj={userObj} />
      
      <div>
        <h3>내 글 목록</h3>
        {myList}
      </div>
    </>
  )
}

export default MyBList