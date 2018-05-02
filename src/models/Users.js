const mongoose = require('mongoose')

const data_schema = mongoose.Schema({
  username: String,
  google_id: String,
  email: String,
  complete_data: { type: Boolean, default: false },
  data: {
    gender: String,
    phone: Number,
    address: String,
    birth: Date,
  }
})

module.exports = mongoose.model('Users', data_schema)
