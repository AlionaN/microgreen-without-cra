const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  firstName: {  type: String,  required: true },
  secondName: {  type: String,  required: true },
  email: {  type: String,  required: true,  unique: true },
  img: {  type: String,  required: true },
  password: {  type: String,  required: true },
  password_confirm: {  type: String,  required: true },
  isSignIn: {  type: Boolean,  required: true },
  cart: [{ type: Types.ObjectId, ref: 'Product' }],
  favourites: [{ type: Types.ObjectId, ref: 'Product' }]
});

module.exports = model('User', schema);
