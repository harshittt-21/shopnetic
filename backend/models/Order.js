const { Schema, model } = require('mongoose');
const OrderSchema = new Schema({
  userId: String,
  items: [{
    productId: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number
  }],
  total: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });
module.exports = model('Order', OrderSchema);