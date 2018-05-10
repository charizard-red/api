const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = Schema({
  user_id: Object,
  doctor_id: Object,
  clinic_id: Object,
  day: String,
  accept: Boolean,
  time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Orders', OrdersSchema)
