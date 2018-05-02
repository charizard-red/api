const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = Schema({
  company: String,
  description: String,
  photo: String,
  phone: String,
  address: String,
  place: {
    lat: String,
    lon: String
  },
  website: String,
  services: Array,
  postal_code: Number,
  doctors: [{ type: Schema.Types.ObjectId, ref: 'Doctors' }]
})

module.exports = mongoose.model('Users', data_schema)
