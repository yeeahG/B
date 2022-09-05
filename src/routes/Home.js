import React, { useEffect, useState } from 'react'
import BText from 'components/BText/BText';
import { dbService } from 'myFirebase';
import BFactory from 'components/BText/BFactory';

const Home = ( {userObj} ) => {
  const [bs, setBs] = useState([]);

  useEffect(() => {
    dbService.collection("Bees").onSnapshot(snapshot => {
      const bArray = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }))
      setBs(bArray);
    })
  }, [])


  return (
    <div className='container'>
      <BFactory 
        userObj={userObj}
      />

      <div>
        {bs.map( it => 
          <BText 
            key={it.id} 
            bObj={it} 
            isOwner={it.creatorId === userObj.uid} 
          />
        )}
      </div>
    </div>
  )
}

export default Home