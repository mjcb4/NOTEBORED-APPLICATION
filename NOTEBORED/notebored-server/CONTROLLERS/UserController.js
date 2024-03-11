const User = require('../MODELS/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// HELPER FUNCTIONS
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


// MAIN FUNCTIONALITY
const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({ username, email, password: hashedPassword })

        res.status(201).json({ message: 'User creation successful', _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const passwordsMatch = user.isCorrectPassword(password)
        if (user && passwordsMatch) {
            res.status(200).json({ message: 'User login successful', user })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json({ message: 'User not found', user })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(password, 12)
            user.password = hashedPassword
        }

        const updatedUser = await user.save()
        res.status(500).json({ message: 'User update successful', user })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }