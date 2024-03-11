const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const validateEmail = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
const validateUsername = username => /^[A-Za-z0-9_]{3,24}$/.test(username)

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true,
        validate: [validateUsername, 'Please provide a valid username']
    },
    email: { type: String, required: true, unique: true, trim: true,
        validate: [validateEmail, 'Please provide a valid email address']
    },
    password: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    notesShared: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    notesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

UserSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    return user
}

UserSchema.methods.isCorrectPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)