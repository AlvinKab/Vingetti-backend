require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const PORT = process.env.PORT

console.log(process.env.NODE_ENV)

connectDB()

app.use(express.json())
app.use(cors())
app.use('/customers', require('./routes/customerRouter'))
app.use('/sections', require('./routes/sectionRouter'))

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on("error", err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})