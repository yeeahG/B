import { dbService } from 'myFirebase';
import React, { useState } from 'react'

const BText = ( {bObj, isOwner} ) => {
    const [editing, setEditing] = useState(false);
    const [newB, setNewB] = useState(bObj.text);
    
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you really delete?");
        console.log(ok);
        if (ok) {
            //delete
            await dbService.doc(`Bees/${bObj.id}`).delete();
        }
    }

    const editingToggle = () => {
        setEditing( prev => !prev)
    }

  return (
    <div>

        {editing ? 
        <>
            <form><input type="text" placeholder="Edit your B" value={newB} required /></form>
            <button onClick={editingToggle}>Cancel</button>
        </>
        :
        <>
            <h4>{bObj.text}</h4>

            {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={editingToggle}>Edit</button>
                </>
            )}
        </>
        }
    </div>
  )
}

export default BText