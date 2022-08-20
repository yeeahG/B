import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'

const Home = ( {userObj} ) => {
  const [b, setB] = useState("");
  const [bs, setBs] = useState([]);

  const getBees = async () => {
    const dbBees = await dbService.collection("Bees").get();
    dbBees.forEach(document => {
      const bsObject = {
        ...document.data(),
        id: document.id,
      }
      setBs(prev => [bsObject, ...prev])
    })
  }

  useEffect(() => {
    getBees();
    dbService.collection("Bees").onSnapshot(snapshot => {
      console.log("Something happend");
    })
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("Bees").add({
      text: b,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setB("");
  }

  const onChange = (event) => {
    const { target : {value}} = event;
    setB(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          value={b}
          onChange={onChange}
          type="text" 
          placeholder="What's on ur mind?" 
          maxLength={120} 
        />
        <input 
          type="submit" 
          value="Be"
        />
      </form>

      <div>
        {bs.map( it => 
          <div key={it.id}>
            <h4>{it.text}</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home