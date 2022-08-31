import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'

const MyBList = ({ userObj }) => {
  const [myList, setMyList] = useState([]);

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
  },[])

  return (
    <>
      <div>
        {myList}
      </div>
    </>
  )
}

export default MyBList