const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    randomID: {
        type: Number
    },
    firstName: {
        type: String,
    },
    surname: {
        type: String,
    },
    section: [String],
    date : {
        type: Date,
        default: Date.now
    }
}, {required: ['randomID', 'firstName', 'surname']})

module.exports = mongoose.model('customer', customerSchema)