const { Schema, model } = require('mongoose');
const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  stock: { type: Number, default: 1 }
}, { timestamps: true });
module.exports = model('Product', ProductSchema);