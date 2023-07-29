const mongoose = require('mongoose')

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch(err) {
        console.error("Error connectiong to MongoDB: ", err)
    }
}

module.exports = connectDB