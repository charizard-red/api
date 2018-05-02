const mongoose = require('mongoose')

const data_schema = mongoose.Schema({
  username: String,
  google_id: String,
  complete_data: { type: Boolean, default: false },
})

module.exports = mongoose.model('Users', data_schema)
