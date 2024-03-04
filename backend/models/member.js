const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    MemberID: {
    type: Number,
    required: true
  },
  MemberName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('member', memberSchema)