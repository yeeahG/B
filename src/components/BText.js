import { dbService } from 'myFirebase';
import React from 'react'

const BText = ( {bObj, isOwner} ) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you really delete?");
        console.log(ok);
        if (ok) {
            //delete
            await dbService.doc(`Bees/${bObj.id}`).delete();
        }
    }

  return (
    <div>
        <h4>{bObj.text}</h4>

        {isOwner && (
            <>
            <button onClick={onDeleteClick}>Delete</button>
            <button>Edit</button>
            </>
        )}
    </div>
  )
}

export default BText