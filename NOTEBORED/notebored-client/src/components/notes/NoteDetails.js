import { NoteEditorPage } from '../../pages/NoteEditorPage';
import {useContext } from 'react'
import { NotesContext } from '../../context/NotesContext'
import { Link } from 'react-router-dom';


const NoteDetails = ({ note }) => {
    const { dispatch, deleteNote } = useContext(NotesContext);
    const baseURL = 'http://localhost:4000'

    const handleDelete = async () => {
        const response = await fetch(`${baseURL}/notemap/${note}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json })
        }

    }

    const handleEdit = async () => {
        const response = await fetch(`${baseURL}/notemap/${note._id}/elements`, {
            method: 'GET'
        })
        const json = await response.json()

        if (response.ok) {
            const noteToEdit = json;
            <Link to={noteToEdit} note={json}>
                <NoteEditorPage />
            </Link>
        }
    }

    return (
        <div className="note-details">
            <h4>{note.title}</h4>
            <p><strong>Owner: </strong>{note.owner}</p>
            <p><strong>Created At: </strong>{note.createdAt}</p>
            <button onClick={handleDelete}>delete</button>
            <button onClick={handleEdit}>edit</button>
        </div>
    )
}

export default NoteDetails