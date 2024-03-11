const Note = require('../MODELS/NoteModel')
const User = require('../MODELS/UserModel')

// HELPER FUNCTIONS

// Helper function to delete note and its children recursively
async function deleteNoteAndChildren(noteId) {
    try {
        const note = await Note.findById(noteId)
        if (!note) return

        // Recursive deletion of children notes
        if (note.noteChildren.length > 0) {
            for (const childId of note.noteChildren) {
                await deleteNoteAndChildren(childId)
            }
        }

        // Delete the note itself
        await Note.findByIdAndDelete(noteId)
    } catch (error) {
        console.error('Error deleting note and children:', error)
        throw error
    }
}

// Helper function to fetch children recursively
async function fetchSubtree(noteId) {
    try {
        const note = await Note.findById(noteId).populate('noteChildren')
        if (!note) return null

        for (let i = 0; i < note.noteChildren.length; i++) {
            note.noteChildren[i] = await fetchSubtree(note.noteChildren[i]._id)
        }

        return note
    } catch (error) {
        console.error('Error fetching subtree:', error)
        throw error
    }
}


// MAIN FUNCTIONALITY

const getNotes = async (req, res) => {
    try {
        const ownerNotes = await Note.find({ owner: req.user._id, noteParent: null }) // Root notes for the user
        res.json(ownerNotes)
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve notes', error: error.message })
    }
}

const getSharedNotes = async (req, res) => {
    const { userId } = req.params

    try {
        const sharedNotes = await Note.find({ sharedWith: userId })
        res.status(200).json(sharedNotes)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: 'Note not found' })
        res.json(note)
    } catch (error) {
        res.status(500).json({ message: 'Failed to get note', error: error.message })
    }
}

const getSubtree = async (req, res) => {
    try {
        const subtree = await fetchSubtree(req.params.id)
        if (!subtree) return res.status(404).json({ message: 'Subtree not found' })
        res.json(subtree)
    } catch (error) {
        res.status(500).json({ message: 'Failed to get subtree', error: error.message })
    }
}

const createNote = async (req, res) => {
    const { title } = req.body
    try {
        const newNote = new Note({ title })
        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create note', error: error.message })
    }
}

const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' })
        res.json(updatedNote)
    } catch (error) {
        res.status(500).json({ message: 'Failed to update note', error: error.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        await deleteNoteAndChildren(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error: error.message })
    }
}

const shareNote = async (req, res) => {
    const { userIds } = req.body
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: 'Note not found' })

        const users = await User.find({ '_id': { $in: userIds } })
        const validUserIds = users.map(user => user._id)

        note.usersSharedWith.push(...validUserIds)
        await note.save()

        res.status(200).json({ message: 'Note shared successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to share note', error: error.message })
    }
}

const unshareNote = async (req, res) => {
    const { userId } = req.body // ID of the user to unshare the note with
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, { $pull: { usersSharedWith: userId } }, { new: true })
        if (!note) return res.status(404).json({ message: 'Note not found' })
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ message: 'Failed to unshare note', error: error.message })
    }
}

module.exports = { getNotes, getSharedNotes, getNote, getSubtree, createNote, deleteNote, updateNote, shareNote, unshareNote }