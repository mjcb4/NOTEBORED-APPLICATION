import { useState, useContext } from 'react'
import { NotesContext } from '../../context/NotesContext'

const NoteForm = () => {
    const { dispatch, createNote } = useContext(NotesContext);
    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const note = { title }
        const response = await fetch('http://localhost:4000/noteMap/', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setError(null)
            setEmptyFields([])
            console.log('New Note Added!', json)
            createNote(json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Note</h3>

            <label>Note Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <button>Add Note</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default NoteForm