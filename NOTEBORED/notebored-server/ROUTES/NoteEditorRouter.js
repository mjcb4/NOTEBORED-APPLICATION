const { getElements, addElement, updateElement, deleteElement} = require('../CONTROLLERS/NoteEditorController') 
const express = require('express')

const router = express.Router()

router.get('/elements', getElements)
router.post('/elements', addElement)
router.patch('/elements/:elementId', updateElement)
router.delete('/elements/:elementId', deleteElement)

module.exports = router