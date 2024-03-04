const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  BookID: {
    type: Number,
    required: true
  },
  eventtype: {
    type: String,
    required: true
  },
  MemberID: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Book', inventorySchema)