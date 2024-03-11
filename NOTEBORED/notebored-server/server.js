const connectMongo = require('./UTILITIES/MongoManager')
const NoteMapRouter = require('./ROUTES/NoteMapRouter')
const UserRouter = require('./ROUTES/UserRouter')
const express = require('express')
const cors = require('cors')
require('dotenv').config()


// SERVER INIT
const app = express()
app.use(express.json())
app.use(cors())


// ROUTERS
app.use('/notemap', NoteMapRouter)
app.use('/profile', UserRouter)


// SERVER CONNECT
connectMongo()
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))