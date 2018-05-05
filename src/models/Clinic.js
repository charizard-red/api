const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  title: String,
  description: String,
  photo: String,
  phone: String,
  address: String,
  password: String,
  postal_code: Number,
  doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctors' }]
})

module.exports = mongoose.model('Clinics', data_schema)
