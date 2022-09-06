import React, { useState } from 'react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { dbService, storageService } from 'myFirebase';
import { v4 as uuidv4 } from 'uuid';

const BFactory = ({ userObj }) => {
    const [b, setB] = useState("");
    const [fileAttach, setFileAttach] = useState("");

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
    <div>

      <form onSubmit={onSubmit}>
        {fileAttach && 
          <div>
            <img src={fileAttach} width="50px" height="50px" /> 
            <button onClick={onClearFile}>X</button>
          </div>
        }
        <label className='input__border'>
          <input 
            value={b}
            onChange={onChange}
            type="text" 
            placeholder="What's on ur mind?" 
            maxLength={120} 
            className='input'
          />
        </label>
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input className='button' type="submit" value="Be" />
      </form>
      
    </div>
  )
}

export default BFactory