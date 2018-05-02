const mongoose = require('mongoose')

const data_schema = mongoose.Schema({
  username: String,
  google_id: String,
  email: String,
  data: {
    gender: String,
    phone: String,
    address: String,
    birth: String,
  }
})

module.exports = mongoose.model('Users', data_schema)
