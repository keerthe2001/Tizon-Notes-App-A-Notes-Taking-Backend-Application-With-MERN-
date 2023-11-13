import React, { useContext, useState } from 'react'
import noteContext from '../context/notecontext'
function AddNotes() {
    const context = useContext(noteContext)
    const { addNote } = context

    let [notes, setnotes] = useState({title:"",description:"",tag:"default"})

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(notes.title,notes.description,notes.tag)
    }
    const onChange = (e) =>{
        setnotes({...notes, [e.target.name]: e.target.value})
    }

  return (
    <>
        <h1>
                Add a Note
            </h1>

                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" onChange={onChange} name="title" id="title" aria-describedby="emailHelp" />
                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                        <input type="text" className="form-control" onChange={onChange} name="description" id="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">TAG</label>
                        <input type="text" className="form-control" onChange={onChange} name="tag" id="tag" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
    </>
  )
}

export default AddNotes