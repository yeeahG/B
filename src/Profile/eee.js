import React, { useRef } from 'react'
import './Profile.css'

const EditProfile = () => {
  const imageInput = useRef();

  const onClickUpload = () => {
    imageInput.current.click();
  }

  return (
    <div>
      {/*userprofile의 사진이 존재 ? 사진 : 밑에코드*/}
      <div>
        <input 
          type="file" 
          style={{display: "none"}} 
          ref={imageInput} 
        />
        <button
          className='fileupload__btn' 
          onClick={onClickUpload}>upload</button>
      </div>

      EditProfile

    </div>
  )
}

export default EditProfile