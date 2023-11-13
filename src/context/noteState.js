import { useState, useEffect } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  useEffect(() => {
    getNotes();
  }, []); // Dependency array to ensure the effect runs only once on mount

  const getNotes = async () => {
    try {
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  }

  const addNote = async (title, description, tag) => {
    try {
      const url = `${host}/api/notes/addnotes`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      
      let note = {
        "title": title,
        "description": description,
        "tag": tag
      }
      setNotes((prevNotes) => [...prevNotes, note]);
      getNotes();
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  }

  const deleteNote = async (id) => {
    try {
      const url = `${host}/api/notes/deletenote/${id}`;
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  }

  const editNote = async (id, title, description, tag) => {
    try {
      const url = `${host}/api/notes/updatenote/${id}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? { ...note, title, description, tag }
            : note
        )
      );
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
