import { deleteObject, ref } from 'firebase/storage';
import { dbService, storageService } from 'myFirebase';
import React, { useState } from 'react'

const BText = ( {bObj, isOwner} ) => {
    const [editing, setEditing] = useState(false);
    const [newB, setNewB] = useState(bObj.text);
    
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you really delete?");
        console.log(ok);
        const urlRef = ref(storageService, bObj.fileUrl);

        if (ok) {
            //delete
            await dbService.doc(`Bees/${bObj.id}`).delete();
            await deleteObject(urlRef);
        }
    }

    const editingToggle = () => {
        setEditing( prev => !prev)
    }

    const onEditChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewB(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(bObj, newB);
        await dbService.doc(`Bees/${bObj.id}`).update({text: newB});
        setEditing(false);
    }

  return (
    <div>

        {editing ? 
        <>
            {isOwner 
            &&
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Edit your B" 
                        value={newB} required 
                        onChange={onEditChange}
                    />
                    <input 
                        type="submit" 
                        value="Edit B"
                    />
                </form>
                <button onClick={editingToggle}>Cancel</button>
            </>
            }
        </>
        :
        <>
            <h4>{bObj.text}</h4>
            {bObj.fileUrl && <img src={bObj.fileUrl} width='50px' height='50px' />}

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