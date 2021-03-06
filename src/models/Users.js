const mongoose = require('mongoose')

const data_schema = mongoose.Schema({
  username: String,
  google_id: String,
  password: String,
  email: String,
  admin: Boolean,
  data_complete: Boolean,
  data: {
    gender: String,
    phone: String,
    address: String,
    birth: String,
  }
})

data_schema.pre('find', (next) => {
  this.select({
    password: 0
  })
})

module.exports = mongoose.model('Users', data_schema)
