const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
  specialist:String,
  time:Date
})

module.exports = mongoose.model('Orders', OrdersSchema)
