import { useNotesContext } from '../context/NotesContext'


// ROUTE TO EDITOR FOR LATER USAGE
/* 
<Route path="/notemap/editor/:noteId" element={<NoteEditorPage />} />
*/


// COMPONENTS
import NoteDetails from '../components/notes/NoteDetails'
import NoteForm from '../components/notes/NoteForm'


const NoteMapPage = () => {
    const { notes } = useNotesContext()

    return (
        <div className="notemap-page">
            <h1>BORED NOTES</h1>
            <div className="notes">
                {notes && notes.map((note) => (
                    <NoteDetails key={note._id} note={note} />
                ))}
            </div>
            <NoteForm />
        </div>
    )
}

export default NoteMapPage