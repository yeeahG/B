import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'

const Home = () => {
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
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("Bees").add({
      b,
      createdAt: Date.now(),
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
            <h4>{it.b}</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home