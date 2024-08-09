const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // Name is a required field
      trim: true, // Trim whitespace from the beginning and end
    },
    email: {
      type: String,
      required: true, // Email is a required field
      unique: true, // Ensure email is unique
      trim: true, // Trim whitespace from the beginning and end
      lowercase: true, // Convert email to lowercase
    },
    password: {
      type: String,
      required: true, // Password is a required field
      minlength: 8, // Password must be at least 8 characters long
    },
    phone: {
      type: String,
      trim: true, // Trim whitespace from the beginning and end
    },
    address: {
      street: String, // Optional address fields
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    role: {
      type: Number,
      default: 0 // Default role is 0 (non-admin)
    }
  }, {timestamps: true} ); // Automatically add createdAt and updatedAt timestamps

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = { User };
