const Note = require('../MODELS/NoteModel') 

// Get Elements from a Note
const getElements = async (req, res) => {
    const { noteId } = req.params
    try {
        const note = await Note.findById(noteId)
        if (!note) return res.status(404).json({ message: 'Note not found' })

        res.json(note.elements)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving elements', error: error.message })
    }
}

// Add an Element to a Note
const addElement = async (req, res) => {
    const { noteId, element } = req.body
    try {
        const note = await Note.findById(noteId)
        if (!note) return res.status(404).json({ message: 'Note not found' })

        note.elements.push(element)
        await note.save()
        res.status(201).json({ message: 'Element added successfully', note })
    } catch (error) {
        res.status(500).json({ message: 'Error adding element to note', error: error.message })
    }
}


// Update an Element within a Note
const updateElement = async (req, res) => {
    const { noteId, elementId, updatedElement } = req.body
    try {
        const note = await Note.findById(noteId)
        if (!note) return res.status(404).json({ message: 'Note not found' })

        const elementIndex = note.elements.findIndex(el => el._id.equals(elementId))
        if (elementIndex === -1) return res.status(404).json({ message: 'Element not found' })

        note.elements[elementIndex] = { ...note.elements[elementIndex].toObject(), ...updatedElement }
        await note.save()
        res.json({ message: 'Element updated successfully', element: note.elements[elementIndex] })
    } catch (error) {
        res.status(500).json({ message: 'Error updating element', error: error.message })
    }
}

// Delete an Element from a Note
const deleteElement = async (req, res) => {
    const { noteId, elementId } = req.body
    try {
        const note = await Note.findById(noteId)
        if (!note) return res.status(404).json({ message: 'Note not found' })

        note.elements = note.elements.filter(el => !el._id.equals(elementId))
        await note.save()
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: 'Error deleting element', error: error.message })
    }
}

module.exports = { getElements, addElement, updateElement, deleteElement}