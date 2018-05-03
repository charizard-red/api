const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = Schema({
  title: String,
  description: String,
  photo: String,
  phone: String,
  address: String,
  postal_code: Number,
  doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctors' }]
})

module.exports = mongoose.model('Clinics', data_schema)
