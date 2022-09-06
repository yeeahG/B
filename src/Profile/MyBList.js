import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'

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
  }

  useEffect(() => {
    getMyBees();
  },[])

  return (
    <div>
      <h3>내 글 목록</h3>
      {myList}
    </div>
  )
}

export default MyBList