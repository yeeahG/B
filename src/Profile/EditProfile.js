import React, { useEffect, useRef, useState } from 'react'
import { dbService, storageService } from 'myFirebase';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import './Profile.css'

const EditProfile = ({ userObj }) => {
  const [myPhoto, setMyPhoto] = useState("");
  const [fileAttach, setFileAttach] = useState("");

  const imageInput = useRef();

  useEffect(() => {
    dbService.collection("Profile").onSnapshot(snapshot => {
      const ProfilePotoArray = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }))
      setMyPhoto(ProfilePotoArray);
    })

  },[])
  
    const onClickUpload = () => {
      imageInput.current.click();
    }

  const onFileChange = (event) => {
    console.log(event.target.files);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";

    if (fileAttach != "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, fileAttach, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }
    
    const profliePhoto = {
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl
    }
    
    await dbService.collection("Profile").add(profliePhoto);
    setMyPhoto("");
    setFileAttach("");
  }

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you really delete?");
    const urlRef = ref(storageService, myPhoto.fileUrl);

    if (ok) {
      await dbService.doc(`Profile/${myPhoto.id}`).delete();
      await deleteObject(urlRef);
    }
  }

  return (
    <div>
      {myPhoto ? 
        <>
          <label className='profile__poto'>
            <img src={myPhoto[0].fileUrl} width="100px" height="100px" />
          </label>
          <button onClick={onDeleteClick} className='button__two'>Delete</button>
        </>
      :
      <div>
        {fileAttach ?
        <>
          {fileAttach && 
          <div>
            <img src={fileAttach} width="100px" height="100px" />
            <button onClick={onClearFile}>X</button>
            <button onClick={onSubmit}>O</button>
          </div>
          }
        </>
        :
        <>
          <input 
            type="file" 
            style={{display: "none"}} 
            ref={imageInput} 
            onChange={onFileChange}
          />
          <button
            className='fileupload__btn' 
            onClick={onClickUpload}>upload</button>
        </>
        }
      </div>
      }

    </div>
  )
}

export default EditProfile