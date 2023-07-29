const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true
    },
    dimensions: {
        surfaceArea: Number,
        maxHeight: Number
    },
    price: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }
}, {timestamps: true}, {required: ['sectionName', 'price']})

module.exports = mongoose.model('section', sectionSchema)