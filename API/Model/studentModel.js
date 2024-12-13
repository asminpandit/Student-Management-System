const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);
