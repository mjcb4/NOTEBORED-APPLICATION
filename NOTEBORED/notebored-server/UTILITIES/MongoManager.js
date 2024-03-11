const mongoose = require('mongoose')

const MongoManager = async () => {
    const maxAttempts = 8
    let attempts = 0

    while (attempts < maxAttempts) {
        try {
            await mongoose.connect(process.env.MONGODB_CONNECT_STRING)
            console.log('MongoDB connected successfully.')
            break
        } catch (error) {
            attempts++
            console.error(`MongoDB connection attempt ${attempts} failed:`, error)
            if (attempts === maxAttempts) {
                console.error('MongoDB connection failed after maximum attempts. Exiting...')
                process.exit(1)
            }
            await new Promise(resolve => setTimeout(resolve, 4000))
        }
    }
}

module.exports = MongoManager