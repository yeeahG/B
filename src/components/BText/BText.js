import React, { useState } from 'react'
import { deleteObject, ref } from 'firebase/storage';
import { dbService, storageService } from 'myFirebase';
import './BText.css'

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

    const strDate = new Date(parseInt(bObj.createdAt)).toLocaleDateString();

  return (
    <div>

        {editing ? 
        <>
            {isOwner 
            &&
            <>
                <form onSubmit={onSubmit}>
                    <label className='input__border'>
                        <input 
                            type="text" 
                            placeholder="Edit your B" 
                            value={newB} required 
                            onChange={onEditChange}
                            className='input'
                        />
                    </label>
                        <input 
                            type="submit" 
                            value="Edit B"
                            className='button' 
                        />
                </form>
                <button className='button' onClick={editingToggle}>Cancel</button>
            </>
            }
        </>
        :
        <div className='feed__container'>

            
            <div>
                <h4>{bObj.text}</h4>
                <h5>{strDate}</h5>
                {isOwner && (
                    <div className='feed__btn'>
                        <button className='button__two' onClick={onDeleteClick}>Delete</button>
                        <button className='button__two' onClick={editingToggle}>Edit</button>
                    </div>
                )}
            </div>
            <div>
                {bObj.fileUrl && <img src={bObj.fileUrl} width='350px' />}
            </div>

        </div>
        }
    </div>
  )
}

export default BText