import { useState } from "react";
import noteContex from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NmM5Y2FkZTU2OTNhYmVkOTk1OTBkIn0sImlhdCI6MTcxODAxODUzMX0.MtYqEghvK4xTmdUQL03PQp6yG_9hIaOE9bGVVET_rO4"
            },
        });
        const json = await response.json();
        setNotes(json);
    }


    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NmM5Y2FkZTU2OTNhYmVkOTk1OTBkIn0sImlhdCI6MTcxODAxODUzMX0.MtYqEghvK4xTmdUQL03PQp6yG_9hIaOE9bGVVET_rO4"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    // Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NmM5Y2FkZTU2OTNhYmVkOTk1OTBkIn0sImlhdCI6MTcxODAxODUzMX0.MtYqEghvK4xTmdUQL03PQp6yG_9hIaOE9bGVVET_rO4"
            },
        });

        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    // Edit a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NmM5Y2FkZTU2OTNhYmVkOTk1OTBkIn0sImlhdCI6MTcxODAxODUzMX0.MtYqEghvK4xTmdUQL03PQp6yG_9hIaOE9bGVVET_rO4"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <noteContex.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContex.Provider>
    );
}

export default NoteState;