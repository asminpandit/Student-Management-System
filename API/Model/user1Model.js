const mongoose = require('mongoose');

const User1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User1', User1Schema);

module.exports = User;
