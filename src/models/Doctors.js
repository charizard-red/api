const mongoose = require('mongoose')
const Schema = mongoose.Schema

const data_schema = Schema({
  name: String,
  photo: String,
  time: {
    days: Array,
    from: String,
    until: String
  },
  cost: String,
  specialist: String,
  clinic: { type: Schema.Types.ObjectId, ref: 'Clinics' }
})

module.exports = mongoose.model('Doctors', data_schema)
