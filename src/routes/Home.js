import BText from 'components/BText';
import { dbService } from 'myFirebase';
import React, { useEffect, useState } from 'react'

const Home = ( {userObj} ) => {
  const [b, setB] = useState("");
  const [bs, setBs] = useState([]);
  const [fileAttach, setFileAttach] = useState();

  useEffect(() => {
    dbService.collection("Bees").onSnapshot(snapshot => {
      const bArray = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }))
      setBs(bArray);
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


  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: {files},
    } = event;
    const file = files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = (finishedEvent) => {
      //console.log(finishedEvent);
      const { currentTarget: {result} } = finishedEvent;
      setFileAttach(result);
    }
    fileReader.readAsDataURL(file);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit"  value="Be" />
        {fileAttach && 
        <div>
          <img src={fileAttach} width="50px" height="50px" /> 
          <button>X</button>
        </div>
        }
      </form>

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