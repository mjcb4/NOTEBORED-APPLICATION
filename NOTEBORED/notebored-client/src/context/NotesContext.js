import { createContext, useContext, useReducer } from 'react'
import * as noteServices from '../services/noteServices'

export const NotesContext = createContext()

const initialState = {
    notes: []
}

export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_NOTES':
            return {
                ...state, notes: action.payload
            }

        case 'CREATE_NOTE':
            if (!action.payload.parentId) {
                return { ...state, notes: [...state.notes, action.payload] };
            }
            const addNoteToParent = (notes, noteToAdd) => {
                return notes.map(note => {
                    if (note.id === noteToAdd.parentId) {
                        const updatedChildren = note.children ? [...note.children, noteToAdd] : [noteToAdd];
                        return { ...note, children: updatedChildren };
                    } else if (note.children) {
                        return { ...note, children: addNoteToParent(note.children, noteToAdd) };
                    }
                    return note;
                });
            };
            return { ...state, notes: addNoteToParent(state.notes, action.payload) };

        case 'EDIT_NOTE':
            const updateNoteContent = (notes, noteToUpdate) => {
                return notes.map(note => {
                    if (note.id === noteToUpdate.id) {
                        return { ...note, content: noteToUpdate.content };
                    } else if (note.children) {
                        return { ...note, children: updateNoteContent(note.children, noteToUpdate) };
                    }
                    return note;
                });
            };
            return { ...state, notes: updateNoteContent(state.notes, action.payload) };

        case 'DELETE_NOTE':
            const removeNoteAndChildren = (notes, noteIdToRemove) => {
                return notes.reduce((acc, note) => {
                    if (note.id === noteIdToRemove) return acc; // Exclude the note to delete
                    if (note.children) {
                        note.children = removeNoteAndChildren(note.children, noteIdToRemove);
                    }
                    return [...acc, note];
                }, []);
            };
            return { ...state, notes: removeNoteAndChildren(state.notes, action.payload) };

        default:
            return state
    }
}

export const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, initialState)

    /*
    useEffect(() => {
        const fetchAllNotes = async () => {
            const fetchedNotes = await noteServices.fetchNotes()
            dispatch({ type: 'LOAD_NOTES', payload: fetchedNotes })
        }
        fetchAllNotes()
    }, [])
    */

    const createNote = async (noteData) => {
        const newNote = await noteServices.createNote(noteData)
        dispatch({ type: 'CREATE_NOTE', payload: newNote })
    }

    const editNote = async (noteId, content) => {
        await noteServices.updateNote(noteId, { content })
        dispatch({ type: 'EDIT_NOTE', payload: { id: noteId, content } })
    }

    const deleteNote = async (noteId) => {
        await noteServices.deleteNote(noteId)
        dispatch({ type: 'DELETE_NOTE', payload: noteId })
    }

    return (
        <NotesContext.Provider value={{ notes: state.notes, createNote, editNote, deleteNote }}>
            {children}
        </NotesContext.Provider>
    )
}


export const useNotesContext = () => {
    const context = useContext(NotesContext)

    if (!context) {
        throw Error('useNotesContext must be used inside an NotesContextProvider')
    }

    return context
}