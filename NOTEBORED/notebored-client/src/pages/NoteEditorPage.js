import { useParams } from 'react-router-dom'


// COMPONENTS
import NoteEditor from '../components/notes/NoteEditor';


export const NoteEditorPage = () => {
    const { id } = useParams()

    return (
        <div className='note-editor-page'>
            <h1>BORED NOTE EDITOR PAGE</h1>
            <NoteEditor noteId={id} />
        </div>
    )
}