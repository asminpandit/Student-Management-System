const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    unique: true,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  schedule: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Course', courseSchema);
