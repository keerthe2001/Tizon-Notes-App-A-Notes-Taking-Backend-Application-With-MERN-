import React, { useContext, useEffect, useRef, useState  } from "react";
import noteContext from "../context/notecontext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";



function DisplayNotes() {
  const [note, setnote] = useState({eid:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const navigate = useNavigate();
  const handleEdit = async (currentnote) => {
    console.log("hello",{eid:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    await setnote({eid:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})

     console.log(note)
     ref.current.click();
    // const title  = document.getElementById("etitle").value = currentNote.title;
    // const desc = document.getElementById("edescription").value = currentNote.description;
    // const tag = document.getElementById("etag").value = currentNote.tag;
  }
  const handleClick = (e) =>{
    e.preventDefault();
    console.log("The Updated Note is ",note.eid,note.etitle,note.edescription,note.etag)
    editNote(note.eid,note.etitle,note.edescription,note.etag)
    refclose.current.click();
  }
  const onChange = (e) =>{
    setnote({...note, [e.target.name]: e.target.value})
  }
  const refclose = useRef(null)
  
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
   useEffect(() => {
     return () => {
      if (!localStorage.getItem('token')) {
        navigate('/login');
      }
        getNotes();
    
     }
   }, [])
   
    console.log("for map",notes)
    return (
        <>
         <button type="button" ref={ref} style={{display:'none'}}  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
         <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text"  className="form-control" onChange={onChange} name="etitle" value={note.etitle} id="etitle" aria-describedby="emailHelp" />                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                        <input type="text"  className="form-control" onChange={onChange} value={note.edescription} name="edescription" id="edescription" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">TAG</label>
                        <input type="text"  className="form-control" onChange={onChange} value={note.etag} name="etag" id="etag" />
                    </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
            </div>
          </div>
        </div>
      </div>
            {
                notes.map((noteees,index) => (
                    <div className="col-md-3 my-3" key={index}>
                    <Noteitem  notes={noteees} handleEdit = {()=>handleEdit(noteees)} />
                    </div>
                ))
            }
        </>
    );
}

export default DisplayNotes;
