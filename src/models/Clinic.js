const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  verified: Boolean,
  title: String,
  photo: String,
  phone: String,
  city: String,
  address: String,
  postal_code: Number,
  doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctors' }]
})

module.exports = mongoose.model('Clinics', data_schema)
