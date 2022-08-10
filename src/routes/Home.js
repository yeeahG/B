import { dbService } from 'myFirebase';
import React, { useState } from 'react'

const Home = () => {
  const [b, setB] = useState("");

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
    </div>
  )
}

export default Home