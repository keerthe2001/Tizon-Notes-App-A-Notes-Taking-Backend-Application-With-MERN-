import React, { useContext } from 'react'
import noteContext from '../context/notecontext'


export default function Noteitem(props) {
  let { notes,handleEdit } = props
  console.log(notes)
  const context = useContext(noteContext)
  const { deleteNote } = context
  
  const handleDelete = () => {
    deleteNote(notes._id)
  }

  return (
    <>
        <div className="card my-3 shadow" >
          <div className="card-body">
                <h5 className="card-title">{notes.title}</h5>
            <p className="card-text">{notes.description}</p>
            {/* <h6 className="text-muted " style={{fontSize:'12px'}} >{notes._id}</h6> */}
          <span class="badge bg-primary">{notes.tag}</span>      
            <i className="fa-solid fa-trash mx-3" onClick={handleDelete}></i>
            <i className="fa-solid fa-pen-to-square"  onClick={()=>{handleEdit(notes._id,notes.title,notes.description,notes.tag)}}></i>
          </div>
        </div>
           
      
    </>
  )
}
