import React, { useState } from 'react'

const Home = () => {
  const [b, setB] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
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