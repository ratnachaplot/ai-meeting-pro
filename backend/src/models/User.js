const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,      // No two users with same email
    lowercase: true,   // Always store as lowercase
    trim: true
  },
  password: {
    type: String,
    required: true     // Will be stored as a hash, never plain text
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;