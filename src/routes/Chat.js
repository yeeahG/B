import React from 'react'

const Chat = ({ userObj }) => {
  return (
    <div className='container'>

      <h3>Be with</h3>
      <span>Enter B room name</span>

      <form>
        <input required
          placeholder='room number' 
          type="text" 
        />
        <input 
          type='submit' 
          value="enter" 
        />
      </form>

    </div>
  )
}

export default Chat