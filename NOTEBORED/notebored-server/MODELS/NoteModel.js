const mongoose = require('mongoose')

const ElementSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'table', 'list', 'drawing' ] },
    data: mongoose.Schema.Types.Mixed,
    styles: mongoose.Schema.Types.Mixed,
    position: { x: Number, y: Number },
    size: { width: Number, height: Number }
}, { _id: false, })

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'A note must have a title'], trim: true },
    noteParent: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', default: null },
    noteChildren: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note', default: {} }],
    usersSharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: {} }],
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Element', default: {} }],
}, { _id: true, timestamps: true })

module.exports = mongoose.model('Note', NoteSchema)