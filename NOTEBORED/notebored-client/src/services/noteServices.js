import axios from 'axios';
const API_URL = 'http://localhost:4000/notemap'; 

// FUNCTION TO FETCH ALL USER NOTES
export const fetchNotes = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// FUNCTION TO FETCH SINGLE USER NOTE
export const fetchNoteById = async (noteId) => {
    const response = await axios.get(`${API_URL}/${noteId}`)
    return response.data
}

// FUNCTION TO CREATE NEW NOTE
export const createNote = async (noteData) => {
    const response = await axios.post(API_URL, noteData)
    return response.data
}

// FUNCTION TO UPDATE EXISTING NOTE
export const updateNote = async (noteId, noteData) => {
    const response = await axios.put(`${API_URL}/${noteId}`, noteData)
    return response.data
}

// FUNCTION TO DELETE NOTE
export const deleteNote = async (noteId) => {
    const response = await axios.delete(`${API_URL}/${noteId}`)
    return response.data
}