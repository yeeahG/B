import BText from 'components/BText';
import React, { useEffect, useState } from 'react'
import { dbService, storageService } from 'myFirebase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Home = ( {userObj} ) => {
  const [b, setB] = useState("");
  const [bs, setBs] = useState([]);
  const [fileAttach, setFileAttach] = useState("");

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
    let fileUrl = "";

    if (fileAttach != "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, fileAttach, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }
    
    const bObj = {
      text: b,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl
    }
    
    await dbService.collection("Bees").add(bObj);
    setB("");
    setFileAttach("");
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
      const { currentTarget: {result} } = finishedEvent;
      setFileAttach(result);
    }
    fileReader.readAsDataURL(file);
  }

  const onClearFile = () => {
    setFileAttach("");
  }

  return (
    <div className='container'>
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
          <button onClick={onClearFile}>X</button>
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