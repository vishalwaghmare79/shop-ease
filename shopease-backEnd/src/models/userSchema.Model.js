const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    phone: {
      type: String,
      trim: true,
    }
  }, {timestamps: true} );


  const User = mongoose.model('User', userSchema);

  module.exports = { User };