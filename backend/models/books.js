const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  BookID: {
    type: Number,
    required: true
  },
  BookName: {
    type: String,
    required: true
  },
  NumberOfCopies: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('books', BookSchema)