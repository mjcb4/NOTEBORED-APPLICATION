const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../CONTROLLERS/UserController')
const { protect } = require('../UTILITIES/UserAuthMiddleware')
const express = require('express')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', registerUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)

module.exports = router