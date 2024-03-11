const { getNotes, getSharedNotes, getNote, getSubtree, createNote, deleteNote, updateNote, shareNote, unshareNote } = require('../CONTROLLERS/NoteMapController')
const NoteEditorRouter = require('./NoteEditorRouter')
const express = require('express')

const router = express.Router()

router.get('/', getNotes)
router.get('/shared', getSharedNotes)
router.get('/:id', getNote)
router.get('/subtree/:id', getSubtree)
router.post('/', createNote)
router.post('/share/:id', shareNote)
router.patch('/:id', updateNote)
router.delete('/:id', deleteNote)
router.delete('/unshare/:id', unshareNote)

router.use('/:noteId/elements', NoteEditorRouter)

module.exports = router