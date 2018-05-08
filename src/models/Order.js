const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  doctor_id: { type: Schema.Types.ObjectId, ref: 'Doctors' },
  time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Orders', OrdersSchema)
