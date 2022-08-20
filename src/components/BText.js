import React from 'react'

const BText = ( {bObj, isOwner} ) => {
  return (
    <div>
        <h4>{bObj.text}</h4>

        {isOwner && (
            <>
            <button>Delete</button>
            <button>Edit</button>
            </>
        )}
    </div>
  )
}

export default BText