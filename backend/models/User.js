const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
module.exports = model('User', UserSchema);