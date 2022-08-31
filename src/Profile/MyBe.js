import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from 'myFirebase';
import React, { useEffect } from 'react'

const MyBe = ({ userObj }) => {
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
    <div>MyBe</div>
  )
}

export default MyBe